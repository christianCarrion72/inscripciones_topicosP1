import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { DatabaseSeeder } from './seeder';

@Injectable()
export class SeedsService {
  private readonly logger = new Logger(SeedsService.name);

  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  /**
   * Ejecuta el seeder completo
   */
  async runSeeder() {
    try {
      this.logger.log('🚀 Iniciando ejecución del seeder...');
      
      const seeder = new DatabaseSeeder(this.dataSource);
      await seeder.seed();
      
      // Obtener resumen de datos
      const summary = await this.getDatabaseSummary();
      
      this.logger.log('✅ Seeder ejecutado exitosamente');
      
      return {
        success: true,
        message: 'Seeder ejecutado exitosamente',
        timestamp: new Date().toISOString(),
        summary
      };
    } catch (error) {
      this.logger.error('❌ Error ejecutando seeder:', error);
      throw new HttpException(
        `Error ejecutando seeder: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Ejecuta el seeder solo si la base de datos está vacía
   */
  async runSeederSafe() {
    try {
      this.logger.log('🔍 Verificando estado de la base de datos...');
      
      const hasData = await this.hasDataInDatabase();
      
      if (hasData) {
        this.logger.log('⚠️  La base de datos ya contiene datos. No se ejecutará el seeder.');
        return {
          success: true,
          message: 'La base de datos ya contiene datos',
          executed: false,
          reason: 'Base de datos no está vacía',
          timestamp: new Date().toISOString()
        };
      }
      
      this.logger.log('🚀 Base de datos vacía, ejecutando seeder...');
      const result = await this.runSeeder();
      
      return {
        ...result,
        executed: true,
        reason: 'Base de datos estaba vacía'
      };
    } catch (error) {
      this.logger.error('❌ Error en seeder seguro:', error);
      throw new HttpException(
        `Error en seeder seguro: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Verifica el estado actual de la base de datos
   */
  async checkDatabaseStatus() {
    try {
      this.logger.log('🔍 Verificando estado de la base de datos...');
      
      const hasData = await this.hasDataInDatabase();
      const counts = await this.getDatabaseCounts();
      
      return {
        success: true,
        hasData,
        counts,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      this.logger.error('❌ Error verificando estado de la base de datos:', error);
      throw new HttpException(
        `Error verificando estado: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Verifica si la base de datos tiene datos
   */
  private async hasDataInDatabase(): Promise<boolean> {
    try {
      // Verificar si hay carreras (entidad base)
      const carreraCount = await this.dataSource
        .getRepository('Carrera')
        .count();
      
      return carreraCount > 0;
    } catch (error) {
      this.logger.warn('⚠️  Error verificando datos de carreras:', error);
      return false;
    }
  }

  /**
   * Obtiene conteos básicos de la base de datos
   */
  private async getDatabaseCounts() {
    try {
      const counts = {
        carreras: 0,
        materias: 0,
        estudiantes: 0,
        docentes: 0
      };

      try {
        counts.carreras = await this.dataSource
          .getRepository('Carrera')
          .count();
      } catch (error) {
        this.logger.warn('⚠️  Error contando carreras:', error);
      }

      try {
        counts.materias = await this.dataSource
          .getRepository('Materia')
          .count();
      } catch (error) {
        this.logger.warn('⚠️  Error contando materias:', error);
      }

      try {
        counts.estudiantes = await this.dataSource
          .getRepository('Estudiante')
          .count();
      } catch (error) {
        this.logger.warn('⚠️  Error contando estudiantes:', error);
      }

      try {
        counts.docentes = await this.dataSource
          .getRepository('Docente')
          .count();
      } catch (error) {
        this.logger.warn('⚠️  Error contando docentes:', error);
      }

      return counts;
    } catch (error) {
      this.logger.error('❌ Error obteniendo conteos:', error);
      return {
        carreras: 0,
        materias: 0,
        estudiantes: 0,
        docentes: 0
      };
    }
  }

  /**
   * Obtiene un resumen completo de la base de datos
   */
  private async getDatabaseSummary() {
    try {
      const summary = {
        carreras: 0,
        planEstudios: 0,
        niveles: 0,
        modulos: 0,
        aulas: 0,
        dias: 0,
        horarios: 0,
        materias: 0,
        docentes: 0,
        estudiantes: 0,
        gestiones: 0,
        periodos: 0,
        grupos: 0,
        grupoMaterias: 0,
        diaHorarios: 0,
        boletaHorarios: 0,
        inscripciones: 0,
        detalles: 0,
        notas: 0,
        prerequisitos: 0
      };

      // Contar cada entidad
      const entities = [
        'Carrera', 'PlanEstudio', 'Nivel', 'Modulo', 'Aula', 'Dia', 'Horario',
        'Materia', 'Docente', 'Estudiante', 'Gestion', 'Periodo', 'Grupo',
        'GrupoMateria', 'DiaHorario', 'BoletaHorario', 'Inscripcion', 'Detalle',
        'Nota', 'Prerequisito'
      ];

      for (const entityName of entities) {
        try {
          const count = await this.dataSource
            .getRepository(entityName)
            .count();
          
          // Mapear el nombre de la entidad al campo correspondiente
          const fieldName = this.mapEntityNameToField(entityName);
          if (fieldName && summary.hasOwnProperty(fieldName)) {
            summary[fieldName] = count;
          }
        } catch (error) {
          this.logger.warn(`⚠️  Error contando ${entityName}:`, error);
        }
      }

      return summary;
    } catch (error) {
      this.logger.error('❌ Error obteniendo resumen:', error);
      return {};
    }
  }

  /**
   * Mapea nombres de entidades a nombres de campos del resumen
   */
  private mapEntityNameToField(entityName: string): string | null {
    const mapping: { [key: string]: string } = {
      'Carrera': 'carreras',
      'PlanEstudio': 'planEstudios',
      'Nivel': 'niveles',
      'Modulo': 'modulos',
      'Aula': 'aulas',
      'Dia': 'dias',
      'Horario': 'horarios',
      'Materia': 'materias',
      'Docente': 'docentes',
      'Estudiante': 'estudiantes',
      'Gestion': 'gestiones',
      'Periodo': 'periodos',
      'Grupo': 'grupos',
      'GrupoMateria': 'grupoMaterias',
      'DiaHorario': 'diaHorarios',
      'BoletaHorario': 'boletaHorarios',
      'Inscripcion': 'inscripciones',
      'Detalle': 'detalles',
      'Nota': 'notas',
      'Prerequisito': 'prerequisitos'
    };

    return mapping[entityName] || null;
  }
}
