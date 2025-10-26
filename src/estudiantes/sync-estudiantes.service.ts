import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Repository } from 'typeorm';
import { PlanEstudio } from 'src/plan_estudios/entities/plan_estudio.entity';
import { EstudianteNotFoundException } from 'src/common/exceptions/lista.exception';
import { AuthService } from 'src/auth/auth.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Periodo } from 'src/periodos/entities/periodo.entity';
import { Gestion } from 'src/gestions/entities/gestion.entity';
import { Inscripcion } from 'src/inscripcions/entities/inscripcion.entity';
import { Materia } from 'src/materias/entities/materia.entity';
import { Nota } from 'src/notas/entities/nota.entity';
import { Prerequisito } from 'src/prerequisitos/entities/prerequisito.entity';

@Injectable()
export class SyncEstudiantesService {

  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,

    @InjectRepository(PlanEstudio)
    private readonly planEstudioRepository: Repository<PlanEstudio>,
    
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,

    @InjectRepository(Periodo)
    private readonly periodoRepository: Repository<Periodo>,

    @InjectRepository(Gestion)
    private readonly gestionRepository: Repository<Gestion>,

    @InjectRepository(Inscripcion)
    private readonly inscripcionRepository: Repository<Inscripcion>,

    @InjectRepository(Materia)
    private readonly materiaRepository: Repository<Materia>,

    @InjectRepository(Nota)
    private readonly notaRepository: Repository<Nota>,

    @InjectRepository(Prerequisito)
    private readonly prerequisitoRepository: Repository<Prerequisito>,
  ){}

  async create(createEstudianteDto: CreateEstudianteDto): Promise<Estudiante> {
    const estudianteData: Partial<Estudiante> = {
      nombre: createEstudianteDto.nombre,
      ci: createEstudianteDto.ci,
      registro: createEstudianteDto.registro,
      telefono: createEstudianteDto.telefono,
      direccion: createEstudianteDto.direccion,
      tituloBachiller: createEstudianteDto.tituloBachiller
    }

    if(createEstudianteDto.idPlan){
      const planEstudio = await this.planEstudioRepository.findOneBy({id: createEstudianteDto.idPlan});
      if (!planEstudio) throw new BadRequestException('No existeste plan de estudio');
      estudianteData.idPlan = planEstudio;
    }

    const user = await this.authService.register({
      email: createEstudianteDto.email,
      contraseña: createEstudianteDto.contraseña,
      rol: 'estudiante'
    })
    estudianteData.user = user;


    return await this.estudianteRepository.save(estudianteData);
  }

  async find() {
    return await this.estudianteRepository.find({
      order: {
        id: 'ASC'
      }
    });
  }

  async findOne(id: number) {
    const estudiante = await this.estudianteRepository.findOneBy({id});
    if (!estudiante) {
      throw new EstudianteNotFoundException(id);
    }
    return estudiante;
  }

  async update(id: number, updateEstudianteDto: UpdateEstudianteDto): Promise<Estudiante> {
    const estudiante = await this.estudianteRepository.findOneBy({id})
    if (!estudiante) throw new BadRequestException(`No existe el estudiante con el id ${id}`);

    let plan_estudio
    if(updateEstudianteDto.idPlan){
      plan_estudio = await this.planEstudioRepository.findOneBy({id: updateEstudianteDto.idPlan});
      if(!plan_estudio) throw new BadRequestException('No existe ese plan de estudio');
    }

    return await this.estudianteRepository.save({
      ...estudiante, 
      ...updateEstudianteDto, 
      idPlan: plan_estudio
    });
  }
  

  async remove(id: number): Promise<void> {
    const estudiante = await this.estudianteRepository.findOne({where: {id}});
    if (!estudiante) throw new NotFoundException(`El estudiante con el id ${id} no existe`);
    await this.estudianteRepository.softDelete(id);
  }

  private async findOneByRegistro(registro: number): Promise<Estudiante> {
    const estudiante = await this.estudianteRepository.findOne({
      where:{registro: registro},
      relations: ['user']
    });
    if (!estudiante) throw new NotFoundException('El registro no existe');
    return estudiante
  }

  async materiasDisponibles(id: number){
    const cacheKey = `materias_disponibles_${id}`;
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) return cached

    const result = await this.generatedMateriasDisponibles(id);
    await this.cacheManager.set(cacheKey, result);
    return result;
  }

  async generatedMateriasDisponibles(id: number){
    const estudiante = await this.estudianteRepository.findOne({where: {id}, relations: ['idPlan']});
    if (!estudiante) throw new NotFoundException(`El estudiante con el id ${id} no existe`);
    if (!estudiante.idPlan) throw new NotFoundException('El estudiante no tiene un plan de estudios asignado');
    
    //Obtener periodo y gestion actual
    const fechaActual = new Date();
    const anioActual = fechaActual.getFullYear();
    const mesActual = fechaActual.getMonth() + 1;

    let numeroPeriodo: number
    if (mesActual >= 3 && mesActual <=7 ) {
      numeroPeriodo = 1;
    }else if (mesActual >= 8 && mesActual <= 11) {
      numeroPeriodo = 2;
    }else{
      numeroPeriodo = 3;
    }
    let periodoActual: Periodo | null = null;
    let materiasInscritasEnPeriodoActual: number[] = [];
    //buscar el periodo y gestion actual
    const gestionActual = await this.gestionRepository.findOneBy({numero: anioActual});
    if (gestionActual){
      periodoActual = await this.periodoRepository.findOneBy({
        numero: numeroPeriodo ,idGestion: gestionActual
      });

      //Si existe el periodo actual obtener materias ya inscritas
      if (periodoActual) {
        const inscripcionesActuales = await this.inscripcionRepository.find({
          where: {
            idPeriodo: periodoActual, 
            idEstudiante: {id: id}
          },
          relations:['detalles', 'detalles.idGrupoMat','detalles.idGrupMat.idMateria']
        });
        //Obtener el ID de las materias del periodo actual
        materiasInscritasEnPeriodoActual = inscripcionesActuales.flatMap(
          inscripcion => inscripcion.detalles.map(detalle => detalle.idGrupoMat?.idMateria?.id)
          .filter(Boolean)
        );
      }
    } 
    //Obtener todas las materias del plan de estudio del estudiante
    const todasLasMaterias = await this.materiaRepository.find({
      where: {idPlan: {id: estudiante.idPlan.id}}, 
      relations: ['idNivel']
    });
    //Obtener todas las materias que el estudiante ya aprobo
    const notasAprobadas = await this.notaRepository.find({
      where: {idEstudiante: {id: id}},
      relations: ['idDetalle.idGrupoMat','idDetalle.idGrupoMat.idMateria']
    });

    const materiasAprobadas: number[] = notasAprobadas
    .filter(nota => (nota.nota ?? 0) >= 51 )
    .map(nota => nota.idDetalle.idGrupoMat?.idMateria?.id)
    .filter(Boolean);

    //Obtener todos los prerequisitos
    const prerequisitos = await this.prerequisitoRepository.find({
      relations: ['idPrerequisito', 'idMateria']
    });

    //Filtrar Materias Disponibles
    const materiasDisponibles = todasLasMaterias.filter((materia) => {
      //Excluir Materias Aprobadas 
      if (materiasAprobadas.includes(materia.id)){
        return false;
      }
      //Excluir materias ya inscritas en la gestion-periodo actual
      if (materiasInscritasEnPeriodoActual.includes(materia.id)){
        return false;
      }

      //Obtener prerequisitos de esta materia
      const prerequisitosDeLaMateria = prerequisitos
      .filter(p => p.idMateria?.id === materia.id)
      .map(p => p.idPrerequisito.id)
      .filter(Boolean)

      if(prerequisitosDeLaMateria.length == 0) return true;

      //Verificar que todos los prerequisitos esten aprobados
      return prerequisitosDeLaMateria.every(prereqId => 
        materiasAprobadas.includes(prereqId)
      );

    });


  }
}
