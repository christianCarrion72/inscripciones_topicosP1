// src/common/utils/idempotency.util.ts
import { createHash } from 'crypto';

/**
 * Serializa un objeto de manera determinista
 * - Ordena todas las claves de forma recursiva
 * - Mantiene el orden de arrays
 */
function stableStringify(obj: any): string {
  if (obj === null || typeof obj !== 'object') {
    return JSON.stringify(obj);
  }

  if (Array.isArray(obj)) {
    // Mantener orden en arrays
    return `[${obj.map(stableStringify).join(',')}]`;
  }

  // Ordenar claves de objetos
  const keys = Object.keys(obj).sort();
  return `{${keys.map((k) => `${JSON.stringify(k)}:${stableStringify(obj[k])}`).join(',')}}`;
}

/**
 * Genera un hash consistente a partir de un DTO,
 * independiente del orden de las propiedades.
 */
export function hashBody(dto: any): string {
  const stable = stableStringify(dto);
  return createHash('sha256')
    .update(stable)
    .digest('hex')
    .substring(0, 16);
}

/**
 * Genera un jobId único para tareas de BullMQ con formato:
 * {entity}:{operation}:{uniqueKey}
 */
export function generateJobId(
  entity: string,
  operation: string,
  data: any,
): string {
  let uniqueValue: string;

  if (operation === 'remove' && data.id) {
    uniqueValue = `${data.id}`;
  } else if (operation === 'update' && data.id) {
    const dataHash = hashBody(data);
    uniqueValue = `${data.id}-${dataHash}`;
  } else {
    uniqueValue = hashBody(data);
  }

  return `${entity}:${operation}:${uniqueValue}`;
}
