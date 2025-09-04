// src/common/utils/idempotency.util.ts
import { createHash } from 'crypto';

export function hashBody(dto: any): string {
  return createHash('sha1')
    .update(JSON.stringify(dto))
    .digest('hex');
}

/**
 * Genera un jobId único para tareas de BullMQ con formato:
 * {entity}:{operation}:{uniqueKey}
 *
 * @param entity Nombre de la entidad (ej: 'carrera')
 * @param operation Tipo de operación (ej: 'create', 'update', 'delete')
 * @param dto Datos usados para generar hash o clave
 * @param uniqueField Campo único opcional (ej: 'codigo')
 */
export function generateJobId(
  entity: string,
  operation: string,
  dto: any,
): string {
  let uniqueValue: string;

    uniqueValue = hashBody(dto);

  return `${entity}:${operation}:${uniqueValue}`;
}
