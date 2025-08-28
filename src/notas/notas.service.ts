import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNotaDto } from './dto/create-nota.dto';
import { UpdateNotaDto } from './dto/update-nota.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Nota } from './entities/nota.entity';
import { Repository } from 'typeorm';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';
import { GrupoMateria } from 'src/grupo_materias/entities/grupo_materia.entity';

@Injectable()
export class NotasService {

  constructor(
    @InjectRepository(Nota)
    private readonly notaRepository: Repository<Nota>,

    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,

    @InjectRepository(GrupoMateria)
    private readonly grupoMateriaRepository: Repository<GrupoMateria>,
  ){}

  async create(createNotaDto: CreateNotaDto) {
    const notaData: Partial<Nota> = {
      nota: createNotaDto.nota
    };

    if (createNotaDto.idEstudiante) {
      const estudiante = await this.estudianteRepository.findOneBy({ id: createNotaDto.idEstudiante });
      if (!estudiante) {
        throw new BadRequestException('El estudiante no existe');
      }
      notaData.idEstudiante = estudiante;
    }

    if (createNotaDto.idMatGrup) {
      const grupoMateria = await this.grupoMateriaRepository.findOneBy({ id: createNotaDto.idMatGrup });
      if (!grupoMateria) {
        throw new BadRequestException('El grupo materia no existe');
      }
      notaData.idMatGrup = grupoMateria;
    }

    return await this.notaRepository.save(notaData);
  }

  async findAll() {
    return await this.notaRepository.find();
  }

  async findOne(id: number) {
    return await this.notaRepository.findOneBy({id});
  }

  async update(id: number, updateNotaDto: UpdateNotaDto) {
    const nota = await this.notaRepository.findOneBy({id});
    if (!nota) {
      throw new BadRequestException('La nota no existe');
    }

    let estudiante;
    if (updateNotaDto.idEstudiante) {
      estudiante = await this.estudianteRepository.findOneBy({ id: updateNotaDto.idEstudiante });
      if (!estudiante) {
        throw new BadRequestException('El estudiante no encontrado');
      }
    }

    let grupoMateria;
    if (updateNotaDto.idMatGrup) {
      grupoMateria = await this.grupoMateriaRepository.findOneBy({ id: updateNotaDto.idMatGrup });
      if (!grupoMateria) {
        throw new BadRequestException('El grupo materia no encontrado');
      }
    }

    return await this.notaRepository.save({
      ...nota,
      ...updateNotaDto,
      idEstudiante: estudiante,
      idMatGrup: grupoMateria
    });
  }

  async remove(id: number) {
    return await this.notaRepository.softDelete(id);
  }
}
