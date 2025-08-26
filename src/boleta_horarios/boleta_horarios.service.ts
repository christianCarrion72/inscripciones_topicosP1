import { Injectable } from '@nestjs/common';
import { CreateBoletaHorarioDto } from './dto/create-boleta_horario.dto';
import { UpdateBoletaHorarioDto } from './dto/update-boleta_horario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoletaHorario } from './entities/boleta_horario.entity';
import { Repository } from 'typeorm';
import { GrupoMateria } from 'src/grupo_materias/entities/grupo_materia.entity';
import { Horario } from 'src/horarios/entities/horario.entity';

@Injectable()
export class BoletaHorariosService {
  constructor(
    @InjectRepository(BoletaHorario)
    private readonly boletaHorarioRepository: Repository<BoletaHorario>,

    @InjectRepository(GrupoMateria)
    private readonly grupoMateriaRepository: Repository<GrupoMateria>,

    @InjectRepository(Horario)
    private readonly horarioRepository: Repository<Horario>
  ){}
  async create(createBoletaHorarioDto: CreateBoletaHorarioDto) {
    return 'This action adds a new boletaHorario';
  }

  async findAll() {
    return await this.boletaHorarioRepository.find();
  }

  async findOne(id: number) {
    return await this.boletaHorarioRepository.findOneBy({id});
  }

  async update(id: number, updateBoletaHorarioDto: UpdateBoletaHorarioDto) {
    return `This action updates a #${id} boletaHorario`;
  }

  async remove(id: number) {
    return await this.boletaHorarioRepository.softDelete(id);
  }
}
