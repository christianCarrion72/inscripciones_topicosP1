import { DataSource } from 'typeorm';
import { Nota } from '../../notas/entities/nota.entity';
import { Estudiante } from '../../estudiantes/entities/estudiante.entity';
import { GrupoMateria } from '../../grupo_materias/entities/grupo_materia.entity';

export async function seedNotas(dataSource: DataSource): Promise<void> {
  const notaRepo = dataSource.getRepository(Nota);
  const estudianteRepo = dataSource.getRepository(Estudiante);
  const grupoMateriaRepo = dataSource.getRepository(GrupoMateria);

  const estudiante = await estudianteRepo.findOne({ where: {} });
  const grupoMateria = await grupoMateriaRepo.findOne({ where: {} });

  if (!estudiante || !grupoMateria) return;

  const exists = await notaRepo.findOne({ 
    where: { 
      idEstudiante: estudiante.id, 
      idMatGrup: grupoMateria.id 
    } 
  });

  if (!exists) {
    await notaRepo.save(notaRepo.create({ 
      nota: 85, 
      idMatGrup: grupoMateria.id, 
      idEstudiante: estudiante.id 
    }));
  }
}
