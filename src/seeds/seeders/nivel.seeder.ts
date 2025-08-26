import { DataSource } from 'typeorm';
import { Nivel } from '../../nivels/entities/nivel.entity';
import { PlanEstudio } from '../../plan_estudios/entities/plan_estudio.entity';

export async function seedNiveles(dataSource: DataSource): Promise<void> {
  const nivelRepo = dataSource.getRepository(Nivel);
  const planRepo = dataSource.getRepository(PlanEstudio);

  const planes = await planRepo.find();
  if (planes.length === 0) return;

  for (const plan of planes) {
    const nombres = ['Nivel 1', 'Nivel 2'];
    for (const nombre of nombres) {
      const exists = await nivelRepo.findOne({ where: { nombre, idPlan: { id: plan.id } } });
      if (!exists) {
        const entity = nivelRepo.create({ nombre, idPlan: plan });
        await nivelRepo.save(entity);
      }
    }
  }
}


