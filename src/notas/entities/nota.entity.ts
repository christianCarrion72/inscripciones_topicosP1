import { Estudiante } from "src/estudiantes/entities/estudiante.entity";
import { GrupoMateria } from "src/grupo_materias/entities/grupo_materia.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, UpdateDateColumn } from "typeorm";

@Entity()
export class Nota {

    @Column({ primary: true, generated: true})
    id: number;

    @Column()
    nota: number;

    @ManyToOne(() =>GrupoMateria, (grupo_materia) => grupo_materia.id,{
        eager: true,
        nullable: true,
    })
    idMatGrup: GrupoMateria;

    @ManyToOne(() =>Estudiante, (estudiante) => estudiante.id,{
        eager: true,
        nullable: true,
    })
    idEstudiante: Estudiante;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

}
