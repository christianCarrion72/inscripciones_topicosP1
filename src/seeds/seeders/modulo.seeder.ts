import { DataSource } from 'typeorm';
import { Modulo } from '../../modulos/entities/modulo.entity';

export async function seedModulos(dataSource: DataSource): Promise<void> {
  const moduloRepo = dataSource.getRepository(Modulo);

  const codigos = [100, 200, 300];
  for (const codigo of codigos) {
    const exists = await moduloRepo.findOne({ where: { codigo } });
    if (!exists) {
      await moduloRepo.save(moduloRepo.create({ codigo }));
    }
  }
}


