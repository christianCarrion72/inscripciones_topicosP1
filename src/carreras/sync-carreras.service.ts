import { Injectable } from '@nestjs/common';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Carrera } from './entities/carrera.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SyncCarrerasService {
  constructor(
    @InjectRepository(Carrera)
    private readonly carreraRepository: Repository<Carrera>,
  ){}

  async create(createCarreraDto: CreateCarreraDto) {
    return await this.carreraRepository.save(createCarreraDto);
  }

  async find() {
    return await this.carreraRepository.find({
      order: {
        id: 'ASC'
      }
    });
  }

  async findOne(id: number) {
    return await this.carreraRepository.findOneBy({id});
  }

  async update(id: number, updateCarreraDto: UpdateCarreraDto) {
    return await this.carreraRepository.update(id, updateCarreraDto);
  }

  async remove(id: number) {
    return await this.carreraRepository.softDelete(id);
  }
}