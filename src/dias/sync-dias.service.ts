import { Injectable } from '@nestjs/common';
import { CreateDiaDto } from './dto/create-dia.dto';
import { UpdateDiaDto } from './dto/update-dia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Dia } from './entities/dia.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SyncDiasService {

  constructor(
    @InjectRepository(Dia)
    private readonly diaRepository: Repository<Dia>,
  ){}

  async create(createDiaDto: CreateDiaDto) {
    return await this.diaRepository.save(createDiaDto);
  }

  async find() {
    return await this.diaRepository.find({
      order: {
        id: 'ASC'
      }
    });
  }

  async findOne(id: number) {
    return await this.diaRepository.findOneBy({id});
  }

  async update(id: number, updateDiaDto: UpdateDiaDto) {
    return await this.diaRepository.update(id, updateDiaDto);
  }

  async remove(id: number) {
    return await this.diaRepository.softDelete(id);
  }
}
