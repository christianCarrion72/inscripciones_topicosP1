import { Injectable } from '@nestjs/common';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Grupo } from './entities/grupo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GruposService {

  constructor(
    @InjectRepository(Grupo)
    private readonly grupoRepository: Repository<Grupo>,
  ) {}
  async create(createGrupoDto: CreateGrupoDto) {
  return await this.grupoRepository.save(createGrupoDto);
  }

  async findAll() {
    return this.grupoRepository.find();
  }

  async findOne(id: number) {
    return await this.grupoRepository.findOneBy({id});
  }

  async update(id: number, updateGrupoDto: UpdateGrupoDto) {
    return await this.grupoRepository.update(id, updateGrupoDto);
  }

  async remove(id: number) {
    return await this.grupoRepository.softDelete(id);
  }
}
