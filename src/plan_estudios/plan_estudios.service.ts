import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePlanEstudioDto } from './dto/create-plan_estudio.dto';
import { UpdatePlanEstudioDto } from './dto/update-plan_estudio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PlanEstudio } from './entities/plan_estudio.entity';
import { Repository } from 'typeorm';
import { Carrera } from 'src/carreras/entities/carrera.entity';

@Injectable()
export class PlanEstudiosService {

  constructor(
    @InjectRepository(PlanEstudio)
    private readonly planEstudioRepository: Repository<PlanEstudio>,

    @InjectRepository(Carrera)
    private readonly carreraRepository: Repository<Carrera>,
  ) {}

  async create(createPlanEstudioDto: CreatePlanEstudioDto) {
    const carrera = await this.carreraRepository.findOneBy({
      id: createPlanEstudioDto.idCarrera}
    );
    if(!carrera) {
      throw new BadRequestException('La carrera no existe');
    }

    return await this.planEstudioRepository.save({
      ...createPlanEstudioDto,
      idCarrera: carrera,
    })
  }

  async findAll() {
    return await this.planEstudioRepository.find();
  }

  async findOne(id: number) {
    return await this.planEstudioRepository.findOneBy({id});
  }

  async update(id: number, updatePlanEstudioDto: UpdatePlanEstudioDto) {
    
    const plan_estudio = await this.planEstudioRepository.findOneBy({id});

    if(!plan_estudio){
      throw new BadRequestException('El plan de estudio no existe');
    }

    let carrera;
    if(updatePlanEstudioDto.idCarrera){
      carrera = await this.carreraRepository.findOneBy({
        id: updatePlanEstudioDto.idCarrera,
      });

      if (!carrera) {
        throw new BadRequestException('Carrera no encontrada');
      }
    }
    
    return await this.planEstudioRepository.save({
      ...plan_estudio,
      ...updatePlanEstudioDto,
      idCarrera: carrera,
    });
  }

  async remove(id: number) {
    return await this.planEstudioRepository.softDelete(id);
  }
}
