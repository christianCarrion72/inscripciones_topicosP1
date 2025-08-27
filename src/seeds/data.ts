export const seedData = {
  carreras: [
    { nombre: 'Ingeniería de Sistemas', codigo: 'SIS' },
    { nombre: 'Ingeniería Industrial', codigo: 'IND' },
    { nombre: 'Ingeniería Civil', codigo: 'CIV' },
    { nombre: 'Administración de Empresas', codigo: 'ADM' },
  ],

  planesEstudio: [
    { nombre: 'Plan 2020', carreraCodigo: 'SIS' },
    { nombre: 'Plan 2018', carreraCodigo: 'IND' },
    { nombre: 'Plan 2022', carreraCodigo: 'CIV' },
    { nombre: 'Plan 2019', carreraCodigo: 'ADM' },
  ],

  niveles: [
    { nombre: 'Primer Nivel' },
    { nombre: 'Segundo Nivel' },
    { nombre: 'Tercer Nivel' },
    { nombre: 'Cuarto Nivel' },
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
    { nombre: 'Programación I', codigo: 'SIS-101', nivelNombre: 'Primer Nivel' },
    { nombre: 'Matemática I', codigo: 'SIS-102', nivelNombre: 'Primer Nivel' },
    { nombre: 'Programación II', codigo: 'SIS-201', nivelNombre: 'Segundo Nivel' },
    { nombre: 'Base de Datos I', codigo: 'SIS-202', nivelNombre: 'Segundo Nivel' },
  ],

  docentes: [
    { ci: 1234567, nombre: 'Juan', direccion: 'Calle 1', registro: 111, especialidad: 'Sistemas', telefono: 70000001 },
    { ci: 2345678, nombre: 'María', direccion: 'Calle 2', registro: 222, especialidad: 'Industrial', telefono: 70000002 },
    { ci: 3456789, nombre: 'Carlos', direccion: 'Calle 3', registro: 333, especialidad: 'Civil', telefono: 70000003 },
  ],

  estudiantes: [
    { nombre: 'Ana', ci: 9876543, registro: 2024001, telefono: 70010001, direccion: 'Zona A', tituloBachiller: 123, planNombre: 'Plan 2020' },
    { nombre: 'Pedro', ci: 5678901, registro: 2024002, telefono: 70010002, direccion: 'Zona B', tituloBachiller: 124, planNombre: 'Plan 2020' },
    { nombre: 'Laura', ci: 3456789, registro: 2024003, telefono: 70010003, direccion: 'Zona C', tituloBachiller: 125, planNombre: 'Plan 2018' },
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
    { estudianteRegistro: 2024001, fechaInscripcion: '2024-02-10' },
    { estudianteRegistro: 2024002, fechaInscripcion: '2024-02-11' },
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
    // Relación en entity Prerequisito no fue incluida en esta revisión. Rellena aquí si la usas.
  ],
};


