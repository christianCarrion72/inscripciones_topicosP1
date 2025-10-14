import { GrupoMateria } from "src/grupo_materias/entities/grupo_materia.entity";
import { Horario } from "src/horarios/entities/horario.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, UpdateDateColumn } from "typeorm";

@Entity()
export class BoletaHorario {

    @Column({ primary: true, generated: true})
    id: number;

    @ManyToOne(() => Horario, (horario) => horario.id, {eager: true, nullable: true})
    idHorario: Horario;

    @ManyToOne(() => GrupoMateria, (grupo_materia) => grupo_materia.id, {eager: true, nullable: true})
    idGrupoMateria: GrupoMateria;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
    
    @DeleteDateColumn()
    deletedAt: Date;
}
