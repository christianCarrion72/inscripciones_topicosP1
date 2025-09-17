import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAulaDto } from './dto/create-aula.dto';
import { UpdateAulaDto } from './dto/update-aula.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Aula } from './entities/aula.entity';
import { Repository } from 'typeorm';
import { Modulo } from 'src/modulos/entities/modulo.entity';

@Injectable()
export class SyncAulasService {
  constructor(
    @InjectRepository(Aula)
    private readonly aulaRepository: Repository<Aula>,

    @InjectRepository(Modulo)
    private readonly moduloRepository: Repository<Modulo>,
  ){}

  async create(createAulaDto: CreateAulaDto) {
    const aulaData: Partial<Aula> = {
      numero: createAulaDto.numero
    }

    if(createAulaDto.idModulo){
      const modulo = await this.moduloRepository.findOneBy({
        id: createAulaDto.idModulo
      });
      if(!modulo){
        throw new BadRequestException('El módulo no existe');
      }

      aulaData.idModulo = modulo;
    }

    return await this.aulaRepository.save(aulaData);
  }

  async find() {
    return await this.aulaRepository.find({
      order: {
        id: 'ASC'
      }
    });
  }

  async findOne(id: number) {
    return await this.aulaRepository.findOne({
      where: { id }
    });
  }

  async update(id: number, updateAulaDto: UpdateAulaDto) {
    const aula = await this.aulaRepository.findOneBy({id});
    if (!aula) {
      throw new BadRequestException('El aula no existe');
    }

    let modulo;
    if(updateAulaDto.idModulo){
      modulo = await this.moduloRepository.findOneBy({
        id: updateAulaDto.idModulo
      })

      if (!modulo) {
        throw new BadRequestException('El módulo no encontrado');
      }
    }

    return await this.aulaRepository.save({
      ...aula,
      ...updateAulaDto,
      idModulo: modulo
    });
  }

  async remove(id: number) {
    return await this.aulaRepository.softDelete(id);
  }
}
