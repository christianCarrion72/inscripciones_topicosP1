import { DataSource, Repository } from 'typeorm';
import { seedData } from './data';

import { Carrera } from 'src/carreras/entities/carrera.entity';
import { PlanEstudio } from 'src/plan_estudios/entities/plan_estudio.entity';
import { Nivel } from 'src/nivels/entities/nivel.entity';
import { Modulo } from 'src/modulos/entities/modulo.entity';
import { Aula } from 'src/aulas/entities/aula.entity';
import { Dia } from 'src/dias/entities/dia.entity';
import { Horario } from 'src/horarios/entities/horario.entity';
import { Materia } from 'src/materias/entities/materia.entity';
import { Docente } from 'src/docentes/entities/docente.entity';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';
import { Gestion } from 'src/gestions/entities/gestion.entity';
import { Periodo } from 'src/periodos/entities/periodo.entity';
import { Grupo } from 'src/grupos/entities/grupo.entity';
import { GrupoMateria } from 'src/grupo_materias/entities/grupo_materia.entity';
import { DiaHorario } from 'src/dia_horarios/entities/dia_horario.entity';
import { BoletaHorario } from 'src/boleta_horarios/entities/boleta_horario.entity';
import { Inscripcion } from 'src/inscripcions/entities/inscripcion.entity';
import { Detalle } from 'src/detalles/entities/detalle.entity';
import { Nota } from 'src/notas/entities/nota.entity';
import { Prerequisito } from 'src/prerequisitos/entities/prerequisito.entity';

export class DatabaseSeeder {
  constructor(private readonly dataSource: DataSource) {}

  /**
   * Seed genérico con manejo de errores y logging
   */
  private async seedEntity<T = any>(
    repository: Repository<any>,
    data: any[],
    uniqueField: string,
    entityName: string,
  ): Promise<T[]> {
    if (!data?.length) {
      // linea de consola
      console.log(`⚠️  No hay datos para ${entityName}`);
      return [] as T[];
    }

    // linea de consola
    console.log(`📦 Seeding ${entityName}... (${data.length} items)`);
    const entities: T[] = [];
    let created = 0;
    let existing = 0;

    try {
      for (const item of data) {
        const whereCondition = { [uniqueField]: (item as any)[uniqueField] } as any;
        const existingEntity = await repository.findOne({ where: whereCondition } as any);
        
        if (existingEntity) {
          entities.push(existingEntity);
          existing++;
        } else {
          const newEntity = repository.create(item as any);
          const savedEntity = await repository.save(newEntity as any);
          entities.push(savedEntity);
          created++;
        }
      }

      // linea de consola
      console.log(`✅ ${entityName}: ${created} creados, ${existing} existentes`);
      return entities;
    } catch (error: any) {
      // linea de consola
      console.error(`❌ Error seeding ${entityName}:`, error);
      throw new Error(`Failed to seed ${entityName}: ${error.message}`);
    }
  }

  /**
   * Mapeo con validación
   */
  private mapWithValidation<T>(
    data: any[],
    mapper: (item: any) => T | null,
    entityName: string,
  ): T[] {
    const mapped = data.map(mapper).filter(Boolean) as T[];
    const failed = data.length - mapped.length;
    
    if (failed > 0) {
      // linea de consola
      console.warn(`⚠️  ${entityName}: ${failed} items no pudieron ser mapeados`);
    }
    
    return mapped;
  }

  async seed(): Promise<void> {
    // linea de consola
    console.log('🚀 Iniciando proceso de seeding...');
    
    try {
      // 1. Entidades base (sin dependencias)
      // linea de consola
      console.log('\n📋 Fase 1: Entidades base');
      
      const [carreras, modulos, dias, gestiones, grupos] = await Promise.all([
        this.seedEntity(this.dataSource.getRepository(Carrera), seedData.carreras, 'codigo', 'Carreras'),
        this.seedEntity(this.dataSource.getRepository(Modulo), seedData.modulos, 'codigo', 'Modulos'),
        this.seedEntity(this.dataSource.getRepository(Dia), seedData.dias, 'nombre', 'Dias'),
        this.seedEntity(this.dataSource.getRepository(Gestion), seedData.gestiones, 'numero', 'Gestiones'),
        this.seedEntity(this.dataSource.getRepository(Grupo), seedData.grupos, 'sigla', 'Grupos'),
      ]);

      // 2. Entidades con una dependencia
      // linea de consola
      console.log('\n📋 Fase 2: Entidades con dependencias simples');

      // Planes de Estudio
      const planesMapped = this.mapWithValidation(
        seedData.planesEstudio,
        (p) => {
          const carrera = (carreras as any[]).find((c: any) => c.codigo === p.carreraCodigo);
          return carrera ? ({ nombre: p.nombre, idCarrera: carrera } as Partial<PlanEstudio>) : null;
        },
        'Planes de Estudio'
      );
      const planes = await this.seedEntity(
        this.dataSource.getRepository(PlanEstudio), 
        planesMapped as any, 
        'nombre', 
        'Planes de Estudio'
      );

      // Niveles
      const nivelesMapped = this.mapWithValidation(
        seedData.niveles,
        (n) => {
          const plan = (planes as any[]).find((p: any) => p.nombre === n.planNombre);
          return plan ? ({ nombre: n.nombre, idPlan: plan } as Partial<Nivel>) : null;
        },
        'Niveles'
      );
      const niveles = await this.seedEntity(
        this.dataSource.getRepository(Nivel),
        nivelesMapped as any,
        'nombre',
        'Niveles'
      );

      // Aulas
      const aulasMapped = this.mapWithValidation(
        seedData.aulas,
        (a) => {
          const modulo = (modulos as any[]).find((m: any) => m.codigo === a.moduloCodigo);
          return modulo ? ({ numero: a.numero, idModulo: modulo } as Partial<Aula>) : null;
        },
        'Aulas'
      );
      const aulas = await this.seedEntity(
        this.dataSource.getRepository(Aula), 
        aulasMapped as any, 
        'numero', 
        'Aulas'
      );

      // Materias
      const materiasMapped = this.mapWithValidation(
        seedData.materias,
        (m) => {
          const nivel = (niveles as any[]).find((n: any) => n.nombre === m.nivelNombre);
          const plan = (planes as any[]).find((p: any) => p.nombre === m.planNombre);
          return (nivel && plan) ? ({ nombre: m.nombre, codigo: m.codigo, idNivel: nivel, idPlan: plan } as Partial<Materia>) : null;
        },
        'Materias'
      );
      const materias = await this.seedEntity(
        this.dataSource.getRepository(Materia), 
        materiasMapped as any, 
        'codigo', 
        'Materias'
      );

      // Periodos
      const periodosMapped = this.mapWithValidation(
        seedData.periodos,
        (p) => {
          const gestion = (gestiones as any[]).find((g: any) => g.numero === p.gestionNumero);
          return gestion ? ({ numero: p.numero, idGestion: gestion } as Partial<Periodo>) : null;
        },
        'Periodos'
      );
      const periodos = await this.seedEntity(
        this.dataSource.getRepository(Periodo), 
        periodosMapped as any, 
        'numero', 
        'Periodos'
      );

      // 3. Entidades con múltiples dependencias
      // linea de consola
      console.log('\n📋 Fase 3: Entidades independientes');

      const [docentes] = await Promise.all([
        this.seedEntity(this.dataSource.getRepository(Docente), seedData.docentes, 'ci', 'Docentes'),
      ]);

      // Estudiantes
      const estudiantesMapped = this.mapWithValidation(
        seedData.estudiantes,
        (e) => {
          const plan = (planes as any[]).find((p: any) => p.nombre === e.planNombre);
          if (!plan) return null;
          const { planNombre, ...rest } = e;
          return { ...rest, idPlan: plan } as Partial<Estudiante>;
        },
        'Estudiantes'
      );
      const estudiantes = await this.seedEntity(
        this.dataSource.getRepository(Estudiante), 
        estudiantesMapped as any, 
        'registro', 
        'Estudiantes'
      );

      // Horarios
      const horariosMapped = this.mapWithValidation(
        seedData.horarios,
        (h) => {
          const aula = (aulas as any[]).find((a: any) => a.numero === h.aulaNumero);
          return aula ? ({ horaInicio: h.horaInicio, horaFin: h.horaFin, idAula: aula } as Partial<Horario>) : null;
        },
        'Horarios'
      );
      const horarios = await this.seedEntity(
        this.dataSource.getRepository(Horario), 
        horariosMapped as any, 
        'horaInicio', 
        'Horarios'
      );

      // 4. Entidades relacionales complejas
      // linea de consola
      console.log('\n📋 Fase 4: Entidades relacionales');

      // GrupoMaterias
      const grupoMateriasMapped = this.mapWithValidation(
        seedData.grupoMaterias,
        (gm) => {
          const materia = (materias as any[]).find((m: any) => m.codigo === gm.materiaCodigo);
          const docente = (docentes as any[]).find((d: any) => d.ci === gm.docenteCi);
          const grupo = (grupos as any[]).find((g: any) => g.sigla === gm.grupoSigla);
          
          return (materia && docente && grupo) 
            ? ({ cupos: gm.cupos, idMateria: materia, idDocente: docente, idGrupo: grupo } as Partial<GrupoMateria>)
            : null;
        },
        'GrupoMaterias'
      );
      const grupoMaterias = await this.seedEntity(
        this.dataSource.getRepository(GrupoMateria), 
        grupoMateriasMapped as any, 
        'cupos',
        'GrupoMaterias'
      );

      // DiaHorarios
      const diaHorariosMapped = this.mapWithValidation(
        seedData.diaHorarios,
        (dh) => {
          const dia = (dias as any[]).find((d: any) => d.nombre === dh.diaNombre);
          const horario = (horarios as any[]).find((h: any) => h.horaInicio === dh.horarioHoraInicio);
          
          return (dia && horario) ? ({ idDia: dia, idHorario: horario } as Partial<DiaHorario>) : null;
        },
        'DiaHorarios'
      );
      const diaHorarios = await this.seedEntity(
        this.dataSource.getRepository(DiaHorario), 
        diaHorariosMapped as any, 
        'id', 
        'DiaHorarios'
      );

      // BoletaHorarios
      const boletaHorariosMapped = this.mapWithValidation(
        seedData.boletaHorarios,
        (bh) => {
          const horario = (horarios as any[]).find((h: any) => h.horaInicio === bh.horarioHoraInicio);
          const gm = (grupoMaterias as any[]).find((x: any) =>
            x.idMateria?.codigo === bh.grupoMateria.materiaCodigo && 
            x.idGrupo?.sigla === bh.grupoMateria.grupoSigla
          );
          
          return (horario && gm) ? ({ idHorario: horario, idGrupoMateria: gm } as Partial<BoletaHorario>) : null;
        },
        'BoletaHorarios'
      );
      const boletaHorarios = await this.seedEntity(
        this.dataSource.getRepository(BoletaHorario), 
        boletaHorariosMapped as any, 
        'id',
        'BoletaHorarios'
      );

      // 5. Entidades finales (inscripciones, notas, etc.)
      // linea de consola
      console.log('\n📋 Fase 5: Entidades finales');

      // Inscripciones
      const inscripcionesMapped = this.mapWithValidation(
        seedData.inscripciones,
        (i) => {
          const estudiante = (estudiantes as any[]).find((e: any) => e.registro === i.estudianteRegistro);
          return estudiante 
            ? ({ fechaInscripcion: new Date(),idEstudiante: estudiante } as Partial<Inscripcion>)
            : null;
        },
        'Inscripciones'
      );
      const inscripciones = await this.seedEntity(
        this.dataSource.getRepository(Inscripcion), 
        inscripcionesMapped as any, 
        'estudianteRegistro', 
        'Inscripciones'
      );

      // Detalles
      const detallesMapped = this.mapWithValidation(
        seedData.detalles,
        (d) => {
          const ins = (inscripciones as any[]).find((i: any) => 
            i.idEstudiante?.registro === d.inscripcionRegistro
          );
          const gm = (grupoMaterias as any[]).find((x: any) =>
            x.idMateria?.codigo === d.grupoMateria.materiaCodigo && 
            x.idGrupo?.sigla === d.grupoMateria.grupoSigla
          );
          
          return (ins && gm) ? ({ idInscripcion: ins.id, idGrupoMat: gm.id } as Partial<Detalle>) : null;
        },
        'Detalles'
      );
      const detalles = await this.seedEntity(
        this.dataSource.getRepository(Detalle), 
        detallesMapped as any, 
        'idInscripcion',
        'Detalles'
      );

      // Notas
      const notasMapped = this.mapWithValidation(
        seedData.notas,
        (n) => {
          const estudiante = (estudiantes as any[]).find((e: any) => e.registro === n.estudianteRegistro);
          const gm = (grupoMaterias as any[]).find((x: any) =>
            x.idMateria?.codigo === n.grupoMateria.materiaCodigo && 
            x.idGrupo?.sigla === n.grupoMateria.grupoSigla
          );
          
          return (estudiante && gm) 
            ? ({ nota: n.nota, idMatGrup: gm, idEstudiante: estudiante } as Partial<Nota>)
            : null;
        },
        'Notas'
      );
      const notas = await this.seedEntity(
        this.dataSource.getRepository(Nota), 
        notasMapped as any, 
        'idEstudiante',
        'Notas'
      );

      // Prerequisitos
      let prerequisitos: any[] = [];
      if (seedData.prerequisitos?.length) {
        const prerequisitosMapped = this.mapWithValidation(
          seedData.prerequisitos,
          (p: any) => {
            const materia = (materias as any[]).find((m: any) => m.codigo === p.materiaCodigo);
            const prerequisito = (materias as any[]).find((m: any) => m.codigo === p.prerequisitoCodigo);
            
            return (materia && prerequisito) 
              ? ({ idMateria: materia, idPrerequisito: prerequisito } as Partial<Prerequisito>)
              : null;
          },
          'Prerequisitos'
        );

        const repo = this.dataSource.getRepository(Prerequisito);
        const inserted: any[] = [];

        for (const item of prerequisitosMapped) {
          const exists = await repo.findOne({
            where: {
              idMateria: { id: (item.idMateria as any).id },
              idPrerequisito: { id: (item.idPrerequisito as any).id },
            },
            relations: ['idMateria', 'idPrerequisito'],
          });

          if (!exists) {
            const created = repo.create(item);
            const saved = await repo.save(created);
            inserted.push(saved);
          } else {
            inserted.push(exists);
          }
        }

      }

      // linea de consola
      console.log('\n✅ Proceso de seeding completado exitosamente');
      
      // Resumen final
      // linea de consola
      console.log('\n📊 Resumen:');
      console.log(`   Carreras:        ${carreras.length}`);
      console.log(`   PlanesEstudio:   ${planes.length}`);
      console.log(`   Niveles:         ${niveles.length}`);
      console.log(`   Modulos:         ${modulos.length}`);
      console.log(`   Aulas:           ${aulas.length}`);
      console.log(`   Dias:            ${dias.length}`);
      console.log(`   Horarios:        ${horarios.length}`);
      console.log(`   Materias:        ${materias.length}`);
      console.log(`   Docentes:        ${docentes.length}`);
      console.log(`   Estudiantes:     ${estudiantes.length}`);
      console.log(`   Gestiones:       ${gestiones.length}`);
      console.log(`   Periodos:        ${periodos.length}`);
      console.log(`   Grupos:          ${grupos.length}`);
      console.log(`   GrupoMaterias:   ${grupoMaterias.length}`);
      console.log(`   DiaHorarios:     ${diaHorarios.length}`);
      console.log(`   BoletaHorarios:  ${boletaHorarios.length}`);
      console.log(`   Inscripciones:   ${inscripciones.length}`);
      console.log(`   Detalles:        ${detalles.length}`);
      console.log(`   Notas:           ${notas.length}`);
      console.log(`   Prerequisitos:   ${prerequisitos.length}`);
    } catch (error) {
      // linea de consola
      console.error('❌ Error durante el seeding:', error);
      throw error;
    }
  }
}


