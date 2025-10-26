import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto';
import { UpdateInscripcionDto } from './dto/update-inscripcion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Inscripcion } from './entities/inscripcion.entity';
import { DataSource, In, MoreThan, Repository } from 'typeorm';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';
import { GrupoMateria } from 'src/grupo_materias/entities/grupo_materia.entity';
import { Detalle } from 'src/detalles/entities/detalle.entity';
import { Periodo } from 'src/periodos/entities/periodo.entity';
import { Gestion } from 'src/gestions/entities/gestion.entity';
import { EstudiantesService } from 'src/estudiantes/estudiantes.service';
import { Nota } from 'src/notas/entities/nota.entity';
import { EstudianteIdRequiredException, EstudianteNotFoundException, GestionNotFoundException, GruposRequiredException, InscripcionNotFoundException, PeriodoNotFoundException } from 'src/common/exceptions/lista.exception';

@Injectable()
export class InscripcionsService {
  private readonly logger = new Logger(InscripcionsService.name);

  constructor(
    @InjectRepository(Inscripcion)
    private readonly inscripcionRepository: Repository<Inscripcion>,

    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,

    @InjectRepository(Periodo)
    private readonly periodoRepository: Repository<Periodo>,

    @InjectRepository(Gestion)
    private readonly gestionRepository: Repository<Gestion>,

    private readonly estudiantesService: EstudiantesService,

    private readonly dataSource: DataSource,
  ){}

  async create(createInscripcionDto: CreateInscripcionDto) {
    const inscripcionData: Partial<Inscripcion> = {
      fechaInscripcion: new Date(),
    };

    if(createInscripcionDto.idEstudiante){
      const estudiante = await this.estudianteRepository.findOneBy({
        id: createInscripcionDto.idEstudiante
      });
      if(!estudiante){
        throw new EstudianteNotFoundException(createInscripcionDto.idEstudiante);
      }

      inscripcionData.idEstudiante = estudiante;
    }

    return await this.inscripcionRepository.save(inscripcionData);
  }

  async findAll() {
    return await this.inscripcionRepository.find();
  }

  async findOne(id: number) {
    return await this.inscripcionRepository.findOneBy({id});
  }

  async update(id: number, updateInscripcionDto: UpdateInscripcionDto) {
    const inscripcion = await this.inscripcionRepository.findOneBy({id});
    if (!inscripcion) {
      throw new InscripcionNotFoundException(id);
    }

    let estudiante;
    if(updateInscripcionDto.idEstudiante){
      estudiante = await this.estudianteRepository.findOneBy({
        id: updateInscripcionDto.idEstudiante
      })

      if (!estudiante) {
        throw new EstudianteNotFoundException(updateInscripcionDto.idEstudiante);
      }
    }
    return await this.inscripcionRepository.save({
      ...inscripcion,
      idEstudiante: estudiante ?? inscripcion.idEstudiante,
    });
  }

  async remove(id: number) {
    return await this.inscripcionRepository.softDelete(id);
  }

  async getHistorial(idEstudiante: number) {
    const estudiante = await this.estudianteRepository.findOneBy({ id: idEstudiante });
    
    if (!estudiante) {
      throw new EstudianteNotFoundException(idEstudiante);
    }

    const inscripciones = await this.inscripcionRepository.find({
      where: { idEstudiante: { id: idEstudiante } },
      relations: ['idPeriodo', 'idPeriodo.idGestion', 'detalles', 'detalles.idGrupoMat', 'detalles.idGrupoMat.idMateria', 'detalles.idGrupoMat.idGrupo', 'detalles.idGrupoMat.idDocente', 'detalles.nota'],
      order: { fechaInscripcion: 'DESC' }
    });

    return {
      estudiante: {
        id: estudiante.id,
        nombre: estudiante.nombre,
        ci: estudiante.ci,
        registro: estudiante.registro
      },
      inscripciones: inscripciones.map(inscripcion => ({
        id: inscripcion.id,
        fechaInscripcion: inscripcion.fechaInscripcion,
        periodo: `${inscripcion.idPeriodo.numero}-${inscripcion.idPeriodo.idGestion.numero}`,
        materias: inscripcion.detalles.map(detalle => ({
          id: detalle.id,
          nota: detalle.nota.nota,
          materia: {
            id: detalle.idGrupoMat.idMateria.id,
            nombre: detalle.idGrupoMat.idMateria.nombre,
            codigo: detalle.idGrupoMat.idMateria.codigo
          },
          grupo: {
            id: detalle.idGrupoMat.idGrupo.id,
            sigla: detalle.idGrupoMat.idGrupo.sigla
          }, 
          docente: {
            id: detalle.idGrupoMat.idDocente.id,
            nombre: detalle.idGrupoMat.idDocente.nombre,
          }
        }))
      }))
    };
  }

  async requestSeat(createInscripcionDto: CreateInscripcionDto) {
    const { idEstudiante, idsGrupoMateria } = createInscripcionDto;
    
    // Validaciones iniciales
    this.validateRequestSeatInput(idEstudiante, idsGrupoMateria);
    
    // Obtener entidades necesarias
    const estudiante = await this.getEstudianteById(idEstudiante!);
    const periodo = await this.getPeriodoActual();
    
    // Procesar inscripción en transacción
    return await this.dataSource.transaction(async (manager) => {
      return await this.processInscripcion(
        manager,
        estudiante,
        periodo,
        idsGrupoMateria!
      );
    });
  }
  
  private validateRequestSeatInput(
    idEstudiante?: number,
    idsGrupoMateria?: number[]
  ): void {
    if (!idEstudiante) throw new EstudianteIdRequiredException();
    if (!idsGrupoMateria || idsGrupoMateria.length === 0) {
      throw new GruposRequiredException();
    }
  }
  
  private async getEstudianteById(idEstudiante: number) {
    const estudiante = await this.estudianteRepository.findOneBy({
      id: idEstudiante
    });
    if (!estudiante) throw new EstudianteNotFoundException(idEstudiante);
    return estudiante;
  }
  
  private async getPeriodoActual() {
    const fechaActual = new Date();
    const anioActual = fechaActual.getFullYear();
    const numeroPeriodo = this.calcularNumeroPeriodo(fechaActual);
    
    const gestion = await this.gestionRepository.findOne({
      where: { numero: anioActual }
    });
    
    if (!gestion) throw new GestionNotFoundException(anioActual);
    
    const periodo = await this.periodoRepository.findOne({
      where: {
        numero: numeroPeriodo,
        idGestion: { id: gestion.id }
      }
    });
    
    if (!periodo) throw new PeriodoNotFoundException(anioActual, numeroPeriodo);
    
    return periodo;
  }
  
  private calcularNumeroPeriodo(fecha: Date): number {
    const mesActual = fecha.getMonth() + 1;
    
    if (mesActual >= 3 && mesActual <= 7) {
      return 1; // Marzo-Julio: Periodo 1
    } else if (mesActual >= 8 && mesActual <= 11) {
      return 2; // Agosto-Noviembre: Periodo 2
    } else {
      return 3; // Diciembre-Febrero: Periodo 3
    }
  }
  
  private async validarYReservarCupos(
    grupoRepo: any,
    idsGrupoMateria: number[]
  ): Promise<{ success: boolean; gruposReservados: number[]; error?: string }> {
    const gruposReservados: number[] = [];
    
    try {
      for (const grupoId of idsGrupoMateria) {
        const result = await grupoRepo.decrement(
          { id: grupoId, cupos: MoreThan(0) },
          'cupos',
          1
        );
        
        if (result.affected === 0) {
          // Hacer rollback de los cupos ya reservados
          if (gruposReservados.length > 0) {
            await grupoRepo.increment(
              { id: In(gruposReservados) },
              'cupos',
              1
            );
          }
          
          const grupo = await grupoRepo.findOneBy({ id: grupoId });
          return {
            success: false,
            gruposReservados: [],
            error: `Sin cupos el grupo: ${grupo?.idMateria.nombre}-${grupo?.idGrupo.sigla}`
          };
        }
        
        gruposReservados.push(grupoId);
      }
      
      return { success: true, gruposReservados };
    } catch (err) {
      // En caso de error, intentar rollback
      if (gruposReservados.length > 0) {
        await grupoRepo.increment(
          { id: In(gruposReservados) },
          'cupos',
          1
        );
      }
      throw err;
    }
  }
  
  private async processInscripcion(
    manager: any,
    estudiante: any,
    periodo: any,
    idsGrupoMateria: number[]
  ) {
    const grupoRepo = manager.getRepository(GrupoMateria);
    const inscripcionRepo = manager.getRepository(Inscripcion);
    const detalleRepo = manager.getRepository(Detalle);
    const notaRepo = manager.getRepository(Nota);
    
    try {
      // Validar y reservar cupos
      const resultadoCupos = await this.validarYReservarCupos(
        grupoRepo,
        idsGrupoMateria
      );
      
      if (!resultadoCupos.success) {
        return {
          status: 'REJECTED',
          reason: resultadoCupos.error
        };
      }
      
      // Crear inscripción
      const inscripcion = await this.crearInscripcion(
        inscripcionRepo,
        estudiante,
        periodo
      );
      
      // Crear detalles
      const detalles = await this.crearDetalles(
        detalleRepo,
        inscripcion,
        idsGrupoMateria
      );
      
      // Crear notas
      await this.crearNotas(notaRepo, estudiante, detalles);
      
      // Invalidar caché
      await this.estudiantesService.invalidateCacheForEstudiante(estudiante.id);
      
      return {
        status: 'CONFIRMED',
        inscripcion,
        grupos: resultadoCupos.gruposReservados
      };
    } catch (err) {
      this.logger.error('Error reservando cupos', err);
      throw err;
    }
  }
  
  private async crearInscripcion(
    inscripcionRepo: any,
    estudiante: any,
    periodo: any
  ) {
    const inscripcion = inscripcionRepo.create({
      idPeriodo: periodo,
      idEstudiante: estudiante,
      fechaInscripcion: new Date()
    });
    
    return await inscripcionRepo.save(inscripcion);
  }
  
  private async crearDetalles(
    detalleRepo: any,
    inscripcion: any,
    idsGrupoMateria: number[]
  ) {
    const detalles = idsGrupoMateria.map((grupoId) =>
      detalleRepo.create({
        idInscripcion: inscripcion,
        idGrupoMat: { id: grupoId } as any
      })
    );
    
    return await detalleRepo.save(detalles);
  }
  
  private async crearNotas(
    notaRepo: any,
    estudiante: any,
    detalles: any[]
  ) {
    for (const detalle of detalles) {
      const nota = notaRepo.create({
        nota: null,
        idEstudiante: estudiante,
        idDetalle: detalle
      });
      await notaRepo.save(nota);
    }
  }
  
}
