import { DataSource } from 'typeorm';
import { Docente } from '../../docentes/entities/docente.entity';

export async function seedDocentes(dataSource: DataSource): Promise<void> {
  const docenteRepo = dataSource.getRepository(Docente);

  const seedData = [
    { nombre: 'Dr. Carlos Rodriguez', ci: 12345678, registro: 1001, especialidad: 'Sistemas', telefono: 70000003, direccion: 'Av. Principal 123' },
    { nombre: 'Ing. Ana Martinez', ci: 87654321, registro: 1002, especialidad: 'Matemáticas', telefono: 70000004, direccion: 'Calle Central 456' },
  ];

  for (const item of seedData) {
    const exists = await docenteRepo.findOne({ where: { ci: item.ci } });
    if (!exists) {
      await docenteRepo.save(docenteRepo.create(item));
    }
  }
}
