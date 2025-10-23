import { Test, TestingModule } from '@nestjs/testing';
import { TareasWorker } from './tareas.worker';
import { Job } from 'bullmq';
import { TaskData } from './tareas.types';

describe('TareasWorker', () => {
  let worker: TareasWorker;
  
  // Mock para los servicios de entidades
  const mockEntityServices = {
    inscripcion: {
      requestSeat: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    },
    grupo_materia: {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TareasWorker,
        {
          provide: 'ENTITY_SERVICES',
          useValue: mockEntityServices,
        },
      ],
    }).compile();

    worker = module.get<TareasWorker>(TareasWorker);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(worker).toBeDefined();
  });

  describe('process', () => {
    it('should process a job for inscripcion.requestSeat', async () => {
      // Mock para el job
      const mockJob = {
        data: {
          entity: 'inscripcion',
          type: 'requestSeat',
          data: { idEstudiante: 1, idPeriodo: 1, idsGrupoMateria: [1, 2] },
        },
        updateProgress: jest.fn().mockResolvedValue(undefined),
      } as unknown as Job<TaskData>;

      // Mock para el resultado esperado
      const expectedResult = {
        status: 'CONFIRMED',
        inscripcion: { id: 1 },
        grupos: [1, 2],
      };

      // Configurar el mock para el método requestSeat
      mockEntityServices.inscripcion.requestSeat.mockResolvedValue(expectedResult);

      // Ejecutar el método a probar
      const result = await worker.process(mockJob);

      // Verificar que se llamó al método requestSeat con los parámetros correctos
      expect(mockEntityServices.inscripcion.requestSeat).toHaveBeenCalledWith({
        idEstudiante: 1,
        idPeriodo: 1,
        idsGrupoMateria: [1, 2],
      });

      // Verificar que se actualizó el progreso del job
      expect(mockJob.updateProgress).toHaveBeenCalledWith(25);
      expect(mockJob.updateProgress).toHaveBeenCalledWith(100);

      // Verificar el resultado
      expect(result).toEqual(expectedResult);
    });

    it('should process a job for grupo_materia.update', async () => {
      // Mock para el job
      const mockJob = {
        data: {
          entity: 'grupo_materia',
          type: 'update',
          data: { id: 1, cupos: 20 },
        },
        updateProgress: jest.fn().mockResolvedValue(undefined),
      } as unknown as Job<TaskData>;

      // Mock para el resultado esperado
      const expectedResult = { id: 1, cupos: 20 };

      // Configurar el mock para el método update
      mockEntityServices.grupo_materia.update.mockResolvedValue(expectedResult);

      // Ejecutar el método a probar
      const result = await worker.process(mockJob);

      // Verificar que se llamó al método update con los parámetros correctos
      expect(mockEntityServices.grupo_materia.update).toHaveBeenCalledWith(1, {
        id: 1,
        cupos: 20,
      });

      // Verificar que se actualizó el progreso del job
      expect(mockJob.updateProgress).toHaveBeenCalledWith(25);
      expect(mockJob.updateProgress).toHaveBeenCalledWith(100);

      // Verificar el resultado
      expect(result).toEqual(expectedResult);
    });

    it('should throw an error if entity is not supported', async () => {
      // Mock para el job con una entidad no soportada
      const mockJob = {
        data: {
          entity: 'unsupported_entity',
          type: 'findAll',
          data: {},
        },
        updateProgress: jest.fn().mockResolvedValue(undefined),
      } as unknown as Job<TaskData>;

      // Ejecutar el método a probar y verificar que lanza un error
      await expect(worker.process(mockJob)).rejects.toThrow(
        'Entidad no soportada: unsupported_entity',
      );
    });

    it('should throw an error if operation is not supported', async () => {
      // Mock para el job con una operación no soportada
      const mockJob = {
        data: {
          entity: 'inscripcion',
          type: 'unsupported_operation',
          data: {},
        },
        updateProgress: jest.fn().mockResolvedValue(undefined),
      } as unknown as Job<TaskData>;

      // Ejecutar el método a probar y verificar que lanza un error
      await expect(worker.process(mockJob)).rejects.toThrow(
        'Operación no soportada: inscripcion.unsupported_operation',
      );
    });
  });
});