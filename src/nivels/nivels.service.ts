import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNivelDto } from './dto/create-nivel.dto';
import { UpdateNivelDto } from './dto/update-nivel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Nivel } from './entities/nivel.entity';
import { Repository } from 'typeorm';
import { PlanEstudio } from 'src/plan_estudios/entities/plan_estudio.entity';

@Injectable()
export class NivelsService {
  constructor(

    @InjectRepository(Nivel)
    private readonly nivelRepository: Repository<Nivel>,

    @InjectRepository(PlanEstudio)
    private readonly planEstudioRepository: Repository<PlanEstudio>,
  ){}

  async create(createNivelDto: CreateNivelDto) {
    const plan_estudio = await this.planEstudioRepository.findOneBy({
      id: createNivelDto.idPlan
    });

    if (!plan_estudio) {
      throw new BadRequestException('El plan de estudio no existe'); 
    }

    return await this.nivelRepository.save({
      ...createNivelDto,
      idPlan: plan_estudio,
    });
  }

  async findAll() {
    return await this.nivelRepository.find();
  }

  async findOne(id: number) {
    return await this.nivelRepository.findOneBy({id});
  }

  async update(id: number, updateNivelDto: UpdateNivelDto) {
    const nivel = await this.nivelRepository.findOneBy({id});

    if(!nivel){
      throw new BadRequestException('El nivel no existe');
    }
    let plan_estudio;
    if (updateNivelDto.idPlan) {
      plan_estudio = await this.planEstudioRepository.findOneBy({
        id : updateNivelDto.idPlan
      }); 
      if (!plan_estudio) {
        throw new BadRequestException('El plan de estudio no encontrado');
      }
    }

    return await this,this.nivelRepository.save({
      ...nivel,
      ...updateNivelDto,
      idPlan: plan_estudio,
    });
  }

  async remove(id: number) {
    return await this.nivelRepository.softDelete({id});
  }
}
