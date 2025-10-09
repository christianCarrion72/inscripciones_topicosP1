import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Docente } from './entities/docente.entity';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class DocentesService {
  constructor(
    @InjectRepository(Docente)
    private readonly docenteRepository: Repository<Docente>,

    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async create(createDocenteDto: CreateDocenteDto) {
    // Crear usuario con rol docente
    const user = await this.authService.register({
      email: createDocenteDto.email,
      contraseña: createDocenteDto.contraseña,
      rol: 'docente'
    });

    // Crear docente y asociarlo al usuario
    const docente = await this.docenteRepository.save({
      ...createDocenteDto,
      user: user
    });

    return docente;
  }

  async findAll() {
    return await this.docenteRepository.find();
  }

  async findOne(id: number) {
    return await this.docenteRepository.findOneBy({id});
  }

  async findOneByRegistro(registro: number) {
    const docentes = await this.docenteRepository.find({
        where: {},
        relations: ['user']
    });
    return docentes.find(d => d.registro === registro);
  }

  async update(id: number, updateDocenteDto: UpdateDocenteDto) {
    return await this.docenteRepository.update(id, updateDocenteDto);
  }

  async remove(id: number) {
    return await this.docenteRepository.softDelete(id);
  }
}
