import * as bcryptjs from 'bcryptjs';

export const seedData = {
  users: [
    {
      id: 1,
      email: 'admin@example.com',
      contraseña: bcryptjs.hashSync('123456789', 10),
      rol: 'admin'
    },
    {
      id: 2,
      email: 'estudiante1@example.com',
      contraseña: bcryptjs.hashSync('123456789', 10),
      rol: 'estudiante'
    },
    {
      id: 3,
      email: 'estudiante2@example.com',
      contraseña: bcryptjs.hashSync('123456789', 10),
      rol: 'estudiante'
    },
    {
      id: 4,
      email: 'estudiante3@example.com',
      contraseña: bcryptjs.hashSync('123456789', 10),
      rol: 'estudiante'
    },
    {
      id: 5,
      email: 'docente1@example.com',
      contraseña: bcryptjs.hashSync('123456789', 10),
      rol: 'docente'
    },
    {
      id: 6,
      email: 'docente2@example.com',
      contraseña: bcryptjs.hashSync('123456789', 10),
      rol: 'docente'
    },
    {
      id: 7,
      email: 'docente3@example.com',
      contraseña: bcryptjs.hashSync('123456789', 10),
      rol: 'docente'
    }
  ],
  carreras: [
    { nombre: 'Ingeniería de Sistemas', codigo: 'SIS' },
    { nombre: 'Ingeniería Industrial', codigo: 'IND' },
    { nombre: 'Ingeniería Civil', codigo: 'CIV' },
    { nombre: 'Administración de Empresas', codigo: 'ADM' },
  ],

  planesEstudio: [
    { id: 1, nombre: 'Plan 2020', carreraCodigo: 'SIS' },
    { id: 2, nombre: 'Plan 2018', carreraCodigo: 'IND' },
    { id: 3, nombre: 'Plan 2022', carreraCodigo: 'CIV' },
    { id: 4, nombre: 'Plan 2019', carreraCodigo: 'ADM' },
  ],

  niveles: [
    { nombre: 'Primer Nivel', planNombre: 'Plan 2020' },
    { nombre: 'Segundo Nivel', planNombre: 'Plan 2020' },
    { nombre: 'Tercer Nivel', planNombre: 'Plan 2020' },
    { nombre: 'Cuarto Nivel', planNombre: 'Plan 2020' },
  ],

  modulos: [
    { codigo: 1 },
    { codigo: 2 },
    { codigo: 3 },
  ],

  aulas: [
    { numero: 101, moduloCodigo: 1 },
    { numero: 102, moduloCodigo: 1 },
    { numero: 201, moduloCodigo: 2 },
    { numero: 301, moduloCodigo: 3 },
  ],

  dias: [
    { nombre: 'Lunes' },
    { nombre: 'Martes' },
    { nombre: 'Miércoles' },
    { nombre: 'Jueves' },
    { nombre: 'Viernes' },
    { nombre: 'Sábado' },
  ],

  horarios: [
    { horaInicio: '07:00', horaFin: '08:30', aulaNumero: 101 },
    { horaInicio: '08:30', horaFin: '10:00', aulaNumero: 101 },
    { horaInicio: '10:15', horaFin: '11:45', aulaNumero: 102 },
    { horaInicio: '11:45', horaFin: '13:15', aulaNumero: 201 },
    { horaInicio: '14:30', horaFin: '16:00', aulaNumero: 301 },
  ],

  materias: [
    { nombre: 'Programación I', codigo: 'SIS-101', nivelNombre: 'Primer Nivel', planNombre: 'Plan 2020' },
    { nombre: 'Matemática I', codigo: 'SIS-102', nivelNombre: 'Primer Nivel', planNombre: 'Plan 2020' },
    { nombre: 'Programación II', codigo: 'SIS-201', nivelNombre: 'Segundo Nivel', planNombre: 'Plan 2020' },
    { nombre: 'Base de Datos I', codigo: 'SIS-202', nivelNombre: 'Segundo Nivel', planNombre: 'Plan 2020' },
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
      user: { id: 5 }
    },
    {
      id: 2,
      ci: 234567,
      nombre: 'Dra. Ana Sánchez',
      registro: 234567,
      telefono: 71000002,
      direccion: 'Av. Banzer #456',
      especialidad: 'Inteligencia Artificial',
      user: { id: 6 }
    },
    {
      id: 3,
      ci: 345678,
      nombre: 'Dr. Luis Torres',
      registro: 345678,
      telefono: 71000003,
      direccion: 'Av. Pirai #789',
      especialidad: 'Redes y Telecomunicaciones',
      user: { id: 7 }
    }
  ],

  estudiantes: [
    {
      nombre: 'Juan Pérez',
      ci: 12345678,
      registro: 219062851,
      telefono: 70000001,
      direccion: 'Av. Busch #123',
      tituloBachiller: 123,
      user: { id: 2 }
    },
    {
      nombre: 'María García',
      ci: 23456789,
      registro: 219062852,
      telefono: 70000002,
      direccion: 'Av. Cañoto #456',
      tituloBachiller: 124,
      user: { id: 3 }
    },
    {
      nombre: 'Carlos López',
      ci: 34567890,
      registro: 219062853,
      telefono: 70000003,
      direccion: 'Av. Irala #789',
      tituloBachiller: 125,
      user: { id: 4 }
    }
  ],

  gestiones: [
    { numero: 2024 },
    { numero: 2025 },
  ],

  periodos: [
    { numero: 1, gestionNumero: 2024 },
    { numero: 2, gestionNumero: 2024 },
  ],

  grupos: [
    { sigla: 'A' },
    { sigla: 'B' },
  ],

  grupoMaterias: [
    { cupos: 30, materiaCodigo: 'SIS-101', idDocente: { id: 1 }, grupoSigla: 'A' },
    { cupos: 25, materiaCodigo: 'SIS-102', idDocente: { id: 2 }, grupoSigla: 'A' },
    { cupos: 35, materiaCodigo: 'SIS-201', idDocente: { id: 3 }, grupoSigla: 'B' },
  ],

  diaHorarios: [
    { diaNombre: 'Lunes', horarioHoraInicio: '07:00' },
    { diaNombre: 'Martes', horarioHoraInicio: '08:30' },
  ],

  boletaHorarios: [
    { horarioHoraInicio: '07:00', grupoMateria: { materiaCodigo: 'SIS-101', grupoSigla: 'A' } },
    { horarioHoraInicio: '08:30', grupoMateria: { materiaCodigo: 'SIS-102', grupoSigla: 'A' } },
  ],

  inscripciones: [
    { idEstudiante: { id: 1 } },
    { idEstudiante: { id: 2 } },
  ],

  detalles: [
    { inscripcionRegistro: 2024001, grupoMateria: { materiaCodigo: 'SIS-101', grupoSigla: 'A' } },
    { inscripcionRegistro: 2024002, grupoMateria: { materiaCodigo: 'SIS-102', grupoSigla: 'A' } },
  ],

  notas: [
    { idEstudiante: { id: 1 }, grupoMateria: { materiaCodigo: 'SIS-101', grupoSigla: 'A' }, nota: 85 },
    { idEstudiante: { id: 2 }, grupoMateria: { materiaCodigo: 'SIS-102', grupoSigla: 'A' }, nota: 90 },
  ],

  prerequisitos: [
    // Programación II requiere Programación I
    { materiaCodigo: 'SIS-201', prerequisitoCodigo: 'SIS-101' },
    // Base de Datos I requiere Programación II 
    { materiaCodigo: 'SIS-202', prerequisitoCodigo: 'SIS-201' },
  ],
};


