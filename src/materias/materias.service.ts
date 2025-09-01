import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Materia } from './entities/materia.entity';
import { Repository } from 'typeorm';
import { Nivel } from 'src/nivels/entities/nivel.entity';
import { PlanEstudio } from 'src/plan_estudios/entities/plan_estudio.entity';

@Injectable()
export class MateriasService {

  constructor(
    @InjectRepository(Materia)
    private readonly materiasRepository: Repository<Materia>,

    @InjectRepository(Nivel)
    private readonly nivelsRepository: Repository<Nivel>,

    @InjectRepository(PlanEstudio)
    private readonly planEstudioRepository: Repository<PlanEstudio>,
  ) {}

  async create(createMateriaDto: CreateMateriaDto) {
    const materiaData: Partial<Materia> = {
      nombre: createMateriaDto.nombre,
      codigo: createMateriaDto.codigo
    } 

    if (createMateriaDto.idNivel) {
      const nivel = await this.nivelsRepository.findOneBy({
        id: createMateriaDto.idNivel
      });
      if (!nivel) {
        throw new BadRequestException('El nivel no existe');
      }
      materiaData.idNivel = nivel;
    }

    if (createMateriaDto.idPlan) {
      const plan_estudio = await this.planEstudioRepository.findOneBy({
        id: createMateriaDto.idPlan
      });
      if (!plan_estudio) {
        throw new BadRequestException('El Plan de Estudio no existe');
      }
      materiaData.idPlan = plan_estudio;
    }

    return await this.materiasRepository.save(materiaData);
  }

  async findAll() {
    return await this.materiasRepository.find();
  }

  async findOne(id: number) {
    return await this.materiasRepository.findOneBy({id});
  }

  async update(id: number, updateMateriaDto: UpdateMateriaDto) {
    const materia = await this.materiasRepository.findOneBy({id});

    if(!materia){
      throw new BadRequestException('La materia no existe');
    }

    let nivel;
    if(updateMateriaDto.idNivel){
      nivel = await this.nivelsRepository.findOneBy({id : updateMateriaDto.idNivel});
      if(!nivel){
        throw new BadRequestException('El nivel no encontrado');
      }
    }

    let plan_estudio;
    if(updateMateriaDto.idPlan){
      plan_estudio = await this.planEstudioRepository.findOneBy({id : updateMateriaDto.idPlan});
      if(!plan_estudio){
        throw new BadRequestException('El Plan de Estudio no encontrado');
      }
    }

    return await this.materiasRepository.save({
      ...materia,
      ...updateMateriaDto,
      idNivel: nivel,
      idPlan: plan_estudio,
    });
  }

  async remove(id: number) {
    return await this.materiasRepository.softDelete(id);
  }
}
