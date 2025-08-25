import { Injectable } from '@nestjs/common';
import { CreateGrupoMateriaDto } from './dto/create-grupo_materia.dto';
import { UpdateGrupoMateriaDto } from './dto/update-grupo_materia.dto';

@Injectable()
export class GrupoMateriasService {
  create(createGrupoMateriaDto: CreateGrupoMateriaDto) {
    return 'This action adds a new grupoMateria';
  }

  findAll() {
    return `This action returns all grupoMaterias`;
  }

  findOne(id: number) {
    return `This action returns a #${id} grupoMateria`;
  }

  update(id: number, updateGrupoMateriaDto: UpdateGrupoMateriaDto) {
    return `This action updates a #${id} grupoMateria`;
  }

  remove(id: number) {
    return `This action removes a #${id} grupoMateria`;
  }
}
