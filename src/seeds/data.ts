import * as bcryptjs from 'bcryptjs';

export const seedData = {
  users: [
    { id: 1, email: 'admin@example.com', contraseña: bcryptjs.hashSync('123456789', 10), rol: 'admin' },
    { id: 2, email: 'estudiante1@example.com', contraseña: bcryptjs.hashSync('123456789', 10), rol: 'estudiante' },
    { id: 3, email: 'estudiante2@example.com', contraseña: bcryptjs.hashSync('123456789', 10), rol: 'estudiante' },
    { id: 4, email: 'estudiante3@example.com', contraseña: bcryptjs.hashSync('123456789', 10), rol: 'estudiante' },
    { id: 5, email: 'docente1@example.com', contraseña: bcryptjs.hashSync('123456789', 10), rol: 'docente' },
    { id: 6, email: 'docente2@example.com', contraseña: bcryptjs.hashSync('123456789', 10), rol: 'docente' },
    { id: 7, email: 'docente3@example.com', contraseña: bcryptjs.hashSync('123456789', 10), rol: 'docente' },
  ],

  carreras: [
    { id: 1, nombre: 'Ingeniería de Sistemas', codigo: 'SIS' },
    { id: 2, nombre: 'Ingeniería Industrial', codigo: 'IND' },
    { id: 3, nombre: 'Ingeniería Civil', codigo: 'CIV' },
    { id: 4, nombre: 'Administración de Empresas', codigo: 'ADM' },
  ],

  planesEstudio: [
    { id: 1, nombre: 'Plan 2025', idCarrera: 1 },
    { id: 2, nombre: 'Plan 2018', idCarrera: 2 },
    { id: 3, nombre: 'Plan 2022', idCarrera: 3 },
    { id: 4, nombre: 'Plan 2019', idCarrera: 4 },
  ],

  niveles: [
    { id: 1, nombre: 'Primer Nivel', idPlan: 1 },
    { id: 2, nombre: 'Segundo Nivel', idPlan: 1 },
    { id: 3, nombre: 'Tercer Nivel', idPlan: 1 },
    { id: 4, nombre: 'Cuarto Nivel', idPlan: 1 },
  ],

  modulos: [
    { id: 1, codigo: 1 },
    { id: 2, codigo: 2 },
    { id: 3, codigo: 3 },
  ],

  aulas: [
    { id: 1, numero: 101, idModulo: 1 },
    { id: 2, numero: 102, idModulo: 1 },
    { id: 3, numero: 201, idModulo: 2 },
    { id: 4, numero: 301, idModulo: 3 },
  ],

  dias: [
    { id: 1, nombre: 'Lunes' },
    { id: 2, nombre: 'Martes' },
    { id: 3, nombre: 'Miércoles' },
    { id: 4, nombre: 'Jueves' },
    { id: 5, nombre: 'Viernes' },
    { id: 6, nombre: 'Sábado' },
  ],

  horarios: [
    { id: 1, horaInicio: '07:00', horaFin: '08:30', idAula: 1 },
    { id: 2, horaInicio: '08:30', horaFin: '10:00', idAula: 1 },
    { id: 3, horaInicio: '10:15', horaFin: '11:45', idAula: 2 },
    { id: 4, horaInicio: '11:45', horaFin: '13:15', idAula: 3 },
    { id: 5, horaInicio: '14:30', horaFin: '16:00', idAula: 4 },
    { id: 6, horaInicio: '08:30', horaFin: '10:00', idAula: 1 }, 
  ],

  materias: [
    // Nivel 1
    { id: 1, nombre: 'Introducción a la Programación', codigo: 'SIS-101', idNivel: 1, idPlan: 1 },
    { id: 2, nombre: 'Lógica y Matemática Discreta', codigo: 'SIS-102', idNivel: 1, idPlan: 1 },

    // Nivel 2
    { id: 3, nombre: 'Programación Orientada a Objetos', codigo: 'SIS-201', idNivel: 2, idPlan: 1 },
    { id: 4, nombre: 'Estructuras de Datos', codigo: 'SIS-202', idNivel: 2, idPlan: 1 },

    // Nivel 3
    { id: 5, nombre: 'Bases de Datos I', codigo: 'SIS-301', idNivel: 3, idPlan: 1 },
    { id: 6, nombre: 'Ingeniería de Software I', codigo: 'SIS-302', idNivel: 3, idPlan: 1 },

    // Nivel 4
    { id: 7, nombre: 'Sistemas Operativos', codigo: 'SIS-401', idNivel: 4, idPlan: 1 },
    { id: 8, nombre: 'Redes de Computadoras', codigo: 'SIS-402', idNivel: 4, idPlan: 1 },
  ],

  docentes: [
    {
      id: 1,
      ci: 123456,
      nombre: 'Dr. Roberto Méndez',
      registro: 123456,
      telefono: 71000001,
      direccion: 'Av. Paraguá #123',
      especialidad: 'Ingeniería de Software',
      user: 5,
    },
    {
      id: 2,
      ci: 234567,
      nombre: 'Dra. Ana Sánchez',
      registro: 234567,
      telefono: 71000002,
      direccion: 'Av. Banzer #456',
      especialidad: 'Inteligencia Artificial',
      user: 6,
    },
    {
      id: 3,
      ci: 345678,
      nombre: 'Dr. Luis Torres',
      registro: 345678,
      telefono: 71000003,
      direccion: 'Av. Pirai #789',
      especialidad: 'Redes y Telecomunicaciones',
      user: 7,
    },
  ],

  estudiantes: [
    {
      id: 1,
      nombre: 'Juan Pérez',
      ci: 12345678,
      registro: 219062851,
      telefono: 70000001,
      direccion: 'Av. Busch #123',
      tituloBachiller: 123,
      idPlan: 1,
      user: 2,
    },
    {
      id: 2,
      nombre: 'María García',
      ci: 23456789,
      registro: 219062852,
      telefono: 70000002,
      direccion: 'Av. Cañoto #456',
      tituloBachiller: 124,
      idPlan: 1,
      user: 3,
    },
    {
      id: 3,
      nombre: 'Carlos López',
      ci: 34567890,
      registro: 219062853,
      telefono: 70000003,
      direccion: 'Av. Irala #789',
      tituloBachiller: 125,
      idPlan: 1,
      user: 4,
    },
  ],

  gestiones: [
    { id: 1, numero: 2024 },
    { id: 2, numero: 2025 },
    { id: 3, numero: 2026 },
  ],

  periodos: [
    { id: 1, numero: 1, idGestion: 1 }, //gestion 2024
    { id: 2, numero: 2, idGestion: 1 }, //gestion 2024
    { id: 3, numero: 3, idGestion: 1 }, //gestion 2024
    { id: 4, numero: 1, idGestion: 2 }, //gestion 2025
    { id: 5, numero: 2, idGestion: 2 }, //gestion 2025
    { id: 6, numero: 3, idGestion: 2 }, //gestion 2025
  ],

  grupos: [
    { id: 1, sigla: 'A' },
    { id: 2, sigla: 'B' },
  ],

  grupoMaterias: [
    // Nivel 1
    { id: 1, cupos: 20, idMateria: 1, idDocente: 1, idGrupo: 1 },
    { id: 2, cupos: 20, idMateria: 1, idDocente: 2, idGrupo: 2 },

    { id: 3, cupos: 30, idMateria: 2, idDocente: 2, idGrupo: 1 },
    { id: 4, cupos: 30, idMateria: 2, idDocente: 3, idGrupo: 2 },

    // Nivel 2
    { id: 5, cupos: 35, idMateria: 3, idDocente: 3, idGrupo: 1 },
    { id: 6, cupos: 35, idMateria: 3, idDocente: 1, idGrupo: 2 },

    { id: 7, cupos: 40, idMateria: 4, idDocente: 1, idGrupo: 1 },
    { id: 8, cupos: 40, idMateria: 4, idDocente: 2, idGrupo: 2 },

    // Nivel 3
    { id: 9, cupos: 45, idMateria: 5, idDocente: 2, idGrupo: 1 },
    { id: 10, cupos: 45, idMateria: 5, idDocente: 3, idGrupo: 2 },

    { id: 11, cupos: 50, idMateria: 6, idDocente: 3, idGrupo: 1 },
    { id: 12, cupos: 50, idMateria: 6, idDocente: 1, idGrupo: 2 },

    // Nivel 4
    { id: 13, cupos: 55, idMateria: 7, idDocente: 1, idGrupo: 1 },
    { id: 14, cupos: 55, idMateria: 7, idDocente: 2, idGrupo: 2 },

    { id: 15, cupos: 60, idMateria: 8, idDocente: 2, idGrupo: 1 },
    { id: 16, cupos: 60, idMateria: 8, idDocente: 3, idGrupo: 2 },
  ],

  diaHorarios: [
    { id: 1, idDia: 1, idHorario: 1 },
    { id: 2, idDia: 2, idHorario: 2 },
    { id: 3, idDia: 3, idHorario: 3 },
    { id: 4, idDia: 4, idHorario: 4 },
    { id: 5, idDia: 5, idHorario: 5 },
    { id: 6, idDia: 6, idHorario: 1 },
    { id: 7, idDia: 2, idHorario: 6 }, 
    { id: 8, idDia: 4, idHorario: 6 }, 
  ],
  boletaHorarios: [
    // Nivel 1
    { id: 1, idHorario: 4, idGrupoMateria: 1 },  // SIS-101 Grupo A
    { id: 2, idHorario: 5, idGrupoMateria: 2 },  // SIS-101 Grupo B
  
    { id: 3, idHorario: 1, idGrupoMateria: 3 },  // SIS-102 Grupo A
    { id: 4, idHorario: 2, idGrupoMateria: 4 },  // SIS-102 Grupo B
  
    // Nivel 2
    { id: 5, idHorario: 5, idGrupoMateria: 5 },  // SIS-201 Grupo A
    { id: 6, idHorario: 1, idGrupoMateria: 6 },  // SIS-201 Grupo B
  
    { id: 7, idHorario: 2, idGrupoMateria: 7 },  // SIS-202 Grupo A
    { id: 8, idHorario: 3, idGrupoMateria: 8 },  // SIS-202 Grupo B
  
    // Nivel 3
    { id: 9, idHorario: 1, idGrupoMateria: 9 },   // SIS-301 Grupo A 
    { id: 10, idHorario: 6, idGrupoMateria: 10 }, // SIS-301 Grupo B 
  
    { id: 11, idHorario: 3, idGrupoMateria: 11 }, // SIS-302 Grupo A 
    { id: 12, idHorario: 2, idGrupoMateria: 12 }, // SIS-302 Grupo B 
  
    // Nivel 4
    { id: 13, idHorario: 3, idGrupoMateria: 13 }, // SIS-401 Grupo A 
    { id: 14, idHorario: 4, idGrupoMateria: 14 }, // SIS-401 Grupo B
  
    { id: 15, idHorario: 5, idGrupoMateria: 15 }, // SIS-402 Grupo A
    { id: 16, idHorario: 1, idGrupoMateria: 16 }, // SIS-402 Grupo B
  ],

  inscripciones: [
    // --- Gestión 2024, periodo 2 ---
    { id: 1, idEstudiante: 1, idPeriodo: 2, fechaInscripcion: '2024-07-10' },
    { id: 2, idEstudiante: 2, idPeriodo: 2, fechaInscripcion: '2024-07-10' },
    { id: 3, idEstudiante: 3, idPeriodo: 2, fechaInscripcion: '2024-07-10' },

    // --- Gestión 2025, periodo 1 ---
    { id: 4, idEstudiante: 1, idPeriodo: 4, fechaInscripcion: '2025-02-05' },
    { id: 5, idEstudiante: 2, idPeriodo: 4, fechaInscripcion: '2025-02-05' },
    { id: 6, idEstudiante: 3, idPeriodo: 4, fechaInscripcion: '2025-02-05' },
  ],

  detalles: [
    // ---- Nivel 1 (Periodo 2-2024) ----
    { id: 1, idInscripcion: 1, idGrupoMat: 1 },
    { id: 2, idInscripcion: 1, idGrupoMat: 3 },

    { id: 3, idInscripcion: 2, idGrupoMat: 1 },
    { id: 4, idInscripcion: 2, idGrupoMat: 3 },

    { id: 5, idInscripcion: 3, idGrupoMat: 1 },
    { id: 6, idInscripcion: 3, idGrupoMat: 3 },

    // ---- Nivel 2 (Periodo 1-2025) ----
    { id: 7, idInscripcion: 4, idGrupoMat: 5 },
    { id: 8, idInscripcion: 4, idGrupoMat: 7 },

    { id: 9, idInscripcion: 5, idGrupoMat: 5 },
    { id: 10, idInscripcion: 5, idGrupoMat: 7 },

    { id: 11, idInscripcion: 6, idGrupoMat: 5 },
    { id: 12, idInscripcion: 6, idGrupoMat: 7 },
  ],

  notas: [
    // ---- Nivel 1 (2024) ----
    { id: 1, idEstudiante: 1, idDetalle: 1, nota: 85 },
    { id: 2, idEstudiante: 1, idDetalle: 2, nota: 78 },

    { id: 3, idEstudiante: 2, idDetalle: 3, nota: 88 },
    { id: 4, idEstudiante: 2, idDetalle: 4, nota: 91 },

    { id: 5, idEstudiante: 3, idDetalle: 5, nota: 75 },
    { id: 6, idEstudiante: 3, idDetalle: 6, nota: 82 },

    // ---- Nivel 2 (2025) ----
    { id: 7, idEstudiante: 1, idDetalle: 7, nota: 84 },
    { id: 8, idEstudiante: 1, idDetalle: 8, nota: 80 },

    { id: 9, idEstudiante: 2, idDetalle: 9, nota: 90 },
    { id: 10, idEstudiante: 2, idDetalle: 10, nota: 87 },

    { id: 11, idEstudiante: 3, idDetalle: 11, nota: 79 },
    { id: 12, idEstudiante: 3, idDetalle: 12, nota: 83 },
  ],

  prerequisitos: [
    { id: 1, idMateria: 3, idPrerequisito: 1 },  // SIS-201 requiere SIS-101
    { id: 2, idMateria: 4, idPrerequisito: 2 },  // SIS-202 requiere SIS-102
    { id: 3, idMateria: 5, idPrerequisito: 3 },  // SIS-301 requiere SIS-201
    { id: 4, idMateria: 6, idPrerequisito: 4 },  // SIS-302 requiere SIS-202
    { id: 5, idMateria: 7, idPrerequisito: 5 },  // SIS-401 requiere SIS-301
    { id: 6, idMateria: 8, idPrerequisito: 6 },  // SIS-402 requiere SIS-302
  ],
};