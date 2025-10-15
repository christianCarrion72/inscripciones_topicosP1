import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Repository, In } from 'typeorm';
import { PlanEstudio } from 'src/plan_estudios/entities/plan_estudio.entity';
import { AuthService } from 'src/auth/auth.service';
import * as bcryptjs from 'bcryptjs';
import { Materia } from 'src/materias/entities/materia.entity';
import { Nota } from 'src/notas/entities/nota.entity';
import { Prerequisito } from 'src/prerequisitos/entities/prerequisito.entity';
import { GrupoMateria } from 'src/grupo_materias/entities/grupo_materia.entity';
import { BoletaHorario } from 'src/boleta_horarios/entities/boleta_horario.entity';
import { DiaHorario } from 'src/dia_horarios/entities/dia_horario.entity';

@Injectable()
export class EstudiantesService {

  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,

    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    @InjectRepository(PlanEstudio)
    private readonly planEstudioRepository: Repository<PlanEstudio>,

    @InjectRepository(Materia)
    private readonly materiaRepository: Repository<Materia>,

    @InjectRepository(Nota)
    private readonly notaRepository: Repository<Nota>,

    @InjectRepository(Prerequisito)
    private readonly prerequisitoRepository: Repository<Prerequisito>,

    @InjectRepository(GrupoMateria)
    private readonly grupoMateriaRepository: Repository<GrupoMateria>,

    @InjectRepository(BoletaHorario)
    private readonly boletaHorarioRepository: Repository<BoletaHorario>,

    @InjectRepository(DiaHorario)
    private readonly diaHorarioRepository: Repository<DiaHorario>,

    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ){}

  async create(createEstudianteDto: CreateEstudianteDto) {
    const estudianteData: Partial<Estudiante> = {
      nombre: createEstudianteDto.nombre,
      ci: createEstudianteDto.ci,
      registro: createEstudianteDto.registro,
      telefono: createEstudianteDto.telefono,
      direccion: createEstudianteDto.direccion,
      tituloBachiller: createEstudianteDto.tituloBachiller
    }

    if(createEstudianteDto.idPlan){
      const plan_estudio = await this.planEstudioRepository.findOneBy({
        id: createEstudianteDto.idPlan
      });
      if(!plan_estudio) {
        throw new BadRequestException('El plan de estudio no existe');
      }
      estudianteData.idPlan = plan_estudio;
    }

    const user = await this.authService.register({
      email: createEstudianteDto.email,
      contraseña: createEstudianteDto.contraseña,
      rol: 'estudiante'
    });

    estudianteData.user = user;
    const estudiante = await this.estudianteRepository.save(estudianteData);
    
    // Generar caché para el nuevo estudiante
    await this.generateCacheForEstudiante(estudiante.id);
    
    return estudiante;
  }

  async findAll() {
    return await this.estudianteRepository.find();
  }

  async findOne(id: number) {
    return await this.estudianteRepository.findOneBy({id});
  }

  async update(id: number, updateEstudianteDto: UpdateEstudianteDto) {
    const estudiante = await this.estudianteRepository.findOneBy({id})
    if (!estudiante) {
      throw new BadRequestException('El estudiante no existe');
    }

    let plan_estudio;
    if (updateEstudianteDto.idPlan) {
      plan_estudio = await this.planEstudioRepository.findOneBy({
        id : updateEstudianteDto.idPlan
      }); 
      if (!plan_estudio) {
        throw new BadRequestException('El plan de estudio no encontrado');
      }
    }

    const updated = await this.estudianteRepository.save({
      ...estudiante,
      ...updateEstudianteDto,
      idPlan: plan_estudio,
    });

    // Invalidar y regenerar caché
    await this.invalidateCacheForEstudiante(id);
    
    return updated;
  }

  async remove(id: number) {
    await this.invalidateCacheForEstudiante(id);
    return await this.estudianteRepository.softDelete(id);
  }

  async findOneByRegistro(registro: number) {
    const estudiantes = await this.estudianteRepository.find({
        where: {},
        relations: ['user']
    });
    return estudiantes.find(e => e.registro === registro);
  }

  /**
   * Obtiene materias disponibles desde caché o las genera si no existe
   */
  async getMateriasDisponibles(id: number) {
    const cacheKey = `materias_disponibles_${id}`;
    
    // Intentar obtener del caché
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) {
      return cached;
    }

    // Si no existe en caché, generar
    const result = await this.generateMateriasDisponibles(id);
    
    // Guardar en caché por 1 hora
    await this.cacheManager.set(cacheKey, result);
    
    return result;
  }

  /**
   * Genera las materias disponibles con sus grupos (estructura completa para el frontend)
   */
  private async generateMateriasDisponibles(id: number) {
    // Verificar que el estudiante existe
    const estudiante = await this.estudianteRepository.findOne({
      where: { id },
      relations: ['idPlan']
    });

    if (!estudiante) {
      throw new BadRequestException('El estudiante no existe');
    }

    if (!estudiante.idPlan) {
      throw new BadRequestException('El estudiante no tiene un plan de estudios asignado');
    }

    // Obtener todas las materias del plan de estudios del estudiante
    const todasLasMaterias = await this.materiaRepository.find({
      where: { idPlan: { id: estudiante.idPlan.id } },
      relations: ['idNivel']
    });

    // Obtener las materias que el estudiante ya ha aprobado
    const notasAprobadas = await this.notaRepository.find({
      where: { 
        idEstudiante: { id: id }
      },
      relations: ['idMatGrup', 'idMatGrup.idMateria']
    });

    // Filtrar solo las notas aprobadas (>= 51) y extraer los IDs de las materias
    const materiasAprobadas = notasAprobadas
      .filter(nota => nota.nota >= 51)
      .map(nota => nota.idMatGrup?.idMateria?.id)
      .filter(Boolean);

    // Obtener todos los prerrequisitos
    const prerequisitos = await this.prerequisitoRepository.find({
      relations: ['idMateria', 'idPrerequisito']
    });

    // Filtrar materias disponibles
    const materiasDisponibles = todasLasMaterias.filter(materia => {
      // Excluir materias ya aprobadas
      if (materiasAprobadas.includes(materia.id)) {
        return false;
      }

      // Obtener prerrequisitos de esta materia
      const prerequisitosDeLaMateria = prerequisitos
        .filter(p => p.idMateria?.id === materia.id)
        .map(p => p.idPrerequisito?.id)
        .filter(Boolean);

      // Si no tiene prerrequisitos, está disponible
      if (prerequisitosDeLaMateria.length === 0) {
        return true;
      }

      // Verificar que todos los prerrequisitos estén aprobados
      return prerequisitosDeLaMateria.every(prereqId => 
        materiasAprobadas.includes(prereqId)
      );
    });

    // Obtener los IDs de las materias disponibles
    const materiasDisponiblesIds = materiasDisponibles.map(m => m.id);

    // Obtener grupos de materias disponibles con todas sus relaciones
    const gruposMaterias = materiasDisponiblesIds.length > 0 
      ? await this.grupoMateriaRepository.find({
          where: { idMateria: { id: In(materiasDisponiblesIds) } },
          relations: ['idMateria', 'idDocente', 'idGrupo']
        })
      : [];

    // Obtener los IDs de los grupos
    const grupoMateriasIds = gruposMaterias.map(gm => gm.id);

    // Obtener boletas de horarios (sin relaciones anidadas conflictivas)
    const boletasHorarios = grupoMateriasIds.length > 0
      ? await this.boletaHorarioRepository.find({
          where: { idGrupoMateria: { id: In(grupoMateriasIds) } }
        })
      : [];

    // Obtener todos los IDs únicos de horarios
    const horariosIdsSet = new Set(
      boletasHorarios
        .map(b => b.idHorario?.id)
        .filter((id): id is number => id !== undefined && id !== null)
    );
    const horariosIds = Array.from(horariosIdsSet);

    // CAMBIO CLAVE: Cargar DiaHorario por separado, igual que gruposMaterias
    const diasHorarios = horariosIds.length > 0
      ? await this.diaHorarioRepository.find({
          where: { idHorario: { id: In(horariosIds) } },
          relations: ['idDia', 'idHorario']
        })
      : [];

    // Crear mapa de días por horario
    const diasPorHorario = new Map<number, any[]>();
    diasHorarios.forEach(dh => {
      const horarioId = dh.idHorario?.id;
      if (!horarioId || !dh.idDia) return;

      if (!diasPorHorario.has(horarioId)) {
        diasPorHorario.set(horarioId, []);
      }

      diasPorHorario.get(horarioId)!.push({
        id: dh.idDia.id,
        nombre: dh.idDia.nombre
      });
    });

    // Crear un mapa de horarios por grupo para acceso rápido
    const horariosPorGrupo = new Map<number, any[]>();
    
    boletasHorarios.forEach(boleta => {
      const grupoId = boleta.idGrupoMateria?.id;
      if (!grupoId) return;

      if (!horariosPorGrupo.has(grupoId)) {
        horariosPorGrupo.set(grupoId, []);
      }

      const horario = boleta.idHorario;
      if (horario) {
        horariosPorGrupo.get(grupoId)!.push({
          id: horario.id,
          horaInicio: horario.horaInicio,
          horaFin: horario.horaFin,
          aula: horario.idAula ? {
            id: horario.idAula.id,
            numero: horario.idAula.numero,
          } : null,
          modulo: horario.idAula.idModulo ? {
            id: horario.idAula.idModulo.id,
            codigo: horario.idAula.idModulo.codigo,
          } : null,
          dias: diasPorHorario.get(horario.id) || []
        });
      }
    });

    // Agrupar por nivel para mejor visualización
    const materiasAgrupadasPorNivel = materiasDisponibles.reduce((acc, materia) => {
      const nivelNombre = materia.idNivel?.nombre || 'Sin nivel';
      if (!acc[nivelNombre]) {
        acc[nivelNombre] = [];
      }

      // Buscar grupos para esta materia - mantener estructura completa
      const gruposDeMateria = gruposMaterias
        .filter(gm => gm.idMateria?.id === materia.id)
        .map(gm => ({
          id: gm.id,
          cupos: gm.cupos,
          docente: gm.idDocente ? {
            id: gm.idDocente.id,
            nombre: gm.idDocente.nombre
          } : null,
          grupo: gm.idGrupo ? {
            id: gm.idGrupo.id,
            sigla: gm.idGrupo.sigla
          } : null,
          horarios: horariosPorGrupo.get(gm.id) || []
        }));

      acc[nivelNombre].push({
        id: materia.id,
        nombre: materia.nombre,
        codigo: materia.codigo,
        gruposMaterias: gruposDeMateria
      });
      return acc;
    }, {});

    return {
      estudiante: {
        id: estudiante.id,
        nombre: estudiante.nombre,
        registro: estudiante.registro,
        planEstudio: estudiante.idPlan.nombre
      },
      materiasAprobadas: materiasAprobadas.length,
      materiasDisponibles: materiasDisponibles.length,
      materiasPorNivel: materiasAgrupadasPorNivel,
      // Retornar también lista plana de grupos para facilitar selección en frontend
      gruposMaterias: gruposMaterias.map(gm => ({
        id: gm.id,
        cupos: gm.cupos,
        idMateria: {
          id: gm.idMateria?.id,
          nombre: gm.idMateria?.nombre,
          codigo: gm.idMateria?.codigo
        },
        docente: gm.idDocente ? {
          id: gm.idDocente.id,
          nombre: gm.idDocente.nombre
        } : null,
        grupo: gm.idGrupo ? {
          id: gm.idGrupo.id,
          sigla: gm.idGrupo.sigla
        } : null,
        horarios: horariosPorGrupo.get(gm.id) || []
      }))
    };
  }

  /**
   * Genera caché para un estudiante específico
   */
  async generateCacheForEstudiante(estudianteId: number) {
    try {
      await this.getMateriasDisponibles(estudianteId);
    } catch (error) {
      console.error(`Error generando caché para estudiante ${estudianteId}:`, error);
    }
  }

  /**
   * Invalida el caché de un estudiante
   */
  async invalidateCacheForEstudiante(estudianteId: number) {
    const cacheKey = `materias_disponibles_${estudianteId}`;
    await this.cacheManager.del(cacheKey);
  }

  /**
   * Invalida el caché de todos los estudiantes de un plan de estudios
   */
  async invalidateCacheByPlan(planId: number) {
    const estudiantes = await this.estudianteRepository.find({
      where: { idPlan: { id: planId } }
    });

    for (const estudiante of estudiantes) {
      await this.invalidateCacheForEstudiante(estudiante.id);
    }
  }

  /**
   * Invalida el caché de estudiantes que tienen una materia específica disponible
   */
  async invalidateCacheByMateria(materiaId: number) {
    // Obtener la materia para saber su plan de estudios
    const materia = await this.materiaRepository.findOne({
      where: { id: materiaId },
      relations: ['idPlan']
    });

    if (!materia || !materia.idPlan) {
      return;
    }

    // Invalidar caché de todos los estudiantes del mismo plan
    await this.invalidateCacheByPlan(materia.idPlan.id);
  }

  /**
   * Regenera el caché de todos los estudiantes
   */
  async regenerateAllCache() {
    const estudiantes = await this.estudianteRepository.find();
    
    const results: {
      total: number;
      exitosos: number;
      fallidos: number;
      errores: Array<{ estudianteId: number; error: string }>;
    } = {
      total: estudiantes.length,
      exitosos: 0,
      fallidos: 0,
      errores: []
    };

    for (const estudiante of estudiantes) {
      try {
        await this.generateCacheForEstudiante(estudiante.id);
        results.exitosos++;
      } catch (error) {
        results.fallidos++;
        results.errores.push({
          estudianteId: estudiante.id,
          error: error instanceof Error ? error.message : String(error)
        });
      }
    }

    return {
      message: `Caché regenerado para ${results.exitosos} de ${results.total} estudiantes`,
      ...results
    };
  }
}