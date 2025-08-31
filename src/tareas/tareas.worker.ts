import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { TAREAS_QUEUE } from './tareas.constants';
import { Injectable, Logger } from '@nestjs/common';
import { CarrerasService } from '../carreras/carreras.service';
import { DiasService } from '../dias/dias.service';
import { AulasService } from 'src/aulas/aulas.service';
import { BoletaHorariosService } from 'src/boleta_horarios/boleta_horarios.service';
import { DocentesService } from 'src/docentes/docentes.service';
import { EstudiantesService } from 'src/estudiantes/estudiantes.service';
import { GestionsService } from 'src/gestions/gestions.service';
import { GrupoMateriasService } from 'src/grupo_materias/grupo_materias.service';
import { GruposService } from 'src/grupos/grupos.service';
import { HorariosService } from 'src/horarios/horarios.service';
import { InscripcionsService } from 'src/inscripcions/inscripcions.service';
import { MateriasService } from 'src/materias/materias.service';
import { ModulosService } from 'src/modulos/modulos.service';
import { NivelsService } from 'src/nivels/nivels.service';
import { NotasService } from 'src/notas/notas.service';
import { PeriodosService } from 'src/periodos/periodos.service';
import { PlanEstudiosService } from 'src/plan_estudios/plan_estudios.service';
import { DiaHorariosService } from 'src/dia_horarios/dia_horarios.service';
import { DetallesService } from 'src/detalles/detalles.service';
import { PrerequisitosService } from 'src/prerequisitos/prerequisitos.service';

@Processor(TAREAS_QUEUE)
@Injectable()
export class TareasWorker extends WorkerHost {
  private readonly logger = new Logger(TareasWorker.name);

  constructor(
    private readonly aula: AulasService,
    private readonly boletaHorario: BoletaHorariosService,
    private readonly carrera: CarrerasService,
    private readonly detalle: DetallesService,
    private readonly dia_horario: DiaHorariosService,
    private readonly dia: DiasService,
    private readonly docente: DocentesService,
    private readonly estudiante: EstudiantesService,
    private readonly gestion: GestionsService,
    private readonly grupoMateria: GrupoMateriasService,
    private readonly grupo: GruposService,
    private readonly horario: HorariosService,
    private readonly inscripcion: InscripcionsService,
    private readonly materia: MateriasService,
    private readonly modulo: ModulosService,
    private readonly nivel: NivelsService,
    private readonly nota: NotasService,
    private readonly periodo: PeriodosService,
    private readonly planEstudio: PlanEstudiosService,
    private readonly prerequisito: PrerequisitosService,
  ) {
    super();
  }

  // En BullMQ se hace switch por job.name (no @Process por nombre)
  async process(job: Job): Promise<any> {
    this.logger.debug(`Procesando ${job.name} id=${job.id}`);

    const { params, body } = job.data ?? {};

    switch (job.name) {

    // Aula
    case 'aula.create':
        return this.aula.create(body);
    case 'aula.update':
        return this.aula.update(params.id, body);
    case 'aulas.getAll':
        return this.aula.findAll();
    case 'aula.get':
        return this.aula.findOne(params.id);
    case 'aula.delete':
        return this.aula.remove(params.id);

    // Boleta Horario
    case 'boleta_horario.create':
        return this.boletaHorario.create(body);
    case 'boleta_horario.update':
        return this.boletaHorario.update(params.id, body);
    case 'boleta_horarios.getAll':
        return this.boletaHorario.findAll();
    case 'boleta_horario.get':
        return this.boletaHorario.findOne(params.id);
    case 'boleta_horario.delete':
        return this.boletaHorario.remove(params.id);

    // Carrera
    case 'carrera.create':
        return this.carrera.create(body);
    case 'carrera.update':
        return this.carrera.update(params.id, body);
    case 'carreras.getAll':
        return this.carrera.findAll();
    case 'carrera.get':
        return this.carrera.findOne(params.id);
    case 'carrera.delete':
        return this.carrera.remove(params.id);

    // Detalle
    case 'detalle.create':
        return this.detalle.create(body);
    case 'detalle.update':
        return this.detalle.update(params.id, body);
    case 'detalles.getAll':
        return this.detalle.findAll();
    case 'detalle.get':
        return this.detalle.findOne(params.id);
    case 'detalle.delete':
        return this.detalle.remove(params.id);

    // Día_Horario
    case 'dia_horario.create':
        return this.dia_horario.create(body);
    case 'dia_horario.update':
        return this.dia_horario.update(params.id, body);
    case 'dia_horarios.getAll':
        return this.dia_horario.findAll();
    case 'dia_horario.get':
        return this.dia_horario.findOne(params.id);
    case 'dia_horario.delete':
        return this.dia_horario.remove(params.id);

    // Día
    case 'dia.create':
        return this.dia.create(body);
    case 'dia.update':
        return this.dia.update(params.id, body);
    case 'dias.getAll':
        return this.dia.findAll();
    case 'dia.get':
        return this.dia.findOne(params.id);
    case 'dia.delete':
        return this.dia.remove(params.id);


    // Docente
    case 'docente.create':
        return this.docente.create(body);
    case 'docente.update':
        return this.docente.update(params.id, body);
    case 'docentes.getAll':
        return this.docente.findAll();
    case 'docente.get':
        return this.docente.findOne(params.id);
    case 'docente.delete':
        return this.docente.remove(params.id);

    // Estudiante
    case 'estudiante.create':
        return this.estudiante.create(body);
    case 'estudiante.update':
        return this.estudiante.update(params.id, body);
    case 'estudiantes.getAll':
        return this.estudiante.findAll();
    case 'estudiante.get':
        return this.estudiante.findOne(params.id);
    case 'estudiante.delete':
        return this.estudiante.remove(params.id);

    // Gestión
    case 'gestion.create':
        return this.gestion.create(body);
    case 'gestion.update':
        return this.gestion.update(params.id, body);
    case 'gestions.getAll':
        return this.gestion.findAll();
    case 'gestion.get':
        return this.gestion.findOne(params.id);
    case 'gestion.delete':
        return this.gestion.remove(params.id);

    // Grupo Materia
    case 'grupo_materia.create':
        return this.grupoMateria.create(body);
    case 'grupo_materia.update':
        return this.grupoMateria.update(params.id, body);
    case 'grupo_materias.getAll':
        return this.grupoMateria.findAll();
    case 'grupo_materia.get':
        return this.grupoMateria.findOne(params.id);
    case 'grupo_materia.delete':
        return this.grupoMateria.remove(params.id);

    // Grupo
    case 'grupo.create':
        return this.grupo.create(body);
    case 'grupo.update':
        return this.grupo.update(params.id, body);
    case 'grupos.getAll':
        return this.grupo.findAll();
    case 'grupo.get':
        return this.grupo.findOne(params.id);
    case 'grupo.delete':
        return this.grupo.remove(params.id);

    // Horario
    case 'horario.create':
        return this.horario.create(body);
    case 'horario.update':
        return this.horario.update(params.id, body);
    case 'horarios.getAll':
        return this.horario.findAll();
    case 'horario.get':
        return this.horario.findOne(params.id);
    case 'horario.delete':
        return this.horario.remove(params.id);

    // Inscripción
    case 'inscripcion.create':
        return this.inscripcion.create(body);
    case 'inscripcion.update':
        return this.inscripcion.update(params.id, body);
    case 'inscripciones.getAll':
        return this.inscripcion.findAll();
    case 'inscripcion.get':
        return this.inscripcion.findOne(params.id);
    case 'inscripcion.delete':
        return this.inscripcion.remove(params.id);

    // Materia
    case 'materia.create':
        return this.materia.create(body);
    case 'materia.update':
        return this.materia.update(params.id, body);
    case 'materias.getAll':
        return this.materia.findAll();
    case 'materia.get':
        return this.materia.findOne(params.id);
    case 'materia.delete':
        return this.materia.remove(params.id);

    // Módulo
    case 'modulo.create':
        return this.modulo.create(body);
    case 'modulo.update':
        return this.modulo.update(params.id, body);
    case 'modulos.getAll':
        return this.modulo.findAll();
    case 'modulo.get':
        return this.modulo.findOne(params.id);
    case 'modulo.delete':
        return this.modulo.remove(params.id);

    // Nivel
    case 'nivel.create':
        return this.nivel.create(body);
    case 'nivel.update':
        return this.nivel.update(params.id, body);
    case 'nivels.getAll':
        return this.nivel.findAll();
    case 'nivel.get':
        return this.nivel.findOne(params.id);
    case 'nivel.delete':
        return this.nivel.remove(params.id);

    // Nota
    case 'nota.create':
        return this.nota.create(body);
    case 'nota.update':
        return this.nota.update(params.id, body);
    case 'notas.getAll':
        return this.nota.findAll();
    case 'nota.get':
        return this.nota.findOne(params.id);
    case 'nota.delete':
        return this.nota.remove(params.id);

    // Período
    case 'periodo.create':
        return this.periodo.create(body);
    case 'periodo.update':
        return this.periodo.update(params.id, body);
    case 'periodos.getAll':
        return this.periodo.findAll();
    case 'periodo.get':
        return this.periodo.findOne(params.id);
    case 'periodo.delete':
        return this.periodo.remove(params.id);

    // Plan de Estudio
    case 'plan_estudio.create':
        return this.planEstudio.create(body);
    case 'plan_estudio.update':
        return this.planEstudio.update(params.id, body);
    case 'plan_estudios.getAll':
        return this.planEstudio.findAll();
    case 'plan_estudio.get':
        return this.planEstudio.findOne(params.id);
    case 'plan_estudio.delete':
        return this.planEstudio.remove(params.id);

    // Prerequisito
    case 'prerequisito.create':
        return this.prerequisito.create(body);
    case 'prerequisito.update':
        return this.prerequisito.update(params.id, body);
    case 'prerequisitos.getAll':
        return this.prerequisito.findAll();
    case 'prerequisito.get':
        return this.prerequisito.findOne(params.id);
    case 'prerequisito.delete':
        return this.prerequisito.remove(params.id);

      default:
        throw new Error(`Job name no soportado: ${job.name}`);
    }
  }
}
