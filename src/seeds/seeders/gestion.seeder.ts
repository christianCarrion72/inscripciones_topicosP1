import { DataSource } from 'typeorm';
import { Gestion } from '../../gestions/entities/gestion.entity';

export async function seedGestions(dataSource: DataSource): Promise<void> {
  const gestionRepo = dataSource.getRepository(Gestion);

  const numeros = [2024, 2025];
  for (const numero of numeros) {
    const exists = await gestionRepo.findOne({ where: { numero } });
    if (!exists) {
      await gestionRepo.save(gestionRepo.create({ numero }));
    }
  }
}
