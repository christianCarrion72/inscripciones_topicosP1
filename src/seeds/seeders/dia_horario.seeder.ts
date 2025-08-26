import { DataSource } from 'typeorm';
import { DiaHorario } from '../../dia_horarios/entities/dia_horario.entity';
import { Dia } from '../../dias/entities/dia.entity';
import { Horario } from '../../horarios/entities/horario.entity';

export async function seedDiaHorarios(dataSource: DataSource): Promise<void> {
  const diaHorarioRepo = dataSource.getRepository(DiaHorario);
  const diaRepo = dataSource.getRepository(Dia);
  const horarioRepo = dataSource.getRepository(Horario);

  const dia = await diaRepo.findOne({ where: { nombre: 'Lunes' } });
  const horario = await horarioRepo.findOne({ where: {} });
  if (!dia || !horario) return;

  const exists = await diaHorarioRepo.findOne({ where: { idDia: { id: dia.id }, idHorario: { id: horario.id } } });
  if (!exists) {
    await diaHorarioRepo.save(diaHorarioRepo.create({ idDia: dia, idHorario: horario }));
  }
}


