import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto';
import { UpdateInscripcionDto } from './dto/update-inscripcion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Inscripcion } from './entities/inscripcion.entity';
import { DataSource, In, MoreThan, Repository } from 'typeorm';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';
import { GrupoMateria } from 'src/grupo_materias/entities/grupo_materia.entity';
import { Detalle } from 'src/detalles/entities/detalle.entity';

@Injectable()
export class InscripcionsService {
  private readonly logger = new Logger(InscripcionsService.name);

  constructor(
    @InjectRepository(Inscripcion)
    private readonly inscripcionRepository: Repository<Inscripcion>,

    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,

    @InjectRepository(GrupoMateria)
    private readonly grupoMateriaRepository: Repository<GrupoMateria>,

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
        throw new BadRequestException('El estudiante no existe');
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
      throw new BadRequestException('La inscripcion no existe');
    }

    let estudiante;
    if(updateInscripcionDto.idEstudiante){
      estudiante = await this.estudianteRepository.findOneBy({
        id: updateInscripcionDto.idEstudiante
      })

      if (!estudiante) {
        throw new BadRequestException('El estudiante no encontrado');
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

  async requestSeat(createInscripcionDto: CreateInscripcionDto){
    const { idEstudiante, idsGrupoMateria } = createInscripcionDto;
    if(!idEstudiante) throw new BadRequestException('Estudiante no enviado');
    if(!idsGrupoMateria || idsGrupoMateria.length === 0)
      throw new BadRequestException('Grupos no enviados');
    const estudiante = await this.estudianteRepository.findOneBy({id: idEstudiante});
    if(!estudiante) throw new BadRequestException('El estudiante no existe');
    return await this.dataSource.transaction(async (manager) => {
      const grupoRepo = manager.getRepository(GrupoMateria);
      const inscripcionRepo = manager.getRepository(Inscripcion);
      const detalleRepo = manager.getRepository(Detalle);

      const gruposReservados: number[] = [];

      try {
        for(const grupoId of idsGrupoMateria){
          const result = await grupoRepo.decrement(
            {id: grupoId, cupos: MoreThan(0)},
            'cupos',
            1
          );
          if(result.affected === 0){
            if(gruposReservados.length>0){
              await grupoRepo.increment({id: In(gruposReservados)}, 'cupos', 1);
            }
            const grupo = await grupoRepo.findOneBy({id: grupoId});
            return {
              status: 'REJECTED',
              reason: `Sin cupos el grupo: ${grupo?.idGrupo.sigla}`
            };
          }

          gruposReservados.push(grupoId);
        }
        const inscripcion = inscripcionRepo.create({
          idEstudiante: estudiante,
          fechaInscripcion: new Date(),
        });
        await inscripcionRepo.save(inscripcion);
        const detalles = idsGrupoMateria.map((grupoId) =>
          detalleRepo.create({
            idInscripcion: inscripcion,
            idGrupoMat: {id: grupoId} as any
          }),
        );
        await detalleRepo.save(detalles);
        return{
          status: 'CONFIRMED',
          inscripcion,
          grupos: gruposReservados,
        };
      } catch (err) {
        this.logger.error('Error reservando cupos', err);
        throw err;
      }
    });
  }
  
}
