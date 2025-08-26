import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePrerequisitoDto } from './dto/create-prerequisito.dto';
import { UpdatePrerequisitoDto } from './dto/update-prerequisito.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Prerequisito } from './entities/prerequisito.entity';
import { Repository } from 'typeorm';
import { Materia } from 'src/materias/entities/materia.entity';

@Injectable()
export class PrerequisitosService {
  constructor(
    @InjectRepository(Prerequisito)
    private readonly prerequisitosRepository: Repository<Prerequisito>,

    @InjectRepository(Materia)
    private readonly materiasRepository: Repository<Materia>,
  ) {}

  async create(createPrerequisitoDto: CreatePrerequisitoDto) {
    const prerequisitoData: Partial<Prerequisito> = {};

    if (createPrerequisitoDto.idMateria) {
      const materia = await this.materiasRepository.findOneBy({
        id: createPrerequisitoDto.idMateria
      });
      if (!materia) {
        throw new BadRequestException('La materia no existe');
      }
      prerequisitoData.idMateria = materia;
    }

    if (createPrerequisitoDto.idPrerequisito) {
      const prerequisito = await this.materiasRepository.findOneBy({
        id: createPrerequisitoDto.idPrerequisito
      });
      if (!prerequisito) {
        throw new BadRequestException('La materia prerequisito no existe');
      }
      prerequisitoData.idPrerequisito = prerequisito;
    }

    // Validar que no se esté creando un prerequisito con la misma materia
    if (createPrerequisitoDto.idMateria === createPrerequisitoDto.idPrerequisito) {
      throw new BadRequestException('Una materia no puede ser prerequisito de sí misma');
    }

    return await this.prerequisitosRepository.save(prerequisitoData);
  }

  async findAll() {
    return await this.prerequisitosRepository.find();
  }

  async findOne(id: number) {
    return await this.prerequisitosRepository.findOneBy({id});
  }

  async update(id: number, updatePrerequisitoDto: UpdatePrerequisitoDto) {
    const prerequisito = await this.prerequisitosRepository.findOneBy({ id });

    if (!prerequisito) {
      throw new BadRequestException('El prerequisito no existe');
    }

    const prerequisitoData: Partial<Prerequisito> = { ...prerequisito };

    if (updatePrerequisitoDto.idMateria) {
      const materia = await this.materiasRepository.findOneBy({
        id: updatePrerequisitoDto.idMateria
      });
      if (!materia) {
        throw new BadRequestException('La materia no existe');
      }
      prerequisitoData.idMateria = materia;
    }

    if (updatePrerequisitoDto.idPrerequisito) {
      const materiaPrerequisito = await this.materiasRepository.findOneBy({
        id: updatePrerequisitoDto.idPrerequisito
      });
      if (!materiaPrerequisito) {
        throw new BadRequestException('La materia prerequisito no existe');
      }
      prerequisitoData.idPrerequisito = materiaPrerequisito;
    }

    // Validar que no se esté actualizando para que una materia sea prerequisito de sí misma
    const finalMateriaId = updatePrerequisitoDto.idMateria || prerequisito.idMateria?.id;
    const finalPrerequisitoId = updatePrerequisitoDto.idPrerequisito || prerequisito.idPrerequisito?.id;

    if (finalMateriaId === finalPrerequisitoId) {
      throw new BadRequestException('Una materia no puede ser prerequisito de sí misma');
    }

    return await this.prerequisitosRepository.save(prerequisitoData);
  }

  async remove(id: number) {
    return await this.prerequisitosRepository.softDelete(id);
  }

  async findPrerequisitosMateria(materiaId: number) {
    const materia = await this.materiasRepository.findOne({
      where: { id: materiaId },
      relations: ['idNivel']
    });
      
    if (!materia) {
      throw new BadRequestException('La materia no existe');
    }

    const prerequisitos = await this.prerequisitosRepository.find({
      where: { 
          idMateria: { id: materiaId } 
      },
      relations: ['idPrerequisito', 'idPrerequisito.idNivel']
    });

    return {
      materia: {
        id: materia.id,
        nombre: materia.nombre,
        codigo: materia.codigo,
        nivel: materia.idNivel.nombre
      },
      prerequisitos: prerequisitos.map(pre => ({
        id: pre.idPrerequisito.id,
        nombre: pre.idPrerequisito.nombre,
        codigo: pre.idPrerequisito.codigo,
        nivel: pre.idPrerequisito.idNivel.nombre
      }))
    };
  }
}
