import { DataSource } from 'typeorm';
import { Carrera } from '../../carreras/entities/carrera.entity';

export async function seedCarreras(dataSource: DataSource): Promise<void> {
  const carreraRepository = dataSource.getRepository(Carrera);

  const seedData: Array<Pick<Carrera, 'nombre' | 'codigo'>> = [
    { nombre: 'Ingeniería de Sistemas', codigo: 'SIS' },
    { nombre: 'Ingeniería Industrial', codigo: 'IND' },
    { nombre: 'Ingeniería Civil', codigo: 'CIV' },
    { nombre: 'Administración de Empresas', codigo: 'ADM' },
  ];

  for (const item of seedData) {
    const exists = await carreraRepository.findOne({ where: { codigo: item.codigo } });
    if (!exists) {
      const entity = carreraRepository.create(item);
      await carreraRepository.save(entity);
    }
  }
}


