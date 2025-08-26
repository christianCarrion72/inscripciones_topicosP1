import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGrupoMateriaDto } from './dto/create-grupo_materia.dto';
import { UpdateGrupoMateriaDto } from './dto/update-grupo_materia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GrupoMateria } from './entities/grupo_materia.entity';
import { Repository } from 'typeorm';
import { Materia } from 'src/materias/entities/materia.entity';
import { Docente } from 'src/docentes/entities/docente.entity';
import { Grupo } from 'src/grupos/entities/grupo.entity';

@Injectable()
export class GrupoMateriasService {

  constructor(
    @InjectRepository(GrupoMateria)
    private readonly grupoMateriaRepository: Repository<GrupoMateria>,

    @InjectRepository(Materia)
    private readonly materiaRepository: Repository<Materia>,

    @InjectRepository(Docente)
    private readonly docenteRepository: Repository<Docente>,

    @InjectRepository(Grupo)
    private readonly grupoRepository: Repository<Grupo>
  ){}
  async create(createGrupoMateriaDto: CreateGrupoMateriaDto) {
    const grupoMateriaData: Partial<GrupoMateria> = {
      cupos: createGrupoMateriaDto.cupos
    }

    if (createGrupoMateriaDto.idMateria) {
      const materia = await this.materiaRepository.findOneBy({
        id: createGrupoMateriaDto.idMateria,
      });
      if (!materia) {
        throw new BadRequestException('Materia no encontrada');
      }

      grupoMateriaData.idMateria = materia;
    }

    if (createGrupoMateriaDto.idDocente) {
      const docente = await this.docenteRepository.findOneBy({
        id: createGrupoMateriaDto.idDocente,
      });
      if (!docente) {
        throw new BadRequestException('Docente no encontrado');
      }

      grupoMateriaData.idDocente = docente;
    }

    if (createGrupoMateriaDto.idGrupo) {
      const grupo = await this.grupoRepository.findOneBy({
        id: createGrupoMateriaDto.idGrupo,
      });
      if (!grupo) {
        throw new BadRequestException('Grupo no encontrado');
      }

      grupoMateriaData.idGrupo = grupo;
    }
    return await this.grupoMateriaRepository.save(grupoMateriaData);
  }

  async findAll() {
    return await this.grupoMateriaRepository.find();
  }

  async findOne(id: number) {
    return await this.grupoMateriaRepository.findOneBy({id});
  }

  async update(id: number, updateGrupoMateriaDto: UpdateGrupoMateriaDto) {
    const grupoMateria = await this.grupoMateriaRepository.findOneBy({id});
    if (!grupoMateria) {
      throw new BadRequestException('El Grupo Materia no existe');
    } 

    let materia;
    if (updateGrupoMateriaDto.idMateria) {
      materia = await this.materiaRepository.findOneBy({
        id: updateGrupoMateriaDto.idMateria
      });

      if (!materia) {
        throw new BadRequestException('Materia no encontrada');
      }
    }

    let docente;
    if (updateGrupoMateriaDto.idDocente) {
      docente = await this.docenteRepository.findOneBy({
        id: updateGrupoMateriaDto.idDocente
      });

      if (!docente) {
        throw new BadRequestException('Docente no encontrado');
      }
    }

    let grupo;
    if (updateGrupoMateriaDto.idGrupo) {
      grupo = await this.grupoRepository.findOneBy({
        id: updateGrupoMateriaDto.idGrupo
      });

      if (!grupo) {
        throw new BadRequestException('Grupo no encontrado');
      }
    }
    return await this.grupoMateriaRepository.save({
      ...grupoMateria,
      ...updateGrupoMateriaDto,
      idMateria: materia,
      idDocente: docente,
      idGrupo: grupo
    });
  }

  async remove(id: number) {
    return await this.grupoMateriaRepository.softDelete(id);
  }
}
