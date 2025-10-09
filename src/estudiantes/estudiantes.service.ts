import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Repository } from 'typeorm';
import { PlanEstudio } from 'src/plan_estudios/entities/plan_estudio.entity';
import { AuthService } from 'src/auth/auth.service';
import * as bcryptjs from 'bcryptjs';
import { Materia } from 'src/materias/entities/materia.entity';
import { Nota } from 'src/notas/entities/nota.entity';
import { Prerequisito } from 'src/prerequisitos/entities/prerequisito.entity';

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

    // Crear usuario con rol estudiante
    const user = await this.authService.register({
      email: createEstudianteDto.email,
      contraseña: createEstudianteDto.contraseña,
      rol: 'estudiante'
    });

    // Crear estudiante y asociarlo al usuario
    estudianteData.user = user;
    return await this.estudianteRepository.save(estudianteData);
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

    return await this.estudianteRepository.save({
      ...estudiante,
      ...updateEstudianteDto,
      idPlan: plan_estudio,
    });
  }

  async remove(id: number) {
    return await this.estudianteRepository.softDelete(id);
  }

  async findOneByRegistro(registro: number) {
    const estudiantes = await this.estudianteRepository.find({
        where: {},
        relations: ['user']
    });
    return estudiantes.find(e => e.registro === registro);
  }
  async getMateriasDisponibles(id: number) {
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
      .filter(nota => nota.nota >= 51) // Asumiendo que 51 es la nota mínima para aprobar
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

    // Agrupar por nivel para mejor visualización
    const materiasAgrupadasPorNivel = materiasDisponibles.reduce((acc, materia) => {
      const nivelNombre = materia.idNivel?.nombre || 'Sin nivel';
      if (!acc[nivelNombre]) {
        acc[nivelNombre] = [];
      }
      acc[nivelNombre].push({
        id: materia.id,
        nombre: materia.nombre,
        codigo: materia.codigo
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
      materiasPorNivel: materiasAgrupadasPorNivel
    };
  }
}
