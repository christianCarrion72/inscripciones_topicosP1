import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDiaHorarioDto } from './dto/create-dia_horario.dto';
import { UpdateDiaHorarioDto } from './dto/update-dia_horario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DiaHorario } from './entities/dia_horario.entity';
import { Repository } from 'typeorm';
import { Dia } from 'src/dias/entities/dia.entity';
import { Horario } from 'src/horarios/entities/horario.entity';

@Injectable()
export class DiaHorariosService {

  constructor(
    @InjectRepository(DiaHorario)
    private readonly diaHorarioRepository: Repository<DiaHorario>,

    @InjectRepository(Dia)
    private readonly diaRepository: Repository<Dia>,

    @InjectRepository(Horario)
    private readonly horarioRepository: Repository<Horario>,
  ){}

  async create(createDiaHorarioDto: CreateDiaHorarioDto) {
    const diaHorarioData: Partial<DiaHorario> = {};

    // Validar que el día existe
    const dia = await this.diaRepository.findOneBy({
      id: createDiaHorarioDto.idDia
    });
    if(!dia){
      throw new BadRequestException('El día no existe');
    }

    // Validar que el horario existe
    const horario = await this.horarioRepository.findOneBy({
      id: createDiaHorarioDto.idHorario
    });
    if(!horario){
      throw new BadRequestException('El horario no existe');
    }

    diaHorarioData.idDia = dia;
    diaHorarioData.idHorario = horario;

    return await this.diaHorarioRepository.save(diaHorarioData);
  }

  async findAll() {
    return await this.diaHorarioRepository.find();
  }

  async findOne(id: number) {
    return await this.diaHorarioRepository.findOneBy({id});
  }

  async update(id: number, updateDiaHorarioDto: UpdateDiaHorarioDto) {
    const diaHorario = await this.diaHorarioRepository.findOneBy({id});
    if (!diaHorario) {
      throw new BadRequestException('El día horario no existe');
    }

    let dia;
    let horario;

    if(updateDiaHorarioDto.idDia){
      dia = await this.diaRepository.findOneBy({
        id: updateDiaHorarioDto.idDia
      })
      if (!dia) {
        throw new BadRequestException('El día no encontrado');
      }
    }

    if(updateDiaHorarioDto.idHorario){
      horario = await this.horarioRepository.findOneBy({
        id: updateDiaHorarioDto.idHorario
      })
      if (!horario) {
        throw new BadRequestException('El horario no encontrado');
      }
    }

    return await this.diaHorarioRepository.save({
      ...diaHorario,
      ...updateDiaHorarioDto,
      idDia: dia,
      idHorario: horario
    });
  }

  async remove(id: number) {
    return await this.diaHorarioRepository.softDelete(id);
  }
}
