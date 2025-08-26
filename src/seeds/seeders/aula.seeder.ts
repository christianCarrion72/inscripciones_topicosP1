import { DataSource } from 'typeorm';
import { Aula } from '../../aulas/entities/aula.entity';
import { Modulo } from '../../modulos/entities/modulo.entity';

export async function seedAulas(dataSource: DataSource): Promise<void> {
  const aulaRepo = dataSource.getRepository(Aula);
  const moduloRepo = dataSource.getRepository(Modulo);

  const modulo = await moduloRepo.findOne({ where: {} });
  if (!modulo) return;

  const numeros = [101, 102, 201, 202];
  for (const numero of numeros) {
    const exists = await aulaRepo.findOne({ where: { numero, idModulo: { id: modulo.id } } });
    if (!exists) {
      await aulaRepo.save(aulaRepo.create({ numero, idModulo: modulo }));
    }
  }
}


