import { Injectable } from '@nestjs/common';
import { CreateBoletaHorarioDto } from './dto/create-boleta_horario.dto';
import { UpdateBoletaHorarioDto } from './dto/update-boleta_horario.dto';

@Injectable()
export class BoletaHorariosService {
  create(createBoletaHorarioDto: CreateBoletaHorarioDto) {
    return 'This action adds a new boletaHorario';
  }

  findAll() {
    return `This action returns all boletaHorarios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} boletaHorario`;
  }

  update(id: number, updateBoletaHorarioDto: UpdateBoletaHorarioDto) {
    return `This action updates a #${id} boletaHorario`;
  }

  remove(id: number) {
    return `This action removes a #${id} boletaHorario`;
  }
}
