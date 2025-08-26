import { DataSource } from 'typeorm';
import { Estudiante } from '../../estudiantes/entities/estudiante.entity';
import { PlanEstudio } from '../../plan_estudios/entities/plan_estudio.entity';

export async function seedEstudiantes(dataSource: DataSource): Promise<void> {
  const estudianteRepo = dataSource.getRepository(Estudiante);
  const planRepo = dataSource.getRepository(PlanEstudio);

  const plan = await planRepo.findOne({ where: {} });
  if (!plan) return;

  const seedData: Array<Omit<Estudiante, 'id' | 'inscripcions' | 'deletedAt'> & { idPlan: PlanEstudio }> = [
    { nombre: 'Juan Perez', ci: 1234567, registro: 20250001, telefono: 70000001, direccion: 'Av. 1', tituloBachiller: 2019, idPlan: plan },
    { nombre: 'Maria Gomez', ci: 2234567, registro: 20250002, telefono: 70000002, direccion: 'Av. 2', tituloBachiller: 2018, idPlan: plan },
  ];

  for (const item of seedData) {
    const exists = await estudianteRepo.findOne({ where: { ci: item.ci } });
    if (!exists) {
      await estudianteRepo.save(estudianteRepo.create(item));
    }
  }
}


