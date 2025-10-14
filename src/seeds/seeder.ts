import { DataSource, Repository } from 'typeorm';
import { seedData } from './data';

import { User } from 'src/users/entities/user.entity';
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
   * Seed genérico con manejo de IDs explícitos
   */
  private async seedEntity<T = any>(
    repository: Repository<any>,
    data: any[],
    uniqueField: string,
    entityName: string,
  ): Promise<T[]> {
    if (!data?.length) {
      console.log(`⚠️  No hay datos para ${entityName}`);
      return [] as T[];
    }

    console.log(`📦 Seeding ${entityName}... (${data.length} items)`);
    const entities: T[] = [];
    let created = 0;
    let existing = 0;
    let failed = 0;

    try {
      for (const item of data) {
        try {
          // Intentar insertar directamente
          await repository
            .createQueryBuilder()
            .insert()
            .into(repository.metadata.target)
            .values(item)
            .orIgnore()
            .execute();
          
          created++;
        } catch (error: any) {
          // Si falla, verificar si ya existe
          const whereCondition = { [uniqueField]: (item as any)[uniqueField] } as any;
          const existingEntity = await repository.findOne({ where: whereCondition } as any);
          
          if (existingEntity) {
            existing++;
          } else {
            failed++;
            console.log(`   ⚠️  Error insertando ${entityName} con ${uniqueField}=${item[uniqueField]}:`, error.message);
          }
        }
      }

      // Recuperar todas las entidades insertadas
      const allEntities = await repository.find();
      entities.push(...allEntities);

      console.log(`✅ ${entityName}: ${created} creados, ${existing} existentes${failed > 0 ? `, ${failed} fallidos` : ''}`);
      return entities;
    } catch (error: any) {
      console.error(`❌ Error seeding ${entityName}:`, error);
      console.error('   Detalle:', error.message);
      throw new Error(`Failed to seed ${entityName}: ${error.message}`);
    }
  }

  /**
   * Seed especial para entidades con claves compuestas
   * No verifica existencia, solo inserta todos los registros
   */
  private async seedEntityComposite<T = any>(
    repository: Repository<any>,
    data: any[],
    whereFields: string[],
    entityName: string,
  ): Promise<T[]> {
    if (!data?.length) {
      console.log(`⚠️  No hay datos para ${entityName}`);
      return [] as T[];
    }

    console.log(`📦 Seeding ${entityName}... (${data.length} items)`);
    const entities: T[] = [];
    let created = 0;

    try {
      for (const item of data) {
        try {
          // Insertar usando query builder
          await repository
            .createQueryBuilder()
            .insert()
            .into(repository.metadata.target)
            .values(item)
            .orIgnore()
            .execute();
          
          created++;
        } catch (err: any) {
          console.log(`   ⚠️  Error insertando item:`, err.message);
        }
      }

      // Recuperar todas las entidades
      const allEntities = await repository.find();
      entities.push(...allEntities);

      console.log(`✅ ${entityName}: ${created} procesados, total en DB: ${entities.length}`);
      return entities;
    } catch (error: any) {
      console.error(`❌ Error seeding ${entityName}:`, error);
      console.error('   Detalle:', error.message);
      throw new Error(`Failed to seed ${entityName}: ${error.message}`);
    }
  }

  /**
   * Depuración: Mostrar IDs insertados
   */
  private async debugTableIds(tableName: string): Promise<void> {
    try {
      const result = await this.dataSource.query(
        `SELECT id FROM "${tableName}" ORDER BY id`
      );
      const ids = result.map((r: any) => r.id);
      console.log(`   🔍 IDs en ${tableName}: [${ids.join(', ')}]`);
    } catch (error) {
      console.log(`   ⚠️  No se pudo verificar IDs de ${tableName}`);
    }
  }

  async seed(): Promise<void> {
    console.log('🚀 Iniciando proceso de seeding...');
    
    try {
      // ========================================
      // LIMPIEZA INICIAL (Opcional pero recomendado)
      // ========================================
      console.log('\n🧹 Limpiando tablas en orden inverso...');
      
      const tablesToClean = [
        'prerequisito',
        'nota',
        'detalle',
        'inscripcion',
        'boleta_horario',
        'dia_horario',
        'grupo_materia',
        'periodo',
        'estudiante',
        'docente',
        'materia',
        'horario',
        'aula',
        'nivel',
        'plan_estudio',
        'grupo',
        'gestion',
        'dia',
        'modulo',
        'carrera',
        'user',
      ];

      for (const table of tablesToClean) {
        try {
          await this.dataSource.query(`DELETE FROM "${table}"`);
          await this.dataSource.query(`ALTER SEQUENCE IF EXISTS "${table}_id_seq" RESTART WITH 1`);
        } catch (error) {
          console.log(`   ⚠️  No se pudo limpiar ${table}`);
        }
      }
      
      console.log('✅ Limpieza completada');

      // ========================================
      // FASE 1: ENTIDADES BASE (sin dependencias)
      // ========================================
      console.log('\n📋 Fase 1: Entidades base');
      
      const [users, carreras, modulos, dias, gestiones, grupos] = await Promise.all([
        this.seedEntity(this.dataSource.getRepository(User), seedData.users, 'id', 'Users'),
        this.seedEntity(this.dataSource.getRepository(Carrera), seedData.carreras, 'id', 'Carreras'),
        this.seedEntity(this.dataSource.getRepository(Modulo), seedData.modulos, 'id', 'Modulos'),
        this.seedEntity(this.dataSource.getRepository(Dia), seedData.dias, 'id', 'Dias'),
        this.seedEntity(this.dataSource.getRepository(Gestion), seedData.gestiones, 'id', 'Gestiones'),
        this.seedEntity(this.dataSource.getRepository(Grupo), seedData.grupos, 'id', 'Grupos'),
      ]);

      // ========================================
      // FASE 2: ENTIDADES CON DEPENDENCIAS SIMPLES
      // ========================================
      console.log('\n📋 Fase 2: Entidades con dependencias simples');

      // Planes de Estudio (dependen de Carreras)
      const planes = await this.seedEntity(
        this.dataSource.getRepository(PlanEstudio), 
        seedData.planesEstudio, 
        'id', 
        'Planes de Estudio'
      );

      // Niveles (dependen de Planes)
      const niveles = await this.seedEntity(
        this.dataSource.getRepository(Nivel),
        seedData.niveles,
        'id',
        'Niveles'
      );

      // Aulas (dependen de Modulos)
      const aulas = await this.seedEntity(
        this.dataSource.getRepository(Aula), 
        seedData.aulas, 
        'id', 
        'Aulas'
      );

      // Horarios (dependen de Aulas)
      const horarios = await this.seedEntity(
        this.dataSource.getRepository(Horario), 
        seedData.horarios, 
        'id', 
        'Horarios'
      );

      // Materias (dependen de Niveles y Planes)
      const materias = await this.seedEntity(
        this.dataSource.getRepository(Materia), 
        seedData.materias, 
        'id', 
        'Materias'
      );

      // Periodos (dependen de Gestiones)
      const periodos = await this.seedEntity(
        this.dataSource.getRepository(Periodo), 
        seedData.periodos, 
        'id', 
        'Periodos'
      );

      // ========================================
      // FASE 3: DOCENTES Y ESTUDIANTES
      // ========================================
      console.log('\n📋 Fase 3: Docentes y Estudiantes');

      // Docentes (dependen de Users)
      const docentes = await this.seedEntity(
        this.dataSource.getRepository(Docente),
        seedData.docentes,
        'id',
        'Docentes'
      );

      // Estudiantes (dependen de Users y Planes)
      const estudiantes = await this.seedEntity(
        this.dataSource.getRepository(Estudiante), 
        seedData.estudiantes, 
        'id', 
        'Estudiantes'
      );

      // ========================================
      // FASE 4: ENTIDADES RELACIONALES COMPLEJAS
      // ========================================
      console.log('\n📋 Fase 4: Entidades relacionales');

      // GrupoMaterias (dependen de Materias, Docentes, Grupos)
      const grupoMaterias = await this.seedEntityComposite(
        this.dataSource.getRepository(GrupoMateria),
        seedData.grupoMaterias,
        ['idMateria', 'idGrupo'],
        'GrupoMaterias'
      );
      
      // DEBUG: Verificar IDs de GrupoMaterias
      await this.debugTableIds('grupo_materia');

      // DiaHorarios (dependen de Dias y Horarios)
      const diaHorarios = await this.seedEntityComposite(
        this.dataSource.getRepository(DiaHorario), 
        seedData.diaHorarios,
        ['idDia', 'idHorario'],
        'DiaHorarios'
      );

      // BoletaHorarios (dependen de Horarios y GrupoMaterias)
      const boletaHorarios = await this.seedEntity(
        this.dataSource.getRepository(BoletaHorario), 
        seedData.boletaHorarios, 
        'id',
        'BoletaHorarios'
      );

      // ========================================
      // FASE 5: INSCRIPCIONES Y DERIVADOS
      // ========================================
      console.log('\n📋 Fase 5: Inscripciones y derivados');

      // Inscripciones (dependen de Estudiantes)
      const inscripciones = await this.seedEntity(
        this.dataSource.getRepository(Inscripcion), 
        seedData.inscripciones, 
        'id', 
        'Inscripciones'
      );

      // Detalles (dependen de Inscripciones y GrupoMaterias)
      const detalles = await this.seedEntity(
        this.dataSource.getRepository(Detalle), 
        seedData.detalles, 
        'id',
        'Detalles'
      );

      // Notas (dependen de Estudiantes y GrupoMaterias)
      const notas = await this.seedEntity(
        this.dataSource.getRepository(Nota), 
        seedData.notas, 
        'id',
        'Notas'
      );

      // ========================================
      // FASE 6: PREREQUISITOS
      // ========================================
      console.log('\n📋 Fase 6: Prerequisitos');

      // Prerequisitos (dependen de Materias)
      const prerequisitos = await this.seedEntityComposite(
        this.dataSource.getRepository(Prerequisito),
        seedData.prerequisitos,
        ['idMateria', 'idPrerequisito'],
        'Prerequisitos'
      );

      // ========================================
      // RESUMEN FINAL
      // ========================================
      console.log('\n✅ Proceso de seeding completado exitosamente');
      
      console.log('\n📊 Resumen:');
      console.log(`   Users:           ${users.length}`);
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
      console.error('❌ Error durante el seeding:', error);
      throw error;
    }
  }
}