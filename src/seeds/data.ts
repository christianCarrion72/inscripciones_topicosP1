import * as bcryptjs from 'bcryptjs';

export const seedData = {
  users: [
    ...Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      email: `estudiante${i + 1}@example.com`,
      contraseña: bcryptjs.hashSync('123456789', 10),
      rol: 'estudiante'
    })),
    { id: 51, email: 'admin@example.com', contraseña: bcryptjs.hashSync('123456789', 10), rol: 'admin' },
    { id: 52, email: 'docente1@example.com', contraseña: bcryptjs.hashSync('123456789', 10), rol: 'docente' },
    { id: 53, email: 'docente2@example.com', contraseña: bcryptjs.hashSync('123456789', 10), rol: 'docente' },
    { id: 54, email: 'docente3@example.com', contraseña: bcryptjs.hashSync('123456789', 10), rol: 'docente' },
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
      user: 52,
    },
    {
      id: 2,
      ci: 234567,
      nombre: 'Dra. Ana Sánchez',
      registro: 234567,
      telefono: 71000002,
      direccion: 'Av. Banzer #456',
      especialidad: 'Inteligencia Artificial',
      user: 53,
    },
    {
      id: 3,
      ci: 345678,
      nombre: 'Dr. Luis Torres',
      registro: 345678,
      telefono: 71000003,
      direccion: 'Av. Pirai #789',
      especialidad: 'Redes y Telecomunicaciones',
      user: 54,
    },
  ],

  estudiantes: [
    ...Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      nombre: `Estudiante ${i + 1}`,
      ci: 12345678 + i,
      registro: 219062851 + i,
      telefono: 70000001 + i,
      direccion: `Av. Principal #${100 + i}`,
      tituloBachiller: 123 + i,
      idPlan: 1,
      user: i + 1,
    })),
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

    { id: 3, cupos: 25, idMateria: 2, idDocente: 2, idGrupo: 1 },
    { id: 4, cupos: 25, idMateria: 2, idDocente: 3, idGrupo: 2 },

    // Nivel 2
    { id: 5, cupos: 30, idMateria: 3, idDocente: 3, idGrupo: 1 },
    { id: 6, cupos: 30, idMateria: 3, idDocente: 1, idGrupo: 2 },

    { id: 7, cupos: 35, idMateria: 4, idDocente: 1, idGrupo: 1 },
    { id: 8, cupos: 35, idMateria: 4, idDocente: 2, idGrupo: 2 },

    // Nivel 3
    { id: 9, cupos: 40, idMateria: 5, idDocente: 2, idGrupo: 1 },
    { id: 10, cupos: 40, idMateria: 5, idDocente: 3, idGrupo: 2 },

    { id: 11, cupos: 45, idMateria: 6, idDocente: 3, idGrupo: 1 },
    { id: 12, cupos: 45, idMateria: 6, idDocente: 1, idGrupo: 2 },

    // Nivel 4
    { id: 13, cupos: 50, idMateria: 7, idDocente: 1, idGrupo: 1 },
    { id: 14, cupos: 50, idMateria: 7, idDocente: 2, idGrupo: 2 },

    { id: 15, cupos: 55, idMateria: 8, idDocente: 2, idGrupo: 1 },
    { id: 16, cupos: 55, idMateria: 8, idDocente: 3, idGrupo: 2 },
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
    { id: 1, idHorario: 4, idGrupoMateria: 1 },
    { id: 2, idHorario: 5, idGrupoMateria: 2 },
  
    { id: 3, idHorario: 1, idGrupoMateria: 3 },
    { id: 4, idHorario: 2, idGrupoMateria: 4 },
  
    // Nivel 2
    { id: 5, idHorario: 5, idGrupoMateria: 5 },
    { id: 6, idHorario: 1, idGrupoMateria: 6 },
  
    { id: 7, idHorario: 2, idGrupoMateria: 7 },
    { id: 8, idHorario: 3, idGrupoMateria: 8 },
  
    // Nivel 3
    { id: 9, idHorario: 1, idGrupoMateria: 9 },
    { id: 10, idHorario: 6, idGrupoMateria: 10 },
  
    { id: 11, idHorario: 3, idGrupoMateria: 11 },
    { id: 12, idHorario: 2, idGrupoMateria: 12 },
  
    // Nivel 4
    { id: 13, idHorario: 3, idGrupoMateria: 13 },
    { id: 14, idHorario: 4, idGrupoMateria: 14 },
  
    { id: 15, idHorario: 5, idGrupoMateria: 15 },
    { id: 16, idHorario: 1, idGrupoMateria: 16 },
  ],

  inscripciones: [
    // Inscripciones Nivel 1 (Gestión 2024, periodo 2) - 50 estudiantes
    ...Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      idEstudiante: i + 1,
      idPeriodo: 2,
      fechaInscripcion: '2024-07-10'
    })),

    // Inscripciones Nivel 2 (Gestión 2025, periodo 1) - 50 estudiantes
    ...Array.from({ length: 50 }, (_, i) => ({
      id: 51 + i,
      idEstudiante: i + 1,
      idPeriodo: 4,
      fechaInscripcion: '2025-02-05'
    })),
  ],

  detalles: [
    // Nivel 1 (Periodo 2-2024) - 50 estudiantes, 2 materias cada uno
    ...Array.from({ length: 50 }, (_, i) => [
      {
        id: i * 2 + 1,
        idInscripcion: i + 1,
        idGrupoMat: (i % 2) + 1 // Alterna entre grupo A (1) y B (2) para SIS-101
      },
      {
        id: i * 2 + 2,
        idInscripcion: i + 1,
        idGrupoMat: (i % 2) + 3 // Alterna entre grupo A (3) y B (4) para SIS-102
      }
    ]).flat(),

    // Nivel 2 (Periodo 1-2025) - 50 estudiantes, 2 materias cada uno
    ...Array.from({ length: 50 }, (_, i) => [
      {
        id: 100 + i * 2 + 1,
        idInscripcion: 51 + i,
        idGrupoMat: (i % 2) + 5 // Alterna entre grupo A (5) y B (6) para SIS-201
      },
      {
        id: 100 + i * 2 + 2,
        idInscripcion: 51 + i,
        idGrupoMat: (i % 2) + 7 // Alterna entre grupo A (7) y B (8) para SIS-202
      }
    ]).flat(),
  ],

  notas: [
    // Nivel 1 (2024) - 50 estudiantes, 2 materias cada uno, todas aprobadas (51-100)
    ...Array.from({ length: 50 }, (_, i) => [
      {
        id: i * 2 + 1,
        idEstudiante: i + 1,
        idDetalle: i * 2 + 1,
        nota: 51 + Math.floor(Math.random() * 50) // Nota entre 51 y 100
      },
      {
        id: i * 2 + 2,
        idEstudiante: i + 1,
        idDetalle: i * 2 + 2,
        nota: 51 + Math.floor(Math.random() * 50) // Nota entre 51 y 100
      }
    ]).flat(),

    // Nivel 2 (2025) - 50 estudiantes, 2 materias cada uno, todas aprobadas (51-100)
    ...Array.from({ length: 50 }, (_, i) => [
      {
        id: 100 + i * 2 + 1,
        idEstudiante: i + 1,
        idDetalle: 100 + i * 2 + 1,
        nota: 51 + Math.floor(Math.random() * 50) // Nota entre 51 y 100
      },
      {
        id: 100 + i * 2 + 2,
        idEstudiante: i + 1,
        idDetalle: 100 + i * 2 + 2,
        nota: 51 + Math.floor(Math.random() * 50) // Nota entre 51 y 100
      }
    ]).flat(),
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