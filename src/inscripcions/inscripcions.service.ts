import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto';
import { UpdateInscripcionDto } from './dto/update-inscripcion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Inscripcion } from './entities/inscripcion.entity';
import { Repository } from 'typeorm';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';

@Injectable()
export class InscripcionsService {
  constructor(
    @InjectRepository(Inscripcion)
    private readonly inscripcionRepository: Repository<Inscripcion>,

    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,
  ){}

  async create(createInscripcionDto: CreateInscripcionDto) {
    const inscripcionData: Partial<Inscripcion> = {
      fechaInscripcion: createInscripcionDto.fechaInscripcion
    }

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
      ...updateInscripcionDto,
      idEstudiante: estudiante
    });
  }

  async remove(id: number) {
    return await this.inscripcionRepository.softDelete(id);
  }
}
