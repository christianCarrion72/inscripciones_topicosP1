import { Injectable } from '@nestjs/common';
import { CreateGestionDto } from './dto/create-gestion.dto';
import { UpdateGestionDto } from './dto/update-gestion.dto';

@Injectable()
export class GestionsService {
  create(createGestionDto: CreateGestionDto) {
    return 'This action adds a new gestion';
  }

  findAll() {
    return `This action returns all gestions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gestion`;
  }

  update(id: number, updateGestionDto: UpdateGestionDto) {
    return `This action updates a #${id} gestion`;
  }

  remove(id: number) {
    return `This action removes a #${id} gestion`;
  }
}
