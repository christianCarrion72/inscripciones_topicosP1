import { DataSource } from 'typeorm';
import { BoletaHorario } from '../../boleta_horarios/entities/boleta_horario.entity';
import { Horario } from '../../horarios/entities/horario.entity';
import { GrupoMateria } from '../../grupo_materias/entities/grupo_materia.entity';

export async function seedBoletaHorarios(dataSource: DataSource): Promise<void> {
  const boletaRepo = dataSource.getRepository(BoletaHorario);
  const horarioRepo = dataSource.getRepository(Horario);
  const grupoMateriaRepo = dataSource.getRepository(GrupoMateria);

  const horario = await horarioRepo.findOne({ where: {} });
  const grupoMateria = await grupoMateriaRepo.findOne({ where: {} });

  if (!horario || !grupoMateria) return;

  const exists = await boletaRepo.findOne({ 
    where: { 
      idHorario: { id: horario.id }, 
      idGrupoMateria: { id: grupoMateria.id } 
    } 
  });

  if (!exists) {
    await boletaRepo.save(boletaRepo.create({ 
      idHorario: horario, 
      idGrupoMateria: grupoMateria 
    }));
  }
}
