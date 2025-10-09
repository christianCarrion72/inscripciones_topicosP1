// src/tareas/task.types.ts
export type OperationType = 'create' | 'update' | 'findOne' | 'findAll' | 'remove' | 'requestSeat' | 'getMateriasDisponibles';
export type TaskStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';

export interface TaskData<T = any> {
  type: OperationType;     // operación CRUD
  entity: string;          // entidad (ej: carrera, dia, aula)
  data?: T;                // DTO, parámetros, etc.
  callbackUrl?: string;    // URL para callback cuando se complete o falle
  priority?: number;       // prioridad del job
  timeout?: number;        // timeout del job
}
