import { Test, TestingModule } from '@nestjs/testing';
import { InscripcionsService } from './inscripcions.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Inscripcion } from './entities/inscripcion.entity';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';
import { Periodo } from 'src/periodos/entities/periodo.entity';
import { Gestion } from 'src/gestions/entities/gestion.entity';
import { EstudiantesService } from 'src/estudiantes/estudiantes.service';
import { GrupoMateria } from 'src/grupo_materias/entities/grupo_materia.entity';
import { Detalle } from 'src/detalles/entities/detalle.entity';
import { Nota } from 'src/notas/entities/nota.entity';
import {
  EstudianteIdRequiredException,
  EstudianteNotFoundException,
  GestionNotFoundException,
  GruposRequiredException,
  PeriodoNotFoundException,
} from 'src/common/exceptions/lista.exception';

describe('InscripcionsService - requestSeat', () => {
  let service: InscripcionsService;
  let estudianteRepository: Repository<Estudiante>;
  let periodoRepository: Repository<Periodo>;
  let gestionRepository: Repository<Gestion>;
  let estudiantesService: EstudiantesService;
  let dataSource: DataSource;

  const mockEstudiante = {
    id: 1,
    nombre: 'Juan Pérez',
    ci: '12345678',
    registro: 'REG001',
  };

  const mockGestion = {
    id: 1,
    numero: 2025,
  };

  const mockPeriodo = {
    id: 1,
    numero: 2,
    idGestion: mockGestion,
  };

  const mockInscripcion = {
    id: 1,
    idPeriodo: mockPeriodo,
    idEstudiante: mockEstudiante,
    fechaInscripcion: new Date(),
  };

  const mockDetalle = {
    id: 1,
    idInscripcion: mockInscripcion,
    idGrupoMat: { id: 1 },
  };

  beforeEach(async () => {
    const mockEstudianteRepository = {
      findOneBy: jest.fn(),
    };

    const mockPeriodoRepository = {
      findOne: jest.fn(),
    };

    const mockGestionRepository = {
      findOne: jest.fn(),
    };

    const mockEstudiantesService = {
      invalidateCacheForEstudiante: jest.fn(),
    };

    const mockGrupoRepo = {
      decrement: jest.fn(),
      increment: jest.fn(),
      findOneBy: jest.fn(),
    };

    const mockInscripcionRepo = {
      create: jest.fn(),
      save: jest.fn(),
    };

    const mockDetalleRepo = {
      create: jest.fn(),
      save: jest.fn(),
    };

    const mockNotaRepo = {
      create: jest.fn(),
      save: jest.fn(),
    };

    const mockManager = {
      getRepository: jest.fn((entity) => {
        if (entity === GrupoMateria) return mockGrupoRepo;
        if (entity === Inscripcion) return mockInscripcionRepo;
        if (entity === Detalle) return mockDetalleRepo;
        if (entity === Nota) return mockNotaRepo;
      }),
    };

    const mockDataSource = {
      transaction: jest.fn((callback) => callback(mockManager)),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InscripcionsService,
        {
          provide: getRepositoryToken(Inscripcion),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Estudiante),
          useValue: mockEstudianteRepository,
        },
        {
          provide: getRepositoryToken(Periodo),
          useValue: mockPeriodoRepository,
        },
        {
          provide: getRepositoryToken(Gestion),
          useValue: mockGestionRepository,
        },
        {
          provide: EstudiantesService,
          useValue: mockEstudiantesService,
        },
        {
          provide: DataSource,
          useValue: mockDataSource,
        },
      ],
    }).compile();

    service = module.get<InscripcionsService>(InscripcionsService);
    estudianteRepository = module.get<Repository<Estudiante>>(
      getRepositoryToken(Estudiante),
    );
    periodoRepository = module.get<Repository<Periodo>>(
      getRepositoryToken(Periodo),
    );
    gestionRepository = module.get<Repository<Gestion>>(
      getRepositoryToken(Gestion),
    );
    estudiantesService = module.get<EstudiantesService>(EstudiantesService);
    dataSource = module.get<DataSource>(DataSource);
  });

  describe('requestSeat', () => {
    it('debe lanzar EstudianteIdRequiredException si no se proporciona idEstudiante', async () => {
      const dto = { idsGrupoMateria: [1, 2] };

      await expect(service.requestSeat(dto as any)).rejects.toThrow(
        EstudianteIdRequiredException,
      );
    });

    it('debe lanzar GruposRequiredException si idsGrupoMateria está vacío', async () => {
      const dto = { idEstudiante: 1, idsGrupoMateria: [] };

      await expect(service.requestSeat(dto)).rejects.toThrow(
        GruposRequiredException,
      );
    });

    it('debe lanzar EstudianteNotFoundException si el estudiante no existe', async () => {
      jest.spyOn(estudianteRepository, 'findOneBy').mockResolvedValue(null);

      const dto = { idEstudiante: 999, idsGrupoMateria: [1] };

      await expect(service.requestSeat(dto)).rejects.toThrow(
        EstudianteNotFoundException,
      );
    });

    it('debe lanzar GestionNotFoundException si la gestión no existe', async () => {
      jest
        .spyOn(estudianteRepository, 'findOneBy')
        .mockResolvedValue(mockEstudiante as any);
      jest.spyOn(gestionRepository, 'findOne').mockResolvedValue(null);

      const dto = { idEstudiante: 1, idsGrupoMateria: [1] };

      await expect(service.requestSeat(dto)).rejects.toThrow(
        GestionNotFoundException,
      );
    });

    it('debe lanzar PeriodoNotFoundException si el periodo no existe', async () => {
      jest
        .spyOn(estudianteRepository, 'findOneBy')
        .mockResolvedValue(mockEstudiante as any);
      jest
        .spyOn(gestionRepository, 'findOne')
        .mockResolvedValue(mockGestion as any);
      jest.spyOn(periodoRepository, 'findOne').mockResolvedValue(null);

      const dto = { idEstudiante: 1, idsGrupoMateria: [1] };

      await expect(service.requestSeat(dto)).rejects.toThrow(
        PeriodoNotFoundException,
      );
    });

    it('debe retornar REJECTED si no hay cupos disponibles', async () => {
      jest
        .spyOn(estudianteRepository, 'findOneBy')
        .mockResolvedValue(mockEstudiante as any);
      jest
        .spyOn(gestionRepository, 'findOne')
        .mockResolvedValue(mockGestion as any);
      jest
        .spyOn(periodoRepository, 'findOne')
        .mockResolvedValue(mockPeriodo as any);

      const mockManager = {
        getRepository: jest.fn((entity) => {
          if (entity === GrupoMateria) {
            return {
              decrement: jest.fn().mockResolvedValue({ affected: 0 }),
              increment: jest.fn(),
              findOneBy: jest.fn().mockResolvedValue({
                idMateria: { nombre: 'Matemáticas' },
                idGrupo: { sigla: 'A' },
              }),
            };
          }
          return {};
        }),
      };

      jest
        .spyOn(dataSource, 'transaction')
        .mockImplementation((callback: any) => callback(mockManager));

      const dto = { idEstudiante: 1, idsGrupoMateria: [1] };
      const result = await service.requestSeat(dto);

      expect(result.status).toBe('REJECTED');
      expect(result.reason).toContain('Sin cupos el grupo');
    });

    it('debe crear inscripción exitosamente cuando todo es válido', async () => {
      jest
        .spyOn(estudianteRepository, 'findOneBy')
        .mockResolvedValue(mockEstudiante as any);
      jest
        .spyOn(gestionRepository, 'findOne')
        .mockResolvedValue(mockGestion as any);
      jest
        .spyOn(periodoRepository, 'findOne')
        .mockResolvedValue(mockPeriodo as any);

      const mockManager = {
        getRepository: jest.fn((entity) => {
          if (entity === GrupoMateria) {
            return {
              decrement: jest.fn().mockResolvedValue({ affected: 1 }),
              increment: jest.fn(),
            };
          }
          if (entity === Inscripcion) {
            return {
              create: jest.fn().mockReturnValue(mockInscripcion),
              save: jest.fn().mockResolvedValue(mockInscripcion),
            };
          }
          if (entity === Detalle) {
            return {
              create: jest.fn().mockReturnValue(mockDetalle),
              save: jest.fn().mockResolvedValue([mockDetalle]),
            };
          }
          if (entity === Nota) {
            return {
              create: jest.fn().mockReturnValue({}),
              save: jest.fn().mockResolvedValue({}),
            };
          }
        }),
      };

      jest
        .spyOn(dataSource, 'transaction')
        .mockImplementation((callback: any) => callback(mockManager));

      const dto = { idEstudiante: 1, idsGrupoMateria: [1, 2] };
      const result = await service.requestSeat(dto);

      expect(result.status).toBe('CONFIRMED');
      expect(result.inscripcion).toBeDefined();
      expect(result.grupos).toEqual([1, 2]);
      expect(estudiantesService.invalidateCacheForEstudiante).toHaveBeenCalledWith(1);
    });

    it('debe hacer rollback de cupos si falla después de reservar algunos', async () => {
      jest
        .spyOn(estudianteRepository, 'findOneBy')
        .mockResolvedValue(mockEstudiante as any);
      jest
        .spyOn(gestionRepository, 'findOne')
        .mockResolvedValue(mockGestion as any);
      jest
        .spyOn(periodoRepository, 'findOne')
        .mockResolvedValue(mockPeriodo as any);

      const mockIncrement = jest.fn();
      const mockManager = {
        getRepository: jest.fn((entity) => {
          if (entity === GrupoMateria) {
            return {
              decrement: jest
                .fn()
                .mockResolvedValueOnce({ affected: 1 })
                .mockResolvedValueOnce({ affected: 0 }),
              increment: mockIncrement,
              findOneBy: jest.fn().mockResolvedValue({
                idMateria: { nombre: 'Física' },
                idGrupo: { sigla: 'B' },
              }),
            };
          }
          return {};
        }),
      };

      jest
        .spyOn(dataSource, 'transaction')
        .mockImplementation((callback: any) => callback(mockManager));

      const dto = { idEstudiante: 1, idsGrupoMateria: [1, 2] };
      const result = await service.requestSeat(dto);

      expect(result.status).toBe('REJECTED');
      expect(mockIncrement).toHaveBeenCalled();
    });
  });

  describe('calcularNumeroPeriodo', () => {
    it('debe retornar 1 para marzo-julio', () => {
      const fecha = new Date('2025-05-15');
      const resultado = service['calcularNumeroPeriodo'](fecha);
      expect(resultado).toBe(1);
    });

    it('debe retornar 2 para agosto-noviembre', () => {
      const fecha = new Date('2025-10-15');
      const resultado = service['calcularNumeroPeriodo'](fecha);
      expect(resultado).toBe(2);
    });

    it('debe retornar 3 para diciembre-febrero', () => {
      const fecha = new Date('2025-01-15');
      const resultado = service['calcularNumeroPeriodo'](fecha);
      expect(resultado).toBe(3);
    });
  });
});