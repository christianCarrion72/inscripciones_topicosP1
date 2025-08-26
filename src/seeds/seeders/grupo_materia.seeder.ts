import { DataSource } from 'typeorm';
import { GrupoMateria } from '../../grupo_materias/entities/grupo_materia.entity';
import { Materia } from '../../materias/entities/materia.entity';
import { Docente } from '../../docentes/entities/docente.entity';
import { Grupo } from '../../grupos/entities/grupo.entity';
import { Periodo } from '../../periodos/entities/periodo.entity';

export async function seedGrupoMaterias(dataSource: DataSource): Promise<void> {
  const grupoMateriaRepo = dataSource.getRepository(GrupoMateria);
  const materiaRepo = dataSource.getRepository(Materia);
  const docenteRepo = dataSource.getRepository(Docente);
  const grupoRepo = dataSource.getRepository(Grupo);
  const periodoRepo = dataSource.getRepository(Periodo);

  const materia = await materiaRepo.findOne({ where: { codigo: 'SIS-101' } });
  const docente = await docenteRepo.findOne({ where: {} });
  const grupo = await grupoRepo.findOne({ where: { sigla: 'A' } });
  const periodo = await periodoRepo.findOne({ where: {} });

  if (!materia || !docente || !grupo || !periodo) return;

  const exists = await grupoMateriaRepo.findOne({ 
    where: { 
      idMateria: { id: materia.id }, 
      idGrupo: { id: grupo.id },
      idDocente: { id: docente.id }
    } 
  });

  if (!exists) {
    await grupoMateriaRepo.save(grupoMateriaRepo.create({ 
      cupos: 30, 
      idMateria: materia, 
      idDocente: docente, 
      idGrupo: grupo 
    }));
  }
}
