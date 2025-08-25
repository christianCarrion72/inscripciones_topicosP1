import { Injectable } from '@nestjs/common';
import { CreatePrerequisitoDto } from './dto/create-prerequisito.dto';
import { UpdatePrerequisitoDto } from './dto/update-prerequisito.dto';

@Injectable()
export class PrerequisitosService {
  create(createPrerequisitoDto: CreatePrerequisitoDto) {
    return 'This action adds a new prerequisito';
  }

  findAll() {
    return `This action returns all prerequisitos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} prerequisito`;
  }

  update(id: number, updatePrerequisitoDto: UpdatePrerequisitoDto) {
    return `This action updates a #${id} prerequisito`;
  }

  remove(id: number) {
    return `This action removes a #${id} prerequisito`;
  }
}
