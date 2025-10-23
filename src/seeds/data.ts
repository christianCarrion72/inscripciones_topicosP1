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
    { id: 55, email: 'docente4@example.com', contraseña: bcryptjs.hashSync('123456789', 10), rol: 'docente' },
    { id: 56, email: 'docente5@example.com', contraseña: bcryptjs.hashSync('123456789', 10), rol: 'docente' },
    { id: 57, email: 'fcossio100@gmail.com', contraseña: bcryptjs.hashSync('123456789', 10), rol: 'estudiante' },
  ],

  carreras: [
    { id: 1, nombre: 'Ingeniería Informática', codigo: 'INF' },
    { id: 2, nombre: 'Ingeniería Industrial', codigo: 'IND' },
    { id: 3, nombre: 'Ingeniería Civil', codigo: 'CIV' },
    { id: 4, nombre: 'Administración de Empresas', codigo: 'ADM' },
  ],

  planesEstudio: [
    { id: 1, nombre: 'Plan 187-3', idCarrera: 1 },
    { id: 2, nombre: 'Plan 2018', idCarrera: 2 },
    { id: 3, nombre: 'Plan 2022', idCarrera: 3 },
    { id: 4, nombre: 'Plan 2019', idCarrera: 4 },
  ],

  niveles: [
    { id: 1, nombre: 'Semestre 1', idPlan: 1 },
    { id: 2, nombre: 'Semestre 2', idPlan: 1 },
    { id: 3, nombre: 'Semestre 3', idPlan: 1 },
    { id: 4, nombre: 'Semestre 4', idPlan: 1 },
    { id: 5, nombre: 'Semestre 5', idPlan: 1 },
    { id: 6, nombre: 'Semestre 6', idPlan: 1 },
    { id: 7, nombre: 'Semestre 7', idPlan: 1 },
    { id: 8, nombre: 'Semestre 8', idPlan: 1 },
    { id: 9, nombre: 'Semestre 9', idPlan: 1 },
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
    { id: 5, numero: 103, idModulo: 1 },
    { id: 6, numero: 202, idModulo: 2 },
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
    { id: 6, horaInicio: '08:30', horaFin: '10:00', idAula: 2 },
    { id: 7, horaInicio: '07:00', horaFin: '08:30', idAula: 5 },
    { id: 8, horaInicio: '10:15', horaFin: '11:45', idAula: 6 },
  ],

  materias: [
    // Semestre 1
    { id: 1, nombre: 'Cálculo I', codigo: 'MAT-101', idNivel: 1, idPlan: 1 },
    { id: 2, nombre: 'Estructuras Discretas', codigo: 'INF-119', idNivel: 1, idPlan: 1 },
    { id: 3, nombre: 'Introducción a la Informática', codigo: 'INF-110', idNivel: 1, idPlan: 1 },
    { id: 4, nombre: 'Física I', codigo: 'FIS-100', idNivel: 1, idPlan: 1 },
    { id: 5, nombre: 'Inglés Técnico I', codigo: 'LIN-100', idNivel: 1, idPlan: 1 },

    // Semestre 2
    { id: 6, nombre: 'Cálculo II', codigo: 'MAT-102', idNivel: 2, idPlan: 1 },
    { id: 7, nombre: 'Álgebra Lineal', codigo: 'MAT-103', idNivel: 2, idPlan: 1 },
    { id: 8, nombre: 'Programación I', codigo: 'INF-120', idNivel: 2, idPlan: 1 },
    { id: 9, nombre: 'Física II', codigo: 'FIS-102', idNivel: 2, idPlan: 1 },
    { id: 10, nombre: 'Inglés Técnico II', codigo: 'LIN-101', idNivel: 2, idPlan: 1 },

    // Semestre 3
    { id: 11, nombre: 'Ecuaciones Diferenciales', codigo: 'MAT-207', idNivel: 3, idPlan: 1 },
    { id: 12, nombre: 'Programación II', codigo: 'INF-210', idNivel: 3, idPlan: 1 },
    { id: 13, nombre: 'Arquitectura de Computadoras', codigo: 'INF-211', idNivel: 3, idPlan: 1 },
    { id: 14, nombre: 'Física III', codigo: 'FIS-200', idNivel: 3, idPlan: 1 },
    { id: 15, nombre: 'Administración', codigo: 'ADM-100', idNivel: 3, idPlan: 1 },

    // Semestre 4
    { id: 16, nombre: 'Probabilidad y Estadística I', codigo: 'MAT-202', idNivel: 4, idPlan: 1 },
    { id: 17, nombre: 'Métodos Numéricos', codigo: 'MAT-205', idNivel: 4, idPlan: 1 },
    { id: 18, nombre: 'Estructura de Datos I', codigo: 'INF-220', idNivel: 4, idPlan: 1 },
    { id: 19, nombre: 'Programación Ensamblador', codigo: 'INF-221', idNivel: 4, idPlan: 1 },
    { id: 20, nombre: 'Contabilidad', codigo: 'ADM-200', idNivel: 4, idPlan: 1 },

    // Semestre 5
    { id: 21, nombre: 'Probabilidad y Estadística II', codigo: 'MAT-302', idNivel: 5, idPlan: 1 },
    { id: 22, nombre: 'Lenguajes Formales', codigo: 'INF-319', idNivel: 5, idPlan: 1 },
    { id: 23, nombre: 'Estructura de Datos II', codigo: 'INF-310', idNivel: 5, idPlan: 1 },
    { id: 24, nombre: 'Programación Lógica y Funcional', codigo: 'INF-318', idNivel: 5, idPlan: 1 },
    { id: 25, nombre: 'Base de Datos I', codigo: 'INF-312', idNivel: 5, idPlan: 1 },

    // Semestre 6
    { id: 26, nombre: 'Investigación Operativa I', codigo: 'MAT-329', idNivel: 6, idPlan: 1 },
    { id: 27, nombre: 'Compiladores', codigo: 'INF-329', idNivel: 6, idPlan: 1 },
    { id: 28, nombre: 'Sistemas Operativos I', codigo: 'INF-323', idNivel: 6, idPlan: 1 },
    { id: 29, nombre: 'Sistemas de Información I', codigo: 'INF-342', idNivel: 6, idPlan: 1 },
    { id: 30, nombre: 'Base de Datos II', codigo: 'INF-322', idNivel: 6, idPlan: 1 },

    // Semestre 7
    { id: 31, nombre: 'Investigación Operativa II', codigo: 'MAT-419', idNivel: 7, idPlan: 1 },
    { id: 32, nombre: 'Redes I', codigo: 'INF-433', idNivel: 7, idPlan: 1 },
    { id: 33, nombre: 'Sistemas Operativos II', codigo: 'INF-413', idNivel: 7, idPlan: 1 },
    { id: 34, nombre: 'Inteligencia Artificial', codigo: 'INF-418', idNivel: 7, idPlan: 1 },
    { id: 35, nombre: 'Sistemas de Información II', codigo: 'INF-412', idNivel: 7, idPlan: 1 },

    // Semestre 8
    { id: 36, nombre: 'Preparación y Evaluación de Proyectos', codigo: 'ECO-449', idNivel: 8, idPlan: 1 },
    { id: 37, nombre: 'Redes II', codigo: 'INF-423', idNivel: 8, idPlan: 1 },
    { id: 38, nombre: 'Sistemas Expertos', codigo: 'INF-428', idNivel: 8, idPlan: 1 },
    { id: 39, nombre: 'Sistemas de Información Geográfica', codigo: 'INF-442', idNivel: 8, idPlan: 1 },
    { id: 40, nombre: 'Ingeniería de Software I', codigo: 'INF-422', idNivel: 8, idPlan: 1 },

    // Semestre 9
    { id: 41, nombre: 'Taller de Grado I', codigo: 'INF-511', idNivel: 9, idPlan: 1 },
    { id: 42, nombre: 'Ingeniería de Software II', codigo: 'INF-512', idNivel: 9, idPlan: 1 },
    { id: 43, nombre: 'Tecnología Web', codigo: 'INF-513', idNivel: 9, idPlan: 1 },
    { id: 44, nombre: 'Arquitectura de Software', codigo: 'INF-552', idNivel: 9, idPlan: 1 },

    // Electivas
    { id: 45, nombre: 'Modelado y Simulación de Sistemas', codigo: 'ELC-101', idNivel: 5, idPlan: 1 },
    { id: 46, nombre: 'Programación Gráfica', codigo: 'ELC-102', idNivel: 5, idPlan: 1 },
    { id: 47, nombre: 'Tópicos Avanzados de Programación', codigo: 'ELC-103', idNivel: 6, idPlan: 1 },
    { id: 48, nombre: 'Programación de aplicaciones de tiempo real', codigo: 'ELC-104', idNivel: 6, idPlan: 1 },
    { id: 49, nombre: 'Sistemas Distribuidos', codigo: 'ELC-105', idNivel: 7, idPlan: 1 },
    { id: 50, nombre: 'Interacción Hombre Computador', codigo: 'ELC-106', idNivel: 7, idPlan: 1 },
    { id: 51, nombre: 'Criptografía y Seguridad', codigo: 'ELC-107', idNivel: 8, idPlan: 1 },
    { id: 52, nombre: 'Control y Automatización', codigo: 'ELC-108', idNivel: 8, idPlan: 1 },
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
    {
      id: 4,
      ci: 456789,
      nombre: 'Ing. Carlos Paz',
      registro: 456789,
      telefono: 71000004,
      direccion: 'Av. Santos Dumont #321',
      especialidad: 'Bases de Datos',
      user: 55,
    },
    {
      id: 5,
      ci: 567890,
      nombre: 'Lic. María González',
      registro: 567890,
      telefono: 71000005,
      direccion: 'Av. Beni #654',
      especialidad: 'Matemáticas Aplicadas',
      user: 56,
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
    {
      id: 51,
      nombre: 'COSSIO ARANDA FERNANDO DANIEL',
      ci: 9868661,
      registro: 221044337,
      telefono: 75551574,
      direccion: 'C.CHOFERES DEL CHACO AV.A.BARB',
      tituloBachiller: 134338,
      idPlan: 1,
      user: 57,
    },
  ],

  gestiones: [
    { id: 1, numero: 2021 },
    { id: 2, numero: 2022 },
    { id: 3, numero: 2023 },
    { id: 4, numero: 2024 },
    { id: 5, numero: 2025 },
    { id: 6, numero: 2026 },
  ],

  periodos: [
    // 2021
    { id: 1, numero: 1, idGestion: 1 },
    { id: 2, numero: 2, idGestion: 1 },
    // 2022
    { id: 3, numero: 1, idGestion: 2 },
    { id: 4, numero: 2, idGestion: 2 },
    // 2023
    { id: 5, numero: 1, idGestion: 3 },
    { id: 6, numero: 2, idGestion: 3 },
    // 2024
    { id: 7, numero: 1, idGestion: 4 },
    { id: 8, numero: 2, idGestion: 4 },
    // 2025
    { id: 9, numero: 1, idGestion: 5 },
    { id: 10, numero: 2, idGestion: 5 },
    // 2026
    { id: 11, numero: 1, idGestion: 6 },
    // 2021 - Falta periodo 3
    { id: 12, numero: 3, idGestion: 1 }, // 3-2021
    // 2022 - Falta periodo 3
    { id: 13, numero: 3, idGestion: 2 }, // 3-2022
    // 2023 - Falta periodo 3 y 4
    { id: 14, numero: 3, idGestion: 3 }, // 3-2023
    { id: 15, numero: 4, idGestion: 3 }, // 4-2023
    // 2024 - Falta periodo 3
    { id: 16, numero: 3, idGestion: 4 }, // 3-2024
  ],

  grupos: [
    { id: 1, sigla: 'A' },
    { id: 2, sigla: 'B' },
  ],

  grupoMaterias: [
    // Semestre 1 - Todas las materias con grupos A y B
    { id: 1, cupos: 25, idMateria: 1, idDocente: 5, idGrupo: 1 }, // MAT-101 A
    { id: 2, cupos: 25, idMateria: 1, idDocente: 5, idGrupo: 2 }, // MAT-101 B
    { id: 3, cupos: 25, idMateria: 2, idDocente: 2, idGrupo: 1 }, // INF-119 A
    { id: 4, cupos: 25, idMateria: 2, idDocente: 2, idGrupo: 2 }, // INF-119 B
    { id: 5, cupos: 25, idMateria: 3, idDocente: 1, idGrupo: 1 }, // INF-110 A
    { id: 6, cupos: 25, idMateria: 3, idDocente: 1, idGrupo: 2 }, // INF-110 B
    { id: 7, cupos: 25, idMateria: 4, idDocente: 5, idGrupo: 1 }, // FIS-100 A
    { id: 8, cupos: 25, idMateria: 4, idDocente: 5, idGrupo: 2 }, // FIS-100 B
    { id: 9, cupos: 25, idMateria: 5, idDocente: 1, idGrupo: 1 }, // LIN-100 A
    { id: 10, cupos: 25, idMateria: 5, idDocente: 1, idGrupo: 2 }, // LIN-100 B

    // Semestre 2
    { id: 11, cupos: 25, idMateria: 6, idDocente: 5, idGrupo: 1 }, // MAT-102 A
    { id: 12, cupos: 25, idMateria: 6, idDocente: 5, idGrupo: 2 }, // MAT-102 B
    { id: 13, cupos: 25, idMateria: 7, idDocente: 5, idGrupo: 1 }, // MAT-103 A
    { id: 14, cupos: 25, idMateria: 7, idDocente: 5, idGrupo: 2 }, // MAT-103 B
    { id: 15, cupos: 25, idMateria: 8, idDocente: 1, idGrupo: 1 }, // INF-120 A
    { id: 16, cupos: 25, idMateria: 8, idDocente: 1, idGrupo: 2 }, // INF-120 B
    { id: 17, cupos: 25, idMateria: 9, idDocente: 5, idGrupo: 1 }, // FIS-102 A
    { id: 18, cupos: 25, idMateria: 9, idDocente: 5, idGrupo: 2 }, // FIS-102 B
    { id: 19, cupos: 25, idMateria: 10, idDocente: 1, idGrupo: 1 }, // LIN-101 A
    { id: 20, cupos: 25, idMateria: 10, idDocente: 1, idGrupo: 2 }, // LIN-101 B

    // Semestre 3
    { id: 21, cupos: 25, idMateria: 11, idDocente: 5, idGrupo: 1 }, // MAT-207 A
    { id: 22, cupos: 25, idMateria: 11, idDocente: 5, idGrupo: 2 }, // MAT-207 B
    { id: 23, cupos: 25, idMateria: 12, idDocente: 1, idGrupo: 1 }, // INF-210 A
    { id: 24, cupos: 25, idMateria: 12, idDocente: 1, idGrupo: 2 }, // INF-210 B
    { id: 25, cupos: 25, idMateria: 13, idDocente: 1, idGrupo: 1 }, // INF-211 A
    { id: 26, cupos: 25, idMateria: 13, idDocente: 1, idGrupo: 2 }, // INF-211 B
    { id: 27, cupos: 25, idMateria: 14, idDocente: 5, idGrupo: 1 }, // FIS-200 A
    { id: 28, cupos: 25, idMateria: 14, idDocente: 5, idGrupo: 2 }, // FIS-200 B
    { id: 29, cupos: 25, idMateria: 15, idDocente: 4, idGrupo: 1 }, // ADM-100 A
    { id: 30, cupos: 25, idMateria: 15, idDocente: 4, idGrupo: 2 }, // ADM-100 B

    // Semestre 4
    { id: 31, cupos: 25, idMateria: 16, idDocente: 5, idGrupo: 1 }, // MAT-202 A
    { id: 32, cupos: 25, idMateria: 16, idDocente: 5, idGrupo: 2 }, // MAT-202 B
    { id: 33, cupos: 25, idMateria: 17, idDocente: 5, idGrupo: 1 }, // MAT-205 A
    { id: 34, cupos: 25, idMateria: 17, idDocente: 5, idGrupo: 2 }, // MAT-205 B
    { id: 35, cupos: 25, idMateria: 18, idDocente: 1, idGrupo: 1 }, // INF-220 A
    { id: 36, cupos: 25, idMateria: 18, idDocente: 1, idGrupo: 2 }, // INF-220 B
    { id: 37, cupos: 25, idMateria: 19, idDocente: 1, idGrupo: 1 }, // INF-221 A
    { id: 38, cupos: 25, idMateria: 19, idDocente: 1, idGrupo: 2 }, // INF-221 B
    { id: 39, cupos: 25, idMateria: 20, idDocente: 4, idGrupo: 1 }, // ADM-200 A
    { id: 40, cupos: 25, idMateria: 20, idDocente: 4, idGrupo: 2 }, // ADM-200 B

    // Semestre 5
    { id: 41, cupos: 25, idMateria: 21, idDocente: 5, idGrupo: 1 }, // MAT-302 A
    { id: 42, cupos: 25, idMateria: 21, idDocente: 5, idGrupo: 2 }, // MAT-302 B
    { id: 43, cupos: 25, idMateria: 22, idDocente: 2, idGrupo: 1 }, // INF-319 A
    { id: 44, cupos: 25, idMateria: 22, idDocente: 2, idGrupo: 2 }, // INF-319 B
    { id: 45, cupos: 25, idMateria: 23, idDocente: 1, idGrupo: 1 }, // INF-310 A
    { id: 46, cupos: 25, idMateria: 23, idDocente: 1, idGrupo: 2 }, // INF-310 B
    { id: 47, cupos: 25, idMateria: 24, idDocente: 1, idGrupo: 1 }, // INF-318 A
    { id: 48, cupos: 25, idMateria: 24, idDocente: 1, idGrupo: 2 }, // INF-318 B
    { id: 49, cupos: 25, idMateria: 25, idDocente: 4, idGrupo: 1 }, // INF-312 A
    { id: 50, cupos: 25, idMateria: 25, idDocente: 4, idGrupo: 2 }, // INF-312 B

    // Semestre 6
    { id: 51, cupos: 25, idMateria: 26, idDocente: 5, idGrupo: 1 }, // MAT-329 A
    { id: 52, cupos: 25, idMateria: 26, idDocente: 5, idGrupo: 2 }, // MAT-329 B
    { id: 53, cupos: 25, idMateria: 27, idDocente: 1, idGrupo: 1 }, // INF-329 A
    { id: 54, cupos: 25, idMateria: 27, idDocente: 1, idGrupo: 2 }, // INF-329 B
    { id: 55, cupos: 25, idMateria: 28, idDocente: 3, idGrupo: 1 }, // INF-323 A
    { id: 56, cupos: 25, idMateria: 28, idDocente: 3, idGrupo: 2 }, // INF-323 B
    { id: 57, cupos: 25, idMateria: 29, idDocente: 1, idGrupo: 1 }, // INF-342 A
    { id: 58, cupos: 25, idMateria: 29, idDocente: 1, idGrupo: 2 }, // INF-342 B
    { id: 59, cupos: 25, idMateria: 30, idDocente: 4, idGrupo: 1 }, // INF-322 A
    { id: 60, cupos: 25, idMateria: 30, idDocente: 4, idGrupo: 2 }, // INF-322 B

    // Semestre 7
    { id: 61, cupos: 25, idMateria: 31, idDocente: 5, idGrupo: 1 }, // MAT-419 A
    { id: 62, cupos: 25, idMateria: 31, idDocente: 5, idGrupo: 2 }, // MAT-419 B
    { id: 63, cupos: 25, idMateria: 32, idDocente: 3, idGrupo: 1 }, // INF-433 A
    { id: 64, cupos: 25, idMateria: 32, idDocente: 3, idGrupo: 2 }, // INF-433 B
    { id: 65, cupos: 25, idMateria: 33, idDocente: 3, idGrupo: 1 }, // INF-413 A
    { id: 66, cupos: 25, idMateria: 33, idDocente: 3, idGrupo: 2 }, // INF-413 B
    { id: 67, cupos: 25, idMateria: 34, idDocente: 2, idGrupo: 1 }, // INF-418 A
    { id: 68, cupos: 25, idMateria: 34, idDocente: 2, idGrupo: 2 }, // INF-418 B
    { id: 69, cupos: 25, idMateria: 35, idDocente: 1, idGrupo: 1 }, // INF-412 A
    { id: 70, cupos: 25, idMateria: 35, idDocente: 1, idGrupo: 2 }, // INF-412 B

    // Semestre 8
    { id: 71, cupos: 25, idMateria: 36, idDocente: 4, idGrupo: 1 }, // ECO-449 A
    { id: 72, cupos: 25, idMateria: 36, idDocente: 4, idGrupo: 2 }, // ECO-449 B
    { id: 73, cupos: 25, idMateria: 37, idDocente: 3, idGrupo: 1 }, // INF-423 A
    { id: 74, cupos: 25, idMateria: 37, idDocente: 3, idGrupo: 2 }, // INF-423 B
    { id: 75, cupos: 25, idMateria: 38, idDocente: 2, idGrupo: 1 }, // INF-428 A
    { id: 76, cupos: 25, idMateria: 38, idDocente: 2, idGrupo: 2 }, // INF-428 B
    { id: 77, cupos: 25, idMateria: 39, idDocente: 2, idGrupo: 1 }, // INF-442 A
    { id: 78, cupos: 25, idMateria: 39, idDocente: 2, idGrupo: 2 }, // INF-442 B
    { id: 79, cupos: 25, idMateria: 40, idDocente: 1, idGrupo: 1 }, // INF-422 A
    { id: 80, cupos: 25, idMateria: 40, idDocente: 1, idGrupo: 2 }, // INF-422 B

    // Semestre 9
    { id: 81, cupos: 25, idMateria: 41, idDocente: 1, idGrupo: 1 }, // INF-511 A
    { id: 82, cupos: 25, idMateria: 41, idDocente: 1, idGrupo: 2 }, // INF-511 B
    { id: 83, cupos: 25, idMateria: 42, idDocente: 1, idGrupo: 1 }, // INF-512 A
    { id: 84, cupos: 25, idMateria: 42, idDocente: 1, idGrupo: 2 }, // INF-512 B
    { id: 85, cupos: 25, idMateria: 43, idDocente: 1, idGrupo: 1 }, // INF-513 A
    { id: 86, cupos: 25, idMateria: 43, idDocente: 1, idGrupo: 2 }, // INF-513 B
    { id: 87, cupos: 25, idMateria: 44, idDocente: 1, idGrupo: 1 }, // INF-552 A
    { id: 88, cupos: 25, idMateria: 44, idDocente: 1, idGrupo: 2 }, // INF-552 B
  ],

  diaHorarios: [
    { id: 1, idDia: 1, idHorario: 1 },
    { id: 2, idDia: 2, idHorario: 2 },
    { id: 3, idDia: 3, idHorario: 3 },
    { id: 4, idDia: 4, idHorario: 4 },
    { id: 5, idDia: 5, idHorario: 5 },
    { id: 6, idDia: 6, idHorario: 1 },
    { id: 7, idDia: 1, idHorario: 6 },
    { id: 8, idDia: 3, idHorario: 6 },
  ],

  boletaHorarios: [
    // Semestre 1
    { id: 1, idHorario: 1, idGrupoMateria: 1 },
    { id: 2, idHorario: 2, idGrupoMateria: 2 },
    { id: 3, idHorario: 3, idGrupoMateria: 3 },
    { id: 4, idHorario: 4, idGrupoMateria: 4 },
    { id: 5, idHorario: 5, idGrupoMateria: 5 },
    { id: 6, idHorario: 1, idGrupoMateria: 6 },
    { id: 7, idHorario: 2, idGrupoMateria: 7 },
    { id: 8, idHorario: 3, idGrupoMateria: 8 },
    { id: 9, idHorario: 4, idGrupoMateria: 9 },
    { id: 10, idHorario: 5, idGrupoMateria: 10 },

    // Semestre 2
    { id: 11, idHorario: 1, idGrupoMateria: 11 },
    { id: 12, idHorario: 2, idGrupoMateria: 12 },
    { id: 13, idHorario: 3, idGrupoMateria: 13 },
    { id: 14, idHorario: 4, idGrupoMateria: 14 },
    { id: 15, idHorario: 5, idGrupoMateria: 15 },
    { id: 16, idHorario: 6, idGrupoMateria: 16 },
    { id: 17, idHorario: 7, idGrupoMateria: 17 },
    { id: 18, idHorario: 8, idGrupoMateria: 18 },
    { id: 19, idHorario: 1, idGrupoMateria: 19 },
    { id: 20, idHorario: 2, idGrupoMateria: 20 },

    // Semestre 3
    { id: 21, idHorario: 1, idGrupoMateria: 21 },
    { id: 22, idHorario: 2, idGrupoMateria: 22 },
    { id: 23, idHorario: 3, idGrupoMateria: 23 },
    { id: 24, idHorario: 4, idGrupoMateria: 24 },
    { id: 25, idHorario: 5, idGrupoMateria: 25 },
    { id: 26, idHorario: 6, idGrupoMateria: 26 },
    { id: 27, idHorario: 7, idGrupoMateria: 27 },
    { id: 28, idHorario: 8, idGrupoMateria: 28 },
    { id: 29, idHorario: 1, idGrupoMateria: 29 },
    { id: 30, idHorario: 2, idGrupoMateria: 30 },

    // Semestre 4
    { id: 31, idHorario: 1, idGrupoMateria: 31 },
    { id: 32, idHorario: 2, idGrupoMateria: 32 },
    { id: 33, idHorario: 3, idGrupoMateria: 33 },
    { id: 34, idHorario: 4, idGrupoMateria: 34 },
    { id: 35, idHorario: 5, idGrupoMateria: 35 },
    { id: 36, idHorario: 6, idGrupoMateria: 36 },
    { id: 37, idHorario: 7, idGrupoMateria: 37 },
    { id: 38, idHorario: 8, idGrupoMateria: 38 },
    { id: 39, idHorario: 1, idGrupoMateria: 39 },
    { id: 40, idHorario: 2, idGrupoMateria: 40 },

    // Semestre 5
    { id: 41, idHorario: 1, idGrupoMateria: 41 },
    { id: 42, idHorario: 2, idGrupoMateria: 42 },
    { id: 43, idHorario: 3, idGrupoMateria: 43 },
    { id: 44, idHorario: 4, idGrupoMateria: 44 },
    { id: 45, idHorario: 5, idGrupoMateria: 45 },
    { id: 46, idHorario: 6, idGrupoMateria: 46 },
    { id: 47, idHorario: 7, idGrupoMateria: 47 },
    { id: 48, idHorario: 8, idGrupoMateria: 48 },
    { id: 49, idHorario: 1, idGrupoMateria: 49 },
    { id: 50, idHorario: 2, idGrupoMateria: 50 },

    // Semestre 6
    { id: 51, idHorario: 1, idGrupoMateria: 51 },
    { id: 52, idHorario: 2, idGrupoMateria: 52 },
    { id: 53, idHorario: 3, idGrupoMateria: 53 },
    { id: 54, idHorario: 4, idGrupoMateria: 54 },
    { id: 55, idHorario: 5, idGrupoMateria: 55 },
    { id: 56, idHorario: 6, idGrupoMateria: 56 },
    { id: 57, idHorario: 7, idGrupoMateria: 57 },
    { id: 58, idHorario: 8, idGrupoMateria: 58 },
    { id: 59, idHorario: 1, idGrupoMateria: 59 },
    { id: 60, idHorario: 2, idGrupoMateria: 60 },

    // Semestre 7
    { id: 61, idHorario: 1, idGrupoMateria: 61 },
    { id: 62, idHorario: 2, idGrupoMateria: 62 },
    { id: 63, idHorario: 3, idGrupoMateria: 63 },
    { id: 64, idHorario: 4, idGrupoMateria: 64 },
    { id: 65, idHorario: 5, idGrupoMateria: 65 },
    { id: 66, idHorario: 6, idGrupoMateria: 66 },
    { id: 67, idHorario: 7, idGrupoMateria: 67 },
    { id: 68, idHorario: 8, idGrupoMateria: 68 },
    { id: 69, idHorario: 1, idGrupoMateria: 69 },
    { id: 70, idHorario: 2, idGrupoMateria: 70 },

    // Semestre 8
    { id: 71, idHorario: 1, idGrupoMateria: 71 },
    { id: 72, idHorario: 2, idGrupoMateria: 72 },
    { id: 73, idHorario: 3, idGrupoMateria: 73 },
    { id: 74, idHorario: 4, idGrupoMateria: 74 },
    { id: 75, idHorario: 5, idGrupoMateria: 75 },
    { id: 76, idHorario: 6, idGrupoMateria: 76 },
    { id: 77, idHorario: 7, idGrupoMateria: 77 },
    { id: 78, idHorario: 8, idGrupoMateria: 78 },
    { id: 79, idHorario: 1, idGrupoMateria: 79 },
    { id: 80, idHorario: 2, idGrupoMateria: 80 },

    // Semestre 9
    { id: 81, idHorario: 1, idGrupoMateria: 81 },
    { id: 82, idHorario: 2, idGrupoMateria: 82 },
    { id: 83, idHorario: 3, idGrupoMateria: 83 },
    { id: 84, idHorario: 4, idGrupoMateria: 84 },
    { id: 85, idHorario: 5, idGrupoMateria: 85 },
    { id: 86, idHorario: 6, idGrupoMateria: 86 },
    { id: 87, idHorario: 7, idGrupoMateria: 87 },
    { id: 88, idHorario: 8, idGrupoMateria: 88 },
  ],


  inscripciones: [
    // Inscripciones Semestre 1 (Gestión 2024, periodo 1) - 50 estudiantes
    ...Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      idEstudiante: i + 1,
      idPeriodo: 7,
      fechaInscripcion: '2024-02-01'
    })),
    { id: 51, idEstudiante: 51, idPeriodo: 1, fechaInscripcion: '2021-02-01' },  // 1-2021
    { id: 52, idEstudiante: 51, idPeriodo: 2, fechaInscripcion: '2021-08-01' },  // 2-2021
    { id: 53, idEstudiante: 51, idPeriodo: 12, fechaInscripcion: '2021-12-01' }, // 3-2021
    { id: 54, idEstudiante: 51, idPeriodo: 5, fechaInscripcion: '2022-02-01' },  // 1-2022
    { id: 55, idEstudiante: 51, idPeriodo: 6, fechaInscripcion: '2022-08-01' },  // 2-2022
    { id: 56, idEstudiante: 51, idPeriodo: 13, fechaInscripcion: '2022-12-01' }, // 3-2022
    { id: 57, idEstudiante: 51, idPeriodo: 9, fechaInscripcion: '2023-02-01' },  // 1-2023
    { id: 58, idEstudiante: 51, idPeriodo: 10, fechaInscripcion: '2023-08-01' }, // 2-2023
    { id: 59, idEstudiante: 51, idPeriodo: 7, fechaInscripcion: '2024-02-01' },  // 1-2024
    { id: 60, idEstudiante: 51, idPeriodo: 8, fechaInscripcion: '2024-08-01' },  // 2-2024
    { id: 61, idEstudiante: 51, idPeriodo: 16, fechaInscripcion: '2024-12-01' }, // 3-2024
    { id: 62, idEstudiante: 51, idPeriodo: 9, fechaInscripcion: '2025-02-01' },  // 1-2025
    { id: 63, idEstudiante: 51, idPeriodo: 10, fechaInscripcion: '2025-08-01' }, // 2-2025
  ],

  detalles: [
    // Semestre 1 (Periodo 1-2024) - 50 estudiantes, 5 materias cada uno
    ...Array.from({ length: 50 }, (_, i) => [
      {
        id: i * 5 + 1,
        idInscripcion: i + 1,
        idGrupoMat: (i % 2) + 1 // MAT-101 (alterna A/B)
      },
      {
        id: i * 5 + 2,
        idInscripcion: i + 1,
        idGrupoMat: (i % 2) + 3 // INF-119 (alterna A/B)
      },
      {
        id: i * 5 + 3,
        idInscripcion: i + 1,
        idGrupoMat: (i % 2) + 5 // INF-110 (alterna A/B)
      },
      {
        id: i * 5 + 4,
        idInscripcion: i + 1,
        idGrupoMat: (i % 2) + 7 // FIS-100 (alterna A/B)
      },
      {
        id: i * 5 + 5,
        idInscripcion: i + 1,
        idGrupoMat: (i % 2) + 9 // LIN-100 (alterna A/B)
      }
    ]).flat(),
    // Periodo 1-2021 (inscripcion 51)
    { id: 251, idInscripcion: 51, idGrupoMat: 1 },  // MAT-101 Cálculo I
    { id: 252, idInscripcion: 51, idGrupoMat: 7 },  // FIS-100 Física I
    { id: 253, idInscripcion: 51, idGrupoMat: 9 },  // LIN-100 Inglés Técnico I
    { id: 254, idInscripcion: 51, idGrupoMat: 5 },  // INF-110 Introducción a la Informática

    // Periodo 2-2021 (inscripcion 102)
    { id: 255, idInscripcion: 52, idGrupoMat: 13 }, // MAT-103 Álgebra Lineal
    { id: 256, idInscripcion: 52, idGrupoMat: 3 },  // INF-119 Estructuras Discretas
    { id: 257, idInscripcion: 52, idGrupoMat: 17 }, // FIS-102 Física II
    { id: 258, idInscripcion: 52, idGrupoMat: 19 }, // LIN-101 Inglés Técnico II
    { id: 259, idInscripcion: 52, idGrupoMat: 15 }, // INF-120 Programación I

    // Periodo 3-2021 (inscripcion 53)
    { id: 260, idInscripcion: 53, idGrupoMat: 11 }, // MAT-102 Cálculo II

    // Periodo 1-2022 (inscripcion 54)
    { id: 261, idInscripcion: 54, idGrupoMat: 29 }, // ADM-100 Administración
    { id: 262, idInscripcion: 54, idGrupoMat: 27 }, // FIS-200 Física III
    { id: 263, idInscripcion: 54, idGrupoMat: 23 }, // INF-210 Programación II

    // Periodo 2-2022 (inscripcion 55)
    { id: 264, idInscripcion: 55, idGrupoMat: 25 }, // INF-211 Arquitectura de Computadoras
    { id: 265, idInscripcion: 55, idGrupoMat: 39 }, // ADM-200 Contabilidad
    { id: 266, idInscripcion: 55, idGrupoMat: 21 }, // MAT-207 Ecuaciones Diferenciales

    // Periodo 3-2022 (inscripcion 56)
    { id: 267, idInscripcion: 56, idGrupoMat: 31 }, // MAT-202 Probabilidad y Estadística I

    // Periodo 1-2023 (inscripcion 57)
    { id: 268, idInscripcion: 57, idGrupoMat: 49 }, // INF-312 Base de Datos I
    { id: 269, idInscripcion: 57, idGrupoMat: 35 }, // INF-220 Estructura de Datos I
    { id: 270, idInscripcion: 57, idGrupoMat: 33 }, // MAT-205 Métodos Numéricos
    { id: 271, idInscripcion: 57, idGrupoMat: 41 }, // MAT-302 Probabilidad y Estadística II

    // Periodo 2-2023 (inscripcion 58)
    { id: 272, idInscripcion: 58, idGrupoMat: 51 }, // MAT-329 Investigación Operativa I
    { id: 273, idInscripcion: 58, idGrupoMat: 57 }, // INF-342 Sistemas de Información I
    { id: 274, idInscripcion: 58, idGrupoMat: 55 }, // INF-323 Sistemas Operativos I

    // Periodo 1-2024 (inscripcion 59)
    { id: 275, idInscripcion: 59, idGrupoMat: 59 }, // INF-322 Bases de Datos II
    { id: 276, idInscripcion: 59, idGrupoMat: 45 }, // INF-310 Estructuras de Datos II
    { id: 277, idInscripcion: 59, idGrupoMat: 37 }, // INF-221 Programación Ensamblador
    { id: 278, idInscripcion: 59, idGrupoMat: 69 }, // INF-412 Sistemas de Información II

    // Periodo 2-2024 (inscripcion 60)
    { id: 279, idInscripcion: 60, idGrupoMat: 61 }, // MAT-419 Investigación Operativa II
    { id: 280, idInscripcion: 60, idGrupoMat: 43 }, // INF-319 Lenguajes Formales
    { id: 281, idInscripcion: 60, idGrupoMat: 47 }, // INF-318 Programación Lógica y Funcional
    { id: 282, idInscripcion: 60, idGrupoMat: 63 }, // INF-433 Redes I
    { id: 283, idInscripcion: 60, idGrupoMat: 77 }, // INF-442 Sistemas de Información Geográfica

    // Periodo 3-2024 (inscripcion 61)
    { id: 284, idInscripcion: 61, idGrupoMat: 73 }, // INF-423 Redes II

    // Periodo 1-2025 (inscripcion 62)
    { id: 285, idInscripcion: 62, idGrupoMat: 53 }, // INF-329 Compiladores
    { id: 286, idInscripcion: 62, idGrupoMat: 67 }, // INF-418 Inteligencia Artificial
    { id: 287, idInscripcion: 62, idGrupoMat: 71 }, // ECO-449 Preparación y Evaluación de Proyectos
    { id: 288, idInscripcion: 62, idGrupoMat: 75 }, // INF-428 Sistemas Expertos

    // Periodo 2-2025 (inscripcion 63) - Materias inscritas actualmente (sin nota)
    { id: 289, idInscripcion: 63, idGrupoMat: 87 }, // INF-552 Arquitectura del Software
    { id: 290, idInscripcion: 63, idGrupoMat: 79 }, // INF-422 Ingeniería de Software I
    { id: 291, idInscripcion: 63, idGrupoMat: 65 }, // INF-413 Sistemas Operativos II
  ],

  notas: [
    // Semestre 1 (2024) - 50 estudiantes, 5 materias cada uno, todas aprobadas (51-100)
    ...Array.from({ length: 50 }, (_, i) => [
      {
        id: i * 5 + 1,
        idEstudiante: i + 1,
        idDetalle: i * 5 + 1,
        nota: 51 + Math.floor(Math.random() * 50)
      },
      {
        id: i * 5 + 2,
        idEstudiante: i + 1,
        idDetalle: i * 5 + 2,
        nota: 51 + Math.floor(Math.random() * 50)
      },
      {
        id: i * 5 + 3,
        idEstudiante: i + 1,
        idDetalle: i * 5 + 3,
        nota: 51 + Math.floor(Math.random() * 50)
      },
      {
        id: i * 5 + 4,
        idEstudiante: i + 1,
        idDetalle: i * 5 + 4,
        nota: 51 + Math.floor(Math.random() * 50)
      },
      {
        id: i * 5 + 5,
        idEstudiante: i + 1,
        idDetalle: i * 5 + 5,
        nota: 51 + Math.floor(Math.random() * 50)
      }
    ]).flat(),
    // Periodo 1-2021
    { id: 251, idEstudiante: 51, idDetalle: 251, nota: 60 },  // MAT-101
    { id: 252, idEstudiante: 51, idDetalle: 252, nota: 88 },  // FIS-100
    { id: 253, idEstudiante: 51, idDetalle: 253, nota: 75 },  // LIN-100
    { id: 254, idEstudiante: 51, idDetalle: 254, nota: 57 },  // INF-110

    // Periodo 2-2021
    { id: 255, idEstudiante: 51, idDetalle: 255, nota: 65 },  // MAT-103
    { id: 256, idEstudiante: 51, idDetalle: 256, nota: 56 },  // INF-119
    { id: 257, idEstudiante: 51, idDetalle: 257, nota: 80 },  // FIS-102
    { id: 258, idEstudiante: 51, idDetalle: 258, nota: 88 },  // LIN-101
    { id: 259, idEstudiante: 51, idDetalle: 259, nota: 95 },  // INF-120

    // Periodo 3-2021
    { id: 260, idEstudiante: 51, idDetalle: 260, nota: 51 },  // MAT-102

    // Periodo 1-2022
    { id: 261, idEstudiante: 51, idDetalle: 261, nota: 95 },  // ADM-100
    { id: 262, idEstudiante: 51, idDetalle: 262, nota: 90 },  // FIS-200
    { id: 263, idEstudiante: 51, idDetalle: 263, nota: 73 },  // INF-210

    // Periodo 2-2022
    { id: 264, idEstudiante: 51, idDetalle: 264, nota: 83 },  // INF-211
    { id: 265, idEstudiante: 51, idDetalle: 265, nota: 75 },  // ADM-200
    { id: 266, idEstudiante: 51, idDetalle: 266, nota: 60 },  // MAT-207

    // Periodo 3-2022
    { id: 267, idEstudiante: 51, idDetalle: 267, nota: 57 },  // MAT-202

    // Periodo 1-2023
    { id: 268, idEstudiante: 51, idDetalle: 268, nota: 51 },  // INF-312
    { id: 269, idEstudiante: 51, idDetalle: 269, nota: 51 },  // INF-220
    { id: 270, idEstudiante: 51, idDetalle: 270, nota: 58 },  // MAT-205
    { id: 271, idEstudiante: 51, idDetalle: 271, nota: 52 },  // MAT-302

    // Periodo 2-2023
    { id: 272, idEstudiante: 51, idDetalle: 272, nota: 56 },  // MAT-329
    { id: 273, idEstudiante: 51, idDetalle: 273, nota: 63 },  // INF-342
    { id: 274, idEstudiante: 51, idDetalle: 274, nota: 62 },  // INF-323

    // Periodo 1-2024
    { id: 275, idEstudiante: 51, idDetalle: 275, nota: 51 },  // INF-322
    { id: 276, idEstudiante: 51, idDetalle: 276, nota: 80 },  // INF-310
    { id: 277, idEstudiante: 51, idDetalle: 277, nota: 82 },  // INF-221
    { id: 278, idEstudiante: 51, idDetalle: 278, nota: 66 },  // INF-412

    // Periodo 2-2024
    { id: 279, idEstudiante: 51, idDetalle: 279, nota: 54 },  // MAT-419
    { id: 280, idEstudiante: 51, idDetalle: 280, nota: 74 },  // INF-319
    { id: 281, idEstudiante: 51, idDetalle: 281, nota: 83 },  // INF-318
    { id: 282, idEstudiante: 51, idDetalle: 282, nota: 51 },  // INF-433
    { id: 283, idEstudiante: 51, idDetalle: 283, nota: 65 },  // INF-442

    // Periodo 3-2024
    { id: 284, idEstudiante: 51, idDetalle: 284, nota: 58 },  // INF-423

    // Periodo 1-2025
    { id: 285, idEstudiante: 51, idDetalle: 285, nota: 51 },  // INF-329
    { id: 286, idEstudiante: 51, idDetalle: 286, nota: 80 },  // INF-418
    { id: 287, idEstudiante: 51, idDetalle: 287, nota: 64 },  // ECO-449
    { id: 288, idEstudiante: 51, idDetalle: 288, nota: 70 },  // INF-428
  ],

  prerequisitos: [
    // Semestre 1 → Semestre 2
    { id: 1, idMateria: 6, idPrerequisito: 1 },   // MAT-102 requiere MAT-101
    { id: 2, idMateria: 8, idPrerequisito: 3 },   // INF-120 requiere INF-110
    { id: 3, idMateria: 9, idPrerequisito: 4 },   // FIS-102 requiere FIS-100
    { id: 4, idMateria: 10, idPrerequisito: 5 },  // LIN-101 requiere LIN-100

    // Semestre 2 → Semestre 3
    { id: 5, idMateria: 11, idPrerequisito: 6 },  // MAT-207 requiere MAT-102
    { id: 6, idMateria: 12, idPrerequisito: 7 },  // INF-210 requiere MAT-103
    { id: 7, idMateria: 12, idPrerequisito: 8 },  // INF-210 requiere INF-120
    { id: 8, idMateria: 13, idPrerequisito: 8 },  // INF-211 requiere INF-120
    { id: 9, idMateria: 14, idPrerequisito: 9 },  // FIS-200 requiere FIS-102

    // Semestre 3 → Semestre 4
    { id: 10, idMateria: 16, idPrerequisito: 11 }, // MAT-202 requiere MAT-207
    { id: 11, idMateria: 17, idPrerequisito: 11 }, // MAT-205 requiere MAT-207
    { id: 12, idMateria: 17, idPrerequisito: 12 }, // MAT-205 requiere INF-210
    { id: 13, idMateria: 18, idPrerequisito: 12 }, // INF-220 requiere INF-210
    { id: 14, idMateria: 18, idPrerequisito: 13 }, // INF-220 requiere INF-211
    { id: 15, idMateria: 19, idPrerequisito: 14 }, // INF-221 requiere FIS-200

    // Semestre 4 → Semestre 5
    { id: 16, idMateria: 21, idPrerequisito: 16 }, // MAT-302 requiere MAT-202
    { id: 17, idMateria: 22, idPrerequisito: 17 }, // INF-319 requiere MAT-205
    { id: 18, idMateria: 23, idPrerequisito: 18 }, // INF-310 requiere INF-220
    { id: 19, idMateria: 24, idPrerequisito: 19 }, // INF-318 requiere INF-221
    { id: 20, idMateria: 25, idPrerequisito: 18 }, // INF-312 requiere INF-220

    // Semestre 5 → Semestre 6
    { id: 21, idMateria: 26, idPrerequisito: 21 }, // MAT-329 requiere MAT-302
    { id: 22, idMateria: 27, idPrerequisito: 22 }, // INF-329 requiere INF-319
    { id: 23, idMateria: 28, idPrerequisito: 23 }, // INF-323 requiere INF-310
    { id: 24, idMateria: 29, idPrerequisito: 24 }, // INF-342 requiere INF-318
    { id: 25, idMateria: 30, idPrerequisito: 25 }, // INF-322 requiere INF-312

    // Semestre 6 → Semestre 7
    { id: 26, idMateria: 31, idPrerequisito: 26 }, // MAT-419 requiere MAT-329
    { id: 27, idMateria: 32, idPrerequisito: 28 }, // INF-433 requiere INF-323
    { id: 28, idMateria: 33, idPrerequisito: 28 }, // INF-413 requiere INF-323
    { id: 29, idMateria: 34, idPrerequisito: 29 }, // INF-418 requiere INF-342
    { id: 30, idMateria: 34, idPrerequisito: 30 }, // INF-418 requiere INF-322
    { id: 31, idMateria: 35, idPrerequisito: 30 }, // INF-412 requiere INF-322

    // Semestre 7 → Semestre 8
    { id: 32, idMateria: 36, idPrerequisito: 31 }, // ECO-449 requiere MAT-419
    { id: 33, idMateria: 37, idPrerequisito: 32 }, // INF-423 requiere INF-433
    { id: 34, idMateria: 38, idPrerequisito: 33 }, // INF-428 requiere INF-413
    { id: 35, idMateria: 39, idPrerequisito: 34 }, // INF-442 requiere INF-418
    { id: 36, idMateria: 40, idPrerequisito: 35 }, // INF-422 requiere INF-412

    // Semestre 8 → Semestre 9
    { id: 37, idMateria: 41, idPrerequisito: 36 }, // INF-511 requiere ECO-449
    { id: 38, idMateria: 42, idPrerequisito: 40 }, // INF-512 requiere INF-422
    { id: 39, idMateria: 43, idPrerequisito: 40 }, // INF-513 requiere INF-422
    { id: 40, idMateria: 44, idPrerequisito: 40 }, // INF-552 requiere INF-422
  ],
};