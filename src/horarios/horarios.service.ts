import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Horario } from './entities/horario.entity';
import { Repository } from 'typeorm';
import { Aula } from 'src/aulas/entities/aula.entity';

@Injectable()
export class HorariosService {

  constructor(
    @InjectRepository(Horario)
    private readonly horarioRepository: Repository<Horario>,

    @InjectRepository(Aula)
    private readonly aulaRepository: Repository<Aula>,
  ){}

  async create(createHorarioDto: CreateHorarioDto) {
    const horarioData: Partial<Horario> = {
      horaInicio: createHorarioDto.horaInicio,
      horaFin: createHorarioDto.horaFin
    }

    if(createHorarioDto.idAula){
      const aula = await this.aulaRepository.findOneBy({
        id: createHorarioDto.idAula
      });
      if(!aula){
        throw new BadRequestException('El aula no existe');
      }

      horarioData.idAula = aula;
    }

    return await this.horarioRepository.save(horarioData);
  }

  async findAll() {
    return await this.horarioRepository.find();
  }

  async findOne(id: number) {
    return await this.horarioRepository.findOneBy({id});
  }

  async update(id: number, updateHorarioDto: UpdateHorarioDto) {
    const horario = await this.horarioRepository.findOneBy({id});
    if (!horario) {
      throw new BadRequestException('El horario no existe');
    }

    let aula;
    if(updateHorarioDto.idAula){
      aula = await this.aulaRepository.findOneBy({
        id: updateHorarioDto.idAula
      })

      if (!aula) {
        throw new BadRequestException('El aula no encontrada');
      }
    }

    return await this.horarioRepository.save({
      ...horario,
      ...updateHorarioDto,
      idAula: aula
    });
  }

  async remove(id: number) {
    return await this.horarioRepository.softDelete(id);
  }
}
