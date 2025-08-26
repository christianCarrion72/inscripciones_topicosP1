import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Materia } from './entities/materia.entity';
import { Repository } from 'typeorm';
import { Nivel } from 'src/nivels/entities/nivel.entity';

@Injectable()
export class MateriasService {

  constructor(
    @InjectRepository(Materia)
    private readonly materiasRepository: Repository<Materia>,

    @InjectRepository(Nivel)
    private readonly nivelsRepository: Repository<Nivel>,
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
    return await this.materiasRepository.save({
      ...materia,
      ...updateMateriaDto,
      idNivel: nivel,
    });
  }

  async remove(id: number) {
    return await this.materiasRepository.softDelete(id);
  }
}
