// src/tareas/task.types.ts
export type OperationType = 'create' | 'update' | 'findOne' | 'findAll' | 'remove';
export type TaskStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';

export interface TaskData<T = any> {
  type: OperationType;     // operación CRUD
  entity: string;          // entidad (ej: carrera, dia, aula)
  status: TaskStatus;      // estado
  data?: T;                // DTO, parámetros, etc.
  result?: any;
  error?: string;
  createdAt: Date;
  updatedAt?: Date;
  priority?: number;
  retryCount?: number;
  maxRetries?: number;
  timeout?: number;
  metadata?: Record<string, any>;
}
