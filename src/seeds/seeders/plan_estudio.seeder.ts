import { DataSource } from 'typeorm';
import { PlanEstudio } from '../../plan_estudios/entities/plan_estudio.entity';
import { Carrera } from '../../carreras/entities/carrera.entity';

export async function seedPlanEstudios(dataSource: DataSource): Promise<void> {
  const planRepo = dataSource.getRepository(PlanEstudio);
  const carreraRepo = dataSource.getRepository(Carrera);

  const carreras = await carreraRepo.find();
  if (carreras.length === 0) return;

  const seedData: Array<Pick<PlanEstudio, 'nombre'> & { carreraCodigo: string }> = [
    { nombre: 'Plan 2020', carreraCodigo: 'SIS' },
    { nombre: 'Plan 2018', carreraCodigo: 'IND' },
  ];

  for (const item of seedData) {
    const carrera = carreras.find(c => c.codigo === item.carreraCodigo);
    if (!carrera) continue;
    const exists = await planRepo.findOne({ where: { nombre: item.nombre, idCarrera: { id: carrera.id } } });
    if (!exists) {
      const entity = planRepo.create({ nombre: item.nombre, idCarrera: carrera });
      await planRepo.save(entity);
    }
  }
}


