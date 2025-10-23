# Documentación de Pruebas Unitarias

## Introducción

Este documento describe las pruebas unitarias implementadas para el sistema de inscripciones, con enfoque en la validación de cupos y los flujos asíncronos.

## Estructura de Pruebas

Las pruebas unitarias se han implementado siguiendo la pirámide de testing, con mayor énfasis en las pruebas unitarias que validan la lógica de negocio aislada.

### Módulos Probados

1. **GrupoMateriasService**: Pruebas para la gestión de cupos en grupos de materias.
2. **InscripcionsService**: Pruebas para la validación de cupos durante el proceso de inscripción.
3. **TareasWorker**: Pruebas para el procesamiento asíncrono de tareas.
4. **TareasProducer**: Pruebas para el encolamiento de tareas asíncronas.

## Pruebas de Validación de Cupos

### GrupoMateriasService

- **Pruebas implementadas**:
  - Búsqueda de grupo materia por ID
  - Actualización de cupos en grupo materia
  - Creación de grupo materia con cupos válidos

### InscripcionsService

- **Pruebas implementadas**:
  - Rechazo de inscripción cuando no hay cupos disponibles
  - Confirmación de inscripción cuando hay cupos disponibles
  - Manejo de múltiples grupos y rollback si alguno no tiene cupos

## Pruebas de Flujos Asíncronos

### TareasWorker

- **Pruebas implementadas**:
  - Procesamiento de tareas para inscripción (requestSeat)
  - Procesamiento de tareas para actualización de grupo materia
  - Manejo de errores para entidades no soportadas
  - Manejo de errores para operaciones no soportadas

### TareasProducer

- **Pruebas implementadas**:
  - Encolamiento de tareas para inscripción en cola específica
  - Encolamiento balanceado para otras entidades
  - Generación automática de ID de trabajo

## Estrategias de Testing para Flujos Asíncronos

Se han implementado las siguientes estrategias para probar los flujos asíncronos:

1. **Mocking de dependencias**: Se han utilizado mocks para simular el comportamiento de las colas y workers.
2. **Verificación de progreso**: Se verifica que los jobs actualicen su progreso correctamente.
3. **Verificación de resultados**: Se verifica que los resultados de los jobs sean los esperados.

## Cobertura de Pruebas

La cobertura de pruebas se ha verificado utilizando Jest, enfocándose en los módulos críticos para la validación de cupos y los flujos asíncronos.

## Ejecución de Pruebas

Para ejecutar las pruebas unitarias:

```bash
npm run test
```

Para ejecutar las pruebas con cobertura:

```bash
npm run test:cov
```

## Solución de Problemas

### Problemas de Importación

Para resolver los problemas de importación en las pruebas unitarias, se ha configurado Jest para manejar correctamente las rutas absolutas que comienzan con 'src/'. La solución consiste en agregar la siguiente configuración en el archivo `package.json`:

```json
"jest": {
  // Configuración existente...
  "moduleNameMapper": {
    "^src/(.*)$": "<rootDir>/$1"
  }
}
```

Esta configuración permite que Jest resuelva correctamente las rutas absolutas utilizadas en los archivos de entidades y servicios.

### Simplificación de Pruebas

Para algunos módulos con dependencias complejas, se ha optado por un enfoque de mocking simplificado, centrándose en probar la lógica de negocio esencial sin depender de la implementación completa de todas las dependencias.

## Mejoras Futuras

1. Aumentar la cobertura de pruebas para incluir más módulos.
2. Implementar pruebas de integración para validar la interacción entre módulos.
3. Implementar pruebas end-to-end para validar flujos completos de usuario.