import { PartialType } from '@nestjs/mapped-types';
import { CreateGrupoMateriaDto } from './create-grupo_materia.dto';

export class UpdateGrupoMateriaDto extends PartialType(CreateGrupoMateriaDto) {}
