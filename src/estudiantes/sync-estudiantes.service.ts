import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Repository } from 'typeorm';
import { PlanEstudio } from 'src/plan_estudios/entities/plan_estudio.entity';
import { EstudianteNotFoundException } from 'src/common/exceptions/lista.exception';

@Injectable()
export class SyncEstudiantesService {

  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,

    @InjectRepository(PlanEstudio)
    private readonly planEstudioRepository: Repository<PlanEstudio>,
  ){}

  async create(createEstudianteDto: CreateEstudianteDto) {
    const estudianteData: Partial<Estudiante> = {
      nombre: createEstudianteDto.nombre,
      ci: createEstudianteDto.ci,
      registro: createEstudianteDto.registro,
      telefono: createEstudianteDto.telefono,
      direccion: createEstudianteDto.direccion,
      tituloBachiller: createEstudianteDto.tituloBachiller
    }

    if(createEstudianteDto.idPlan){
      const plan_estudio = await this.planEstudioRepository.findOneBy({
        id: createEstudianteDto.idPlan
      });
      if(!plan_estudio) {
        throw new BadRequestException('El plan de estudio no existe');
      }
      estudianteData.idPlan = plan_estudio;
    }

    return await this.estudianteRepository.save(estudianteData);
  }

  async find() {
    return await this.estudianteRepository.find({
      order: {
        id: 'ASC'
      }
    });
  }

  async findOne(id: number) {
    const estudiante = await this.estudianteRepository.findOneBy({id});
    if (!estudiante) {
      throw new EstudianteNotFoundException(id);
    }
    return estudiante;
  }

  async update(id: number, updateEstudianteDto: UpdateEstudianteDto) {
    const estudiante = await this.estudianteRepository.findOneBy({id})
    if (!estudiante) {
      throw new BadRequestException('El estudiante no existe');
    }

    let plan_estudio;
    if (updateEstudianteDto.idPlan) {
      plan_estudio = await this.planEstudioRepository.findOneBy({
        id : updateEstudianteDto.idPlan
      }); 
      if (!plan_estudio) {
        throw new BadRequestException('El plan de estudio no encontrado');
      }
    }

    return await this.estudianteRepository.save({
      ...estudiante,
      ...updateEstudianteDto,
      idPlan: plan_estudio,
    });
  }

  async remove(id: number) {
    return await this.estudianteRepository.softDelete(id);
  }
}
