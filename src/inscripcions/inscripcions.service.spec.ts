import { Test, TestingModule } from '@nestjs/testing';
import { InscripcionsService } from './inscripcions.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Inscripcion } from './entities/inscripcion.entity';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';
import { Periodo } from 'src/periodos/entities/periodo.entity';
import { Gestion } from 'src/gestions/entities/gestion.entity';
import { GrupoMateria } from 'src/grupo_materias/entities/grupo_materia.entity';
import { EstudiantesService } from 'src/estudiantes/estudiantes.service';
import { Detalle } from 'src/detalles/entities/detalle.entity';
import { Nota } from 'src/notas/entities/nota.entity';

describe('InscripcionsService', () => {
  let service: InscripcionsService;
  let mockDataSource: any;
  let mockGrupoRepo: any;
  let mockDetalleRepo: any;
  let mockNotaRepo: any;
  let mockInscripcionRepo: any;

  beforeEach(async () => {
    // Mock del repositorio de GrupoMateria
    mockGrupoRepo = {
      decrement: jest.fn(),
      increment: jest.fn(),
      findOneBy: jest.fn(),
    };

    // Mock del repositorio de Detalle
    mockDetalleRepo = {
      create: jest.fn((data) => ({ id: 1, ...data })),
      save: jest.fn((data) => Promise.resolve(data)),
    };

    // Mock del repositorio de Nota
    mockNotaRepo = {
      create: jest.fn((data) => ({ id: 1, ...data })),
      save: jest.fn((data) => Promise.resolve(data)),
    };

    // Mock del repositorio de Inscripcion
    mockInscripcionRepo = {
      create: jest.fn((data) => ({ id: 1, ...data })),
      save: jest.fn((data) => Promise.resolve({ id: 1, ...data })),
    };

    // Mock del DataSource y transaction
    mockDataSource = {
      transaction: jest.fn((callback) => {
        const mockManager = {
          getRepository: jest.fn((entity) => {
            if (entity === GrupoMateria) return mockGrupoRepo;
            if (entity === Detalle) return mockDetalleRepo;
            if (entity === Nota) return mockNotaRepo;
            if (entity === Inscripcion) return mockInscripcionRepo;
            return {
              create: jest.fn((data) => data),
              save: jest.fn((data) => Promise.resolve(data)),
            };
          }),
        };
        return callback(mockManager);
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InscripcionsService,
        {
          provide: getRepositoryToken(Inscripcion),
          useValue: { 
            save: jest.fn(), 
            find: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Estudiante),
          useValue: { 
            findOneBy: jest.fn().mockResolvedValue({ 
              id: 1, 
              nombre: 'Test Estudiante',
              ci: '12345678',
              registro: 'REG001',
            }) 
          },
        },
        {
          provide: getRepositoryToken(Periodo),
          useValue: { 
            findOne: jest.fn().mockResolvedValue({ 
              id: 1, 
              numero: 1,
            }) 
          },
        },
        {
          provide: getRepositoryToken(Gestion),
          useValue: { 
            findOne: jest.fn().mockResolvedValue({ 
              id: 1, 
              numero: 2025,
            }) 
          },
        },
        {
          provide: DataSource,
          useValue: mockDataSource,
        },
        {
          provide: EstudiantesService, 
          useValue: { 
            invalidateCacheForEstudiante: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    service = module.get<InscripcionsService>(InscripcionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('requestSeat - Validación de Cupos', () => {
    it('debe RECHAZAR cuando NO hay cupos disponibles', async () => {
      // Simula que el decrement NO afectó ninguna fila (affected = 0)
      mockGrupoRepo.decrement.mockResolvedValue({ affected: 0 });
      
      // Mock para el findOneBy que busca info del grupo
      mockGrupoRepo.findOneBy.mockResolvedValue({
        id: 1,
        idMateria: { nombre: 'Matemáticas' },
        idGrupo: { sigla: 'A' },
      });

      const result = await service.requestSeat({
        idEstudiante: 1,
        idsGrupoMateria: [1],
      });

      // VALIDA que el resultado sea REJECTED
      expect(result.status).toBe('REJECTED');
      expect(result.reason).toContain('Sin cupos');
      
      // VALIDA que intentó decrementar
      expect(mockGrupoRepo.decrement).toHaveBeenCalledWith(
        expect.objectContaining({ id: 1 }),
        'cupos',
        1
      );
    });

    it('debe CONFIRMAR cuando SÍ hay cupos disponibles', async () => {
      // Simula que el decrement SÍ afectó una fila (affected = 1)
      mockGrupoRepo.decrement.mockResolvedValue({ affected: 1 });

      const result = await service.requestSeat({
        idEstudiante: 1,
        idsGrupoMateria: [1],
      });

      // VALIDA que el resultado sea CONFIRMED
      expect(result.status).toBe('CONFIRMED');
      expect(result.inscripcion).toBeDefined();
      expect(result.grupos).toContain(1);
      
      // VALIDA que decrementó exitosamente
      expect(mockGrupoRepo.decrement).toHaveBeenCalledTimes(1);
      
      // VALIDA que se creó la inscripción
      expect(mockInscripcionRepo.save).toHaveBeenCalled();
      
      // VALIDA que se crearon los detalles
      expect(mockDetalleRepo.save).toHaveBeenCalled();
      
      // VALIDA que se crearon las notas
      expect(mockNotaRepo.save).toHaveBeenCalled();
    });

    it('debe REVERTIR cupos si falla en el segundo grupo', async () => {
      // Primer grupo: tiene cupos (affected = 1)
      // Segundo grupo: NO tiene cupos (affected = 0)
      mockGrupoRepo.decrement
        .mockResolvedValueOnce({ affected: 1 })  // Grupo 1: OK
        .mockResolvedValueOnce({ affected: 0 }); // Grupo 2: FALLA

      mockGrupoRepo.findOneBy.mockResolvedValue({
        id: 2,
        idMateria: { nombre: 'Física' },
        idGrupo: { sigla: 'B' },
      });

      const result = await service.requestSeat({
        idEstudiante: 1,
        idsGrupoMateria: [1, 2],
      });

      // VALIDA que rechazó la inscripción
      expect(result.status).toBe('REJECTED');
      
      // VALIDA que REVIRTIÓ el cupo del grupo 1
      expect(mockGrupoRepo.increment).toHaveBeenCalledWith(
        expect.objectContaining({ id: expect.anything() }),
        'cupos',
        1
      );
      
      // VALIDA que NO se creó la inscripción
      expect(mockInscripcionRepo.save).not.toHaveBeenCalled();
    });
  });
});