import { DataSource } from 'typeorm';
import { Materia } from '../../materias/entities/materia.entity';
import { Nivel } from '../../nivels/entities/nivel.entity';

export async function seedMaterias(dataSource: DataSource): Promise<void> {
  const materiaRepo = dataSource.getRepository(Materia);
  const nivelRepo = dataSource.getRepository(Nivel);

  const nivel = await nivelRepo.findOne({ where: {} });
  if (!nivel) return;

  const seedData: Array<Pick<Materia, 'nombre' | 'codigo'> & { idNivel: Nivel }> = [
    { nombre: 'Programación I', codigo: 'SIS-101', idNivel: nivel },
    { nombre: 'Álgebra', codigo: 'MAT-101', idNivel: nivel },
  ];

  for (const item of seedData) {
    const exists = await materiaRepo.findOne({ where: { codigo: item.codigo } });
    if (!exists) {
      await materiaRepo.save(materiaRepo.create(item));
    }
  }
}


