import { DataSource } from 'typeorm';
import { Detalle } from '../../detalles/entities/detalle.entity';
import { Inscripcion } from '../../inscripcions/entities/inscripcion.entity';
import { GrupoMateria } from '../../grupo_materias/entities/grupo_materia.entity';

export async function seedDetalles(dataSource: DataSource): Promise<void> {
  const detalleRepo = dataSource.getRepository(Detalle);
  const inscripcionRepo = dataSource.getRepository(Inscripcion);
  const grupoMateriaRepo = dataSource.getRepository(GrupoMateria);

  const inscripcion = await inscripcionRepo.findOne({ where: {} });
  const grupoMateria = await grupoMateriaRepo.findOne({ where: {} });

  if (!inscripcion || !grupoMateria) return;

  const exists = await detalleRepo.findOne({ 
    where: { 
      idInscripcion: inscripcion.id, 
      idGrupoMat: grupoMateria.id 
    } 
  });

  if (!exists) {
    await detalleRepo.save(detalleRepo.create({ 
      idInscripcion: inscripcion.id, 
      idGrupoMat: grupoMateria.id 
    }));
  }
}
