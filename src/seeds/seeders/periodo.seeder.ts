import { DataSource } from 'typeorm';
import { Periodo } from '../../periodos/entities/periodo.entity';
import { Gestion } from '../../gestions/entities/gestion.entity';

export async function seedPeriodos(dataSource: DataSource): Promise<void> {
  const periodoRepo = dataSource.getRepository(Periodo);
  const gestionRepo = dataSource.getRepository(Gestion);

  const gestion = await gestionRepo.findOne({ where: { numero: 2025 } });
  if (!gestion) return;

  const numeros = [1, 2];
  for (const numero of numeros) {
    const exists = await periodoRepo.findOne({ where: { numero, idGestion: { id: gestion.id } } });
    if (!exists) {
      await periodoRepo.save(periodoRepo.create({ numero, idGestion: gestion }));
    }
  }
}
