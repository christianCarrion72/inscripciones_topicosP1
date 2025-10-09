export const seedData = {
  carreras: [
    { nombre: 'Ingeniería de Sistemas', codigo: 'SIS' },
    { nombre: 'Ingeniería Industrial', codigo: 'IND' },
    { nombre: 'Ingeniería Civil', codigo: 'CIV' },
    { nombre: 'Administración de Empresas', codigo: 'ADM' },
  ],

  planesEstudio: [
    { nombre: 'Plan 2025', carreraCodigo: 'SIS' },
    { nombre: 'Plan 2018', carreraCodigo: 'IND' },
    { nombre: 'Plan 2022', carreraCodigo: 'CIV' },
    { nombre: 'Plan 2019', carreraCodigo: 'ADM' },
  ],

  niveles: [
    { nombre: 'Primer Nivel', planNombre: 'Plan 2025' },
    { nombre: 'Segundo Nivel', planNombre: 'Plan 2025' },
    { nombre: 'Tercer Nivel', planNombre: 'Plan 2025' },
    { nombre: 'Cuarto Nivel', planNombre: 'Plan 2025' },
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
    // Nivel 1
    { nombre: 'Introducción a la Programación', codigo: 'SIS-101', nivelNombre: 'Primer Nivel', planNombre: 'Plan 2025' },
    { nombre: 'Lógica y Matemática Discreta', codigo: 'SIS-102', nivelNombre: 'Primer Nivel', planNombre: 'Plan 2025' },

    // Nivel 2
    { nombre: 'Programación Orientada a Objetos', codigo: 'SIS-201', nivelNombre: 'Segundo Nivel', planNombre: 'Plan 2025' },
    { nombre: 'Estructuras de Datos', codigo: 'SIS-202', nivelNombre: 'Segundo Nivel', planNombre: 'Plan 2025' },

    // Nivel 3
    { nombre: 'Bases de Datos I', codigo: 'SIS-301', nivelNombre: 'Tercer Nivel', planNombre: 'Plan 2025' },
    { nombre: 'Ingeniería de Software I', codigo: 'SIS-302', nivelNombre: 'Tercer Nivel', planNombre: 'Plan 2025' },

    // Nivel 4
    { nombre: 'Sistemas Operativos', codigo: 'SIS-401', nivelNombre: 'Cuarto Nivel', planNombre: 'Plan 2025' },
    { nombre: 'Redes de Computadoras', codigo: 'SIS-402', nivelNombre: 'Cuarto Nivel', planNombre: 'Plan 2025' },
  ],

  docentes: [
    { ci: 1234567, nombre: 'Juan', direccion: 'Calle 1', registro: 111, especialidad: 'Sistemas', telefono: 70000001 },
    { ci: 2345678, nombre: 'María', direccion: 'Calle 2', registro: 222, especialidad: 'Industrial', telefono: 70000002 },
    { ci: 3456789, nombre: 'Carlos', direccion: 'Calle 3', registro: 333, especialidad: 'Civil', telefono: 70000003 },
  ],

  estudiantes: [
    { nombre: 'Ana', ci: 9876543, registro: 2024001, telefono: 70010001, direccion: 'Zona A', tituloBachiller: 123, planNombre: 'Plan 2025' },
    { nombre: 'Pedro', ci: 5678901, registro: 2024002, telefono: 70010002, direccion: 'Zona B', tituloBachiller: 124, planNombre: 'Plan 2025' },
    { nombre: 'Laura', ci: 3456789, registro: 2024003, telefono: 70010003, direccion: 'Zona C', tituloBachiller: 125, planNombre: 'Plan 2025' },
  ],

  gestiones: [
    { numero: 2024 },
    { numero: 2025 },
  ],

  periodos: [
    { numero: 1, gestionNumero: 2025 },
    { numero: 2, gestionNumero: 2025 },
  ],

  grupos: [
    { sigla: 'A' },
    { sigla: 'B' },
  ],

  grupoMaterias: [
    { cupos: 30, materiaCodigo: 'SIS-101', docenteCi: 1234567, grupoSigla: 'A' },
    { cupos: 25, materiaCodigo: 'SIS-102', docenteCi: 2345678, grupoSigla: 'A' },
    { cupos: 35, materiaCodigo: 'SIS-201', docenteCi: 3456789, grupoSigla: 'B' },
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
    { estudianteRegistro: 2024001 },
    { estudianteRegistro: 2024002 },
  ],

  detalles: [
    { inscripcionRegistro: 2024001, grupoMateria: { materiaCodigo: 'SIS-101', grupoSigla: 'A' } },
    { inscripcionRegistro: 2024002, grupoMateria: { materiaCodigo: 'SIS-102', grupoSigla: 'A' } },
  ],

  notas: [
    { estudianteRegistro: 2024001, grupoMateria: { materiaCodigo: 'SIS-101', grupoSigla: 'A' }, nota: 85 },
    { estudianteRegistro: 2024002, grupoMateria: { materiaCodigo: 'SIS-102', grupoSigla: 'A' }, nota: 90 },
  ],

  prerequisitos: [
    // Nivel 2 depende del Nivel 1
    { materiaCodigo: 'SIS-201', prerequisitoCodigo: 'SIS-101' },
    { materiaCodigo: 'SIS-202', prerequisitoCodigo: 'SIS-102' },

    // Nivel 3 depende del Nivel 2
    { materiaCodigo: 'SIS-301', prerequisitoCodigo: 'SIS-201' },
    { materiaCodigo: 'SIS-302', prerequisitoCodigo: 'SIS-202' },

    // Nivel 4 depende del Nivel 3
    { materiaCodigo: 'SIS-401', prerequisitoCodigo: 'SIS-301' },
    { materiaCodigo: 'SIS-402', prerequisitoCodigo: 'SIS-302' },
  ],
};


