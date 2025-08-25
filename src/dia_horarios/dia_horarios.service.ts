import { Injectable } from '@nestjs/common';
import { CreateDiaHorarioDto } from './dto/create-dia_horario.dto';
import { UpdateDiaHorarioDto } from './dto/update-dia_horario.dto';

@Injectable()
export class DiaHorariosService {
  create(createDiaHorarioDto: CreateDiaHorarioDto) {
    return 'This action adds a new diaHorario';
  }

  findAll() {
    return `This action returns all diaHorarios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} diaHorario`;
  }

  update(id: number, updateDiaHorarioDto: UpdateDiaHorarioDto) {
    return `This action updates a #${id} diaHorario`;
  }

  remove(id: number) {
    return `This action removes a #${id} diaHorario`;
  }
}
