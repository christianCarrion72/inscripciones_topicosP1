import { Materia } from "src/materias/entities/materia.entity";
import { Column, DeleteDateColumn, Entity, ManyToOne } from "typeorm";

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

    @DeleteDateColumn()
    deletedAt: Date;

}
