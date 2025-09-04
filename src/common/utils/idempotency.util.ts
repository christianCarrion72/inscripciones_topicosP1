
// src/common/utils/idempotency.util.ts
import { createHash } from 'crypto';

export function hashBody(dto: any): string {
  // Ordenar las claves del objeto para generar hashes consistentes
  const sortedDto = JSON.stringify(dto, Object.keys(dto).sort());
  return createHash('sha256')
    .update(sortedDto)
    .digest('hex')
    .substring(0, 16); // Acortar para jobIds más manejables
}

/**
 * Genera un jobId único para tareas de BullMQ con formato:
 * {entity}:{operation}:{uniqueKey}
 *
 * @param entity Nombre de la entidad (ej: 'carrera')
 * @param operation Tipo de operación (ej: 'create', 'update', 'delete')
 * @param data Datos usados para generar hash o clave
 */
export function generateJobId(
  entity: string,
  operation: string,
  data: any,
): string {
  let uniqueValue: string;

  // Para operaciones que solo dependen del ID
  if (operation === 'remove' && data.id) {
    uniqueValue = `${data.id}`;
  } 
  // Para operaciones que modifican datos
  else if (operation === 'update' && data.id) {
    // Incluir ID + hash de los datos para update
    const dataHash = hashBody(data);
    uniqueValue = `${data.id}-${dataHash}`;
  }
  // Para create y otros casos
  else {
    uniqueValue = hashBody(data);
  }

  return `${entity}:${operation}:${uniqueValue}`;
}