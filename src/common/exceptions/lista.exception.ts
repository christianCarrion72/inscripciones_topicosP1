// src/common/exceptions/lista.exception.ts
import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';

export class EstudianteNotFoundException extends AppException {
  constructor(id: number) {
    super(
      `El estudiante con id ${id} no existe`,
      HttpStatus.NOT_FOUND,
      'ESTUDIANTE_NOT_FOUND',
    );
  }
}

export class PeriodoNotFoundException extends AppException {
  constructor(gestion: number, periodo: number) {
    super(
      `No se encontró el periodo ${periodo} de la gestión ${gestion}`,
      HttpStatus.NOT_FOUND,
      'PERIODO_NOT_FOUND',
    );
  }
}

export class GrupoSinCuposException extends AppException {
  constructor(nombreMateria: string, sigla: string) {
    super(
      `Sin cupos en el grupo ${sigla} de ${nombreMateria}`,
      HttpStatus.CONFLICT,
      'GRUPO_SIN_CUPOS',
    );
  }
}

export class GestionNotFoundException extends AppException {
  constructor(gestion: number) {
    super(
      `La gestión ${gestion} no existe`,
      HttpStatus.NOT_FOUND,
      'GESTION_NOT_FOUND',
    );
  }
}

export class InscripcionNotFoundException extends AppException {
  constructor(id: number) {
    super(
      `La inscripción con id ${id} no existe`,
      HttpStatus.NOT_FOUND,
      'INSCRIPCION_NOT_FOUND',
    );
  }
}

export class EstudianteIdRequiredException extends AppException {
  constructor() {
    super(
      'El ID del estudiante es requerido',
      HttpStatus.BAD_REQUEST,
      'ESTUDIANTE_ID_REQUIRED',
    );
  }
}

export class GruposRequiredException extends AppException {
  constructor() {
    super(
      'Debe seleccionar al menos un grupo',
      HttpStatus.BAD_REQUEST,
      'GRUPOS_REQUIRED',
    );
  }
}

export class GrupoNotFoundException extends AppException {
  constructor(id: number) {
    super(
      `El grupo con ID ${id} no existe`,
      HttpStatus.NOT_FOUND,
      'GRUPO_NOT_FOUND',
    );
  }
}