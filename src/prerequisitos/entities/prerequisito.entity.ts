import { Materia } from "src/materias/entities/materia.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, UpdateDateColumn } from "typeorm";

@Entity()
export class Prerequisito {

    @Column({ primary: true, generated: true})
    id: number;

    @ManyToOne(() => Materia,(materia) => materia.id,{
        eager: true,
        nullable: true
    })
    idMateria: Materia;

    @ManyToOne(() => Materia,(materia) => materia.id,{
        eager: true,
        nullable: true
    })
    idPrerequisito: Materia;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

}
