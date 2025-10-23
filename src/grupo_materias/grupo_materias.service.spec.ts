import { Test, TestingModule } from '@nestjs/testing';
import { GrupoMateriasService } from './grupo_materias.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GrupoMateria } from './entities/grupo_materia.entity';
import { Materia } from '../materias/entities/materia.entity';
import { Docente } from '../docentes/entities/docente.entity';
import { Grupo } from '../grupos/entities/grupo.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

describe('GrupoMateriasService', () => {
  let service: GrupoMateriasService;
  let grupoMateriaRepository: Repository<GrupoMateria>;

  const mockGrupoMateriaRepository = {
    findOneBy: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    softDelete: jest.fn(),
    decrement: jest.fn(),
    increment: jest.fn(),
    create: jest.fn(),
  };

  const mockMateriaRepository = {
    findOneBy: jest.fn(),
  };

  const mockDocenteRepository = {
    findOneBy: jest.fn(),
  };

  const mockGrupoRepository = {
    findOneBy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GrupoMateriasService,
        {
          provide: getRepositoryToken(GrupoMateria),
          useValue: mockGrupoMateriaRepository,
        },
        {
          provide: getRepositoryToken(Materia),
          useValue: mockMateriaRepository,
        },
        {
          provide: getRepositoryToken(Docente),
          useValue: mockDocenteRepository,
        },
        {
          provide: getRepositoryToken(Grupo),
          useValue: mockGrupoRepository,
        },
      ],
    }).compile();

    service = module.get<GrupoMateriasService>(GrupoMateriasService);
    grupoMateriaRepository = module.get<Repository<GrupoMateria>>(
      getRepositoryToken(GrupoMateria),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a grupo materia by id', async () => {
      const mockGrupoMateria = { id: 1, cupos: 30 };
      mockGrupoMateriaRepository.findOneBy.mockResolvedValue(mockGrupoMateria);

      const result = await service.findOne(1);
      expect(result).toEqual(mockGrupoMateria);
      expect(mockGrupoMateriaRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it('should return null if grupo materia not found', async () => {
      mockGrupoMateriaRepository.findOneBy.mockResolvedValue(null);

      const result = await service.findOne(999);
      expect(result).toBeNull();
      expect(mockGrupoMateriaRepository.findOneBy).toHaveBeenCalledWith({ id: 999 });
    });
  });

  describe('update', () => {
    it('should throw BadRequestException if grupo materia not found', async () => {
      mockGrupoMateriaRepository.findOneBy.mockResolvedValue(null);

      await expect(service.update(999, { cupos: 20 })).rejects.toThrow(
        BadRequestException,
      );
      expect(mockGrupoMateriaRepository.findOneBy).toHaveBeenCalledWith({ id: 999 });
    });

    it('should update cupos successfully', async () => {
      const mockGrupoMateria = { id: 1, cupos: 30 };
      const updateDto = { cupos: 20 };
      mockGrupoMateriaRepository.findOneBy.mockResolvedValue(mockGrupoMateria);
      mockGrupoMateriaRepository.save.mockResolvedValue({
        ...mockGrupoMateria,
        ...updateDto,
      });

      const result = await service.update(1, updateDto);
      expect(result).toEqual({ id: 1, cupos: 20 });
      expect(mockGrupoMateriaRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(mockGrupoMateriaRepository.save).toHaveBeenCalledWith({
        ...mockGrupoMateria,
        ...updateDto,
      });
    });
  });

  describe('create', () => {
    it('should create a grupo materia with valid data', async () => {
      const createDto = { cupos: 30 };
      const mockGrupoMateria = { id: 1, cupos: 30 };
      
      mockGrupoMateriaRepository.save.mockResolvedValue(mockGrupoMateria);

      const result = await service.create(createDto);
      expect(result).toEqual(mockGrupoMateria);
      expect(mockGrupoMateriaRepository.save).toHaveBeenCalledWith({ cupos: 30 });
    });
  });
});