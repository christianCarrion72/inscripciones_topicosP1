export type TaskName =
  | 'carrera.create'
  | 'carrera.update'
  | 'carreras.getAll'
  | 'carrera.get'
  | 'carrera.delete'
  | 'dia.create'
  | 'dia.update'
  | 'dia.get'
  | 'dias.getAll'
  | 'dia.delete';

export interface TaskPayload<T = any> {
    // payload flexible; puedes tiparlo por acción si quieres
    params?: Record<string, any>; // ej: { id: string }
    body?: T;                     // ej: DTO para create/update
    meta?: { requestId?: string }; // idempotencia opcional
  }