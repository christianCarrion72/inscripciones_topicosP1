import { DataSource } from 'typeorm';
import { Dia } from '../../dias/entities/dia.entity';

export async function seedDias(dataSource: DataSource): Promise<void> {
  const diaRepo = dataSource.getRepository(Dia);

  const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  for (const nombre of dias) {
    const exists = await diaRepo.findOne({ where: { nombre } });
    if (!exists) {
      await diaRepo.save(diaRepo.create({ nombre }));
    }
  }
}


