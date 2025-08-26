import { DataSource } from 'typeorm';
import { Horario } from '../../horarios/entities/horario.entity';
import { Aula } from '../../aulas/entities/aula.entity';

export async function seedHorarios(dataSource: DataSource): Promise<void> {
  const horarioRepo = dataSource.getRepository(Horario);
  const aulaRepo = dataSource.getRepository(Aula);

  const aula = await aulaRepo.findOne({ where: {} });
  if (!aula) return;

  const blocks = [
    { horaInicio: '08:00', horaFin: '10:00' },
    { horaInicio: '10:00', horaFin: '12:00' },
  ];

  for (const block of blocks) {
    const exists = await horarioRepo.findOne({ where: { horaInicio: block.horaInicio, horaFin: block.horaFin, idAula: { id: aula.id } } });
    if (!exists) {
      await horarioRepo.save(horarioRepo.create({ ...block, idAula: aula }));
    }
  }
}


