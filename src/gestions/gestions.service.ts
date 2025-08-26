import { Injectable } from '@nestjs/common';
import { CreateGestionDto } from './dto/create-gestion.dto';
import { UpdateGestionDto } from './dto/update-gestion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Gestion } from './entities/gestion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GestionsService {
  constructor(
    @InjectRepository(Gestion)
    private readonly gestionRepository: Repository<Gestion>,
  ) {}

  async create(createGestionDto: CreateGestionDto) {
    return await this.gestionRepository.save(createGestionDto);
  }

  async findAll() {
    return await this.gestionRepository.find();
  }

  async findOne(id: number) {
    return await this.gestionRepository.findOneBy({id});
  }

  async update(id: number, updateGestionDto: UpdateGestionDto) {
    return await this.gestionRepository.update(id, updateGestionDto);
  }

  async remove(id: number) {
    return await this.gestionRepository.softDelete(id);
  }
}
