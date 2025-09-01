import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateDetalleDto } from './dto/create-detalle.dto';
import { UpdateDetalleDto } from './dto/update-detalle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Detalle } from './entities/detalle.entity';
import { Repository } from 'typeorm';
import { Inscripcion } from 'src/inscripcions/entities/inscripcion.entity';
import { GrupoMateria } from 'src/grupo_materias/entities/grupo_materia.entity';

@Injectable()
export class DetallesService {
  constructor(
    @InjectRepository(Detalle)
    private readonly detalleRepository: Repository<Detalle>,

    @InjectRepository(Inscripcion)
    private readonly inscripcionRepository: Repository<Inscripcion>,

    @InjectRepository(GrupoMateria)
    private readonly grupoMateriaRepository: Repository<GrupoMateria>,
  ) {}

  async create(createDetalleDto: CreateDetalleDto) {
    const detalleData: Partial<Detalle> = {};

    if (createDetalleDto.idInscripcion) {
      const inscripcion = await this.inscripcionRepository.findOneBy({
        id: createDetalleDto.idInscripcion
      });
      if (!inscripcion) {
        throw new BadRequestException('La inscripción no existe');
      }
      detalleData.idInscripcion = inscripcion;
    }

    if (createDetalleDto.idGrupoMat) {
      const grupoMateria = await this.grupoMateriaRepository.findOneBy({
        id: createDetalleDto.idGrupoMat
      });
      if (!grupoMateria) {
        throw new BadRequestException('El grupo materia no existe');
      }
      detalleData.idGrupoMat = grupoMateria;
    }

    return await this.detalleRepository.save(detalleData);
  }

  async findAll() {
    return await this.detalleRepository.find();
  }

  async findOne(id: number) {
    return await this.detalleRepository.findOneBy({ id });
  }

  async update(id: number, updateDetalleDto: UpdateDetalleDto) {
    const detalle = await this.detalleRepository.findOneBy({ id });
    if (!detalle) {
      throw new BadRequestException('El detalle no existe');
    }

    let inscripcion;
    if (updateDetalleDto.idInscripcion) {
      inscripcion = await this.inscripcionRepository.findOneBy({
        id: updateDetalleDto.idInscripcion
      });
      if (!inscripcion) {
        throw new BadRequestException('La inscripción no encontrada');
      }
    }

    let grupoMateria;
    if (updateDetalleDto.idGrupoMat) {
      grupoMateria = await this.grupoMateriaRepository.findOneBy({
        id: updateDetalleDto.idGrupoMat
      });
      if (!grupoMateria) {
        throw new BadRequestException('El grupo materia no encontrado');
      }
    }

    return await this.detalleRepository.save({
      ...detalle,
      ...updateDetalleDto,
      idInscripcion: inscripcion,
      idGrupoMat: grupoMateria
    });
  }

  async remove(id: number) {
    return await this.detalleRepository.softDelete(id);
  }
}
