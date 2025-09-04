import { Injectable, Logger } from '@nestjs/common';
import { TareasProducer } from './tareas.producer';

@Injectable()
export class TareasTestService {
  private readonly logger = new Logger(TareasTestService.name);

  constructor(private readonly tareasProducer: TareasProducer) {}

  /**
   * Crea una tarea de prueba que siempre falla
   */
  async createFailingTask(): Promise<string> {
    const jobId = `test-fail-${Date.now()}`;
    
    await this.tareasProducer.enqueue(
      'carrera', // Usar una entidad existente
      'findOne',
      { id: 'non-existent-id' }, // ID que no existe para forzar fallo
      jobId
    );

    this.logger.log(`Tarea de prueba fallida creada con ID: ${jobId}`);
    return jobId;
  }

  /**
   * Crea una tarea de prueba que siempre tiene éxito
   */
  async createSuccessfulTask(): Promise<string> {
    const jobId = `test-success-${Date.now()}`;
    
    await this.tareasProducer.enqueue(
      'carrera',
      'findAll',
      undefined, // findAll no necesita parámetros
      jobId
    );

    this.logger.log(`Tarea de prueba exitosa creada con ID: ${jobId}`);
    return jobId;
  }

  /**
   * Crea múltiples tareas de prueba (algunas fallan, otras tienen éxito)
   */
  async createMultipleTestTasks(count: number = 5): Promise<string[]> {
    const jobIds: string[] = [];
    
    for (let i = 0; i < count; i++) {
      const shouldFail = i % 2 === 0; // Alternar entre éxito y fallo
      const jobId = shouldFail 
        ? await this.createFailingTask()
        : await this.createSuccessfulTask();
      
      jobIds.push(jobId);
      
      // Pequeña pausa entre tareas
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    this.logger.log(`${count} tareas de prueba creadas`);
    return jobIds;
  }

  /**
   * Crea una tarea que simula un timeout
   */
  async createTimeoutTask(): Promise<string> {
    const jobId = `test-timeout-${Date.now()}`;
    
    // Crear una tarea con un timeout muy corto para simular timeout
    await this.tareasProducer.enqueueAndWait(
      'carrera',
      'findAll',
      undefined,
      5_000, // timeout de 5s
      jobId,
    );

    this.logger.log(`Tarea de timeout creada con ID: ${jobId}`);
    return jobId;
  }

  
  /**
   * Crea tareas con diferentes prioridades
   */
  async createPriorityTasks(): Promise<string[]> {
    const jobIds: string[] = [];
    
    // Tarea de baja prioridad
    const lowPriorityId = `test-low-priority-${Date.now()}`;
    await this.tareasProducer.enqueue(
      'carrera',
      'findAll',
      undefined,
      lowPriorityId
    );
    jobIds.push(lowPriorityId);

    // Tarea de alta prioridad
    const highPriorityId = `test-high-priority-${Date.now()}`;
    await this.tareasProducer.enqueue(
      'carrera',
      'findAll',
      undefined,
      highPriorityId
    );
    jobIds.push(highPriorityId);

    this.logger.log('Tareas con diferentes prioridades creadas');
    return jobIds;
  }
}
