import { DataSource } from 'typeorm';
import { Grupo } from '../../grupos/entities/grupo.entity';

export async function seedGrupos(dataSource: DataSource): Promise<void> {
  const grupoRepo = dataSource.getRepository(Grupo);

  const siglas = ['A', 'B', 'C'];
  for (const sigla of siglas) {
    const exists = await grupoRepo.findOne({ where: { sigla } });
    if (!exists) {
      await grupoRepo.save(grupoRepo.create({ sigla }));
    }
  }
}
