import { Test, TestingModule } from '@nestjs/testing';
import { TareasProducer } from './tareas.producer';
import { QueueManagerService } from './queue-manager.service';

describe('TareasProducer', () => {
  let producer: TareasProducer;
  let queueManager: QueueManagerService;

  // Mock para el QueueManagerService
  const mockQueueManager = {
    enqueueToQueue: jest.fn(),
    enqueueBalanced: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TareasProducer,
        {
          provide: QueueManagerService,
          useValue: mockQueueManager,
        },
      ],
    }).compile();

    producer = module.get<TareasProducer>(TareasProducer);
    queueManager = module.get<QueueManagerService>(QueueManagerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(producer).toBeDefined();
  });

  describe('enqueue', () => {
    it('should enqueue a task for inscripcion.requestSeat to the inscripcion queue', async () => {
      // Datos para la prueba
      const entity = 'inscripcion';
      const type = 'requestSeat';
      const data = { idEstudiante: 1, idPeriodo: 1, idsGrupoMateria: [1, 2] };
      const jobId = 'test-job-id';

      // Configurar el mock para enqueueToQueue
      mockQueueManager.enqueueToQueue.mockResolvedValue(undefined);

      // Ejecutar el método a probar
      const result = await producer.enqueue(entity, type, data, undefined, jobId);

      // Verificar que se llamó al método enqueueToQueue con los parámetros correctos
      expect(mockQueueManager.enqueueToQueue).toHaveBeenCalledWith(
        'inscripcion',
        'inscripcion.requestSeat',
        { entity, type, data, callbackUrl: undefined },
        { jobId },
      );

      // Verificar el resultado
      expect(result).toEqual({
        mensaje: 'Procesando Tarea',
        jobId,
        notificationEndpoint: `/tareas/status/${jobId}`,
      });
    });

    it('should enqueue a balanced task for other entity types', async () => {
      // Datos para la prueba
      const entity = 'grupo_materia';
      const type = 'update';
      const data = { id: 1, cupos: 20 };
      const jobId = 'test-job-id';

      // Configurar el mock para enqueueBalanced
      mockQueueManager.enqueueBalanced.mockResolvedValue(undefined);

      // Ejecutar el método a probar
      const result = await producer.enqueue(entity, type, data, undefined, jobId);

      // Verificar que se llamó al método enqueueBalanced con los parámetros correctos
      expect(mockQueueManager.enqueueBalanced).toHaveBeenCalledWith(
        { entity, type, data, callbackUrl: undefined },
        { jobId },
      );

      // Verificar el resultado
      expect(result).toEqual({
        mensaje: 'Procesando Tarea',
        jobId,
        notificationEndpoint: `/tareas/status/${jobId}`,
      });
    });

    it('should generate a jobId if not provided', async () => {
      // Datos para la prueba
      const entity = 'grupo_materia';
      const type = 'update';
      const data = { id: 1, cupos: 20 };

      // Configurar el mock para enqueueBalanced
      mockQueueManager.enqueueBalanced.mockResolvedValue(undefined);

      // Ejecutar el método a probar
      const result = await producer.enqueue(entity, type, data);

      // Verificar que se generó un jobId
      expect(result.jobId).toBeDefined();
      expect(typeof result.jobId).toBe('string');
    });
  });
});