import { Injectable } from '@nestjs/common';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Docente } from './entities/docente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SyncDocentesService {
  constructor(
    @InjectRepository(Docente)
    private readonly docenteRepository: Repository<Docente>,
  ) {}

  async create(createDocenteDto: CreateDocenteDto) {
    return await this.docenteRepository.save(createDocenteDto);
  }

  async find() {
    return await this.docenteRepository.find({
      order: {
        id: 'ASC'
      }
    });
  }

  async findOne(id: number) {
    return await this.docenteRepository.findOneBy({id});
  }

  async update(id: number, updateDocenteDto: UpdateDocenteDto) {
    return await this.docenteRepository.update(id, updateDocenteDto);
  }

  async remove(id: number) {
    return await this.docenteRepository.softDelete(id);
  }
}
