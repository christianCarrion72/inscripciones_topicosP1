import { Injectable } from '@nestjs/common';
import { CreateModuloDto } from './dto/create-modulo.dto';
import { UpdateModuloDto } from './dto/update-modulo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Modulo } from './entities/modulo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ModulosService {

  constructor(

    @InjectRepository(Modulo)
    private readonly moduloRepository: Repository<Modulo>,

  ){}

  async create(createModuloDto: CreateModuloDto) {
    return await this.moduloRepository.save(createModuloDto);
  }

  async findAll() {
    return await this.moduloRepository.find();
  }

  async findOne(id: number) {
    return await this.moduloRepository.findOneBy({id});
  }

  async update(id: number, updateModuloDto: UpdateModuloDto) {
    return await this.moduloRepository.update(id, updateModuloDto);
  }

  async remove(id: number) {
    return await this.moduloRepository.softDelete(id);
  }
}
