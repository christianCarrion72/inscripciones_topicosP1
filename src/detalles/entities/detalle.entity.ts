import { GrupoMateria } from "src/grupo_materias/entities/grupo_materia.entity";
import { Inscripcion } from "src/inscripcions/entities/inscripcion.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, UpdateDateColumn } from "typeorm";

@Entity()
export class Detalle {

    @Column({ primary: true, generated: true})
    id: number;

    @ManyToOne(() => Inscripcion, (inscripcion) => inscripcion.id, {
        eager: true,
        nullable: true
    })
    idInscripcion: Inscripcion;

    @ManyToOne(() => GrupoMateria, (grupo_materia) => grupo_materia.id, {
        eager: true,
        nullable: true
    })
    idGrupoMat: GrupoMateria;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
