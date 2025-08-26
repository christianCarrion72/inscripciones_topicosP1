import { DataSource } from 'typeorm';
import { Inscripcion } from '../../inscripcions/entities/inscripcion.entity';
import { Estudiante } from '../../estudiantes/entities/estudiante.entity';

export async function seedInscripcions(dataSource: DataSource): Promise<void> {
  const inscRepo = dataSource.getRepository(Inscripcion);
  const estRepo = dataSource.getRepository(Estudiante);

  const estudiante = await estRepo.findOne({ where: {} });
  if (!estudiante) return;

  const today = new Date();

  const exists = await inscRepo.findOne({ where: { idEstudiante: { id: estudiante.id } } });
  if (!exists) {
    await inscRepo.save(inscRepo.create({ idEstudiante: estudiante, fechaInscripcion: today }));
  }
}


