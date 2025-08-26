import { BadRequestException, Injectable } from '@nestjs/common';
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
    const boletaData: Partial<BoletaHorario> = {};
    
    if (createBoletaHorarioDto.idHorario) {
      const horario = await this.horarioRepository.findOneBy({
        id: createBoletaHorarioDto.idHorario
      });
      if(!horario) {
        throw new BadRequestException('El horario no existe');
      }
      boletaData.idHorario = horario;
    }

    if (createBoletaHorarioDto.idGrupoMateria) {
      const grupoMateria = await this.grupoMateriaRepository.findOneBy({
        id: createBoletaHorarioDto.idGrupoMateria
      });
      if(!grupoMateria) {
        throw new BadRequestException('El grupo de materia no existe');
      }
      boletaData.idGrupoMateria = grupoMateria;
    }

    return await this.boletaHorarioRepository.save(boletaData);
  }

  async findAll() {
    return await this.boletaHorarioRepository.find();
  }

  async findOne(id: number) {
    return await this.boletaHorarioRepository.findOneBy({id});
  }

  async update(id: number, updateBoletaHorarioDto: UpdateBoletaHorarioDto) {
    
    const boletaHorario = await this.boletaHorarioRepository.findOneBy({id});

    if(!boletaHorario){
      throw new BadRequestException('La boleta horario no existe');
    }

    let horario;
    if(updateBoletaHorarioDto.idHorario){
      horario = await this.horarioRepository.findOneBy({
        id: updateBoletaHorarioDto.idHorario,
      });

      if (!horario) {
        throw new BadRequestException('Horario no encontrado');
      }
    }

    let grupoMateria;
    if(updateBoletaHorarioDto.idGrupoMateria){
      grupoMateria = await this.grupoMateriaRepository.findOneBy({
        id: updateBoletaHorarioDto.idGrupoMateria,
      });

      if (!grupoMateria) {
        throw new BadRequestException('Grupo de materia no encontrado');
      }
    }
    
    return await this.boletaHorarioRepository.save({
      ...boletaHorario,
      ...updateBoletaHorarioDto,
      idHorario: horario,
      idGrupoMateria: grupoMateria,
    });
  }

  async remove(id: number) {
    return await this.boletaHorarioRepository.softDelete(id);
  }
}
