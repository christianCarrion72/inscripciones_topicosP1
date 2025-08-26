import { DataSource } from 'typeorm';
import { Prerequisito } from '../../prerequisitos/entities/prerequisito.entity';
import { Materia } from '../../materias/entities/materia.entity';

export async function seedPrerequisitos(dataSource: DataSource): Promise<void> {
  const prereqRepo = dataSource.getRepository(Prerequisito);
  const materiaRepo = dataSource.getRepository(Materia);

  const materias = await materiaRepo.find();
  if (materias.length < 2) return;

  const base = materias.find(m => m.codigo === 'SIS-101') || materias[0];
  const advanced = materias.find(m => m.codigo !== base.codigo) || materias[1];

  const exists = await prereqRepo.findOne({ where: { idMateria: { id: advanced.id }, idPrerequisito: { id: base.id } } });
  if (!exists) {
    await prereqRepo.save(prereqRepo.create({ idMateria: advanced, idPrerequisito: base }));
  }
}


