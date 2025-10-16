import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePeriodoDto } from './dto/create-periodo.dto';
import { UpdatePeriodoDto } from './dto/update-periodo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Periodo } from './entities/periodo.entity';
import { Repository } from 'typeorm';
import { Gestion } from 'src/gestions/entities/gestion.entity';
import { GrupoMateria } from 'src/grupo_materias/entities/grupo_materia.entity';

@Injectable()
export class PeriodosService {
  constructor (
    @InjectRepository(Periodo)
    private readonly periodoRepository: Repository<Periodo>,

    @InjectRepository(Gestion)
    private readonly gestionRepository: Repository<Gestion>,
  ){}

  async create(createPeriodoDto: CreatePeriodoDto) {
    const periodoData: Partial<Periodo> = {
      numero: createPeriodoDto.numero
    } 

    if (createPeriodoDto.idGestion) {
      const gestion = await this.gestionRepository.findOneBy({
        id: createPeriodoDto.idGestion
      });
      if (!gestion) {
        throw new BadRequestException('La Gestion no existe');
      }

      periodoData.idGestion = gestion;
    }

    return await this.periodoRepository.save(periodoData);
  }

  async findAll() {
    return await this.periodoRepository.find();
  }

  async findOne(id: number) {
    return await this.periodoRepository.findOneBy({id});
  }

  async update(id: number, updatePeriodoDto: UpdatePeriodoDto) {
    const periodo = await this.periodoRepository.findOneBy({id});
    if (!periodo) {
      throw new BadRequestException('Periodo no encontrado');
    }

    let gestion;
    if (updatePeriodoDto.idGestion) {
      gestion = this.gestionRepository.findOneBy({
        id: updatePeriodoDto.idGestion
      });

      if (!gestion) {
        throw new BadRequestException('Gestion no encontrada');
      }
    }

    return await this.periodoRepository.save({
      ...periodo,
      ...updatePeriodoDto,
      idGestion: gestion,
    });
  }

  async remove(id: number) {
    return await this.periodoRepository.softDelete(id);
  }
}
