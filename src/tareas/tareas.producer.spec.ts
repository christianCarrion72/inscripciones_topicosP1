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