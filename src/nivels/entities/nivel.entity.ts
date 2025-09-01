import { Materia } from "src/materias/entities/materia.entity";
import { PlanEstudio } from "src/plan_estudios/entities/plan_estudio.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, UpdateDateColumn } from "typeorm";

@Entity()
export class Nivel {

    @Column({ primary: true, generated: true})
    id: number;

    @Column()
    nombre: string;

    @ManyToOne(() =>PlanEstudio, (plan_estudio) => plan_estudio.id,{
        eager: true,
        nullable: true,
    })
    idPlan: PlanEstudio;

    @OneToMany(() => Materia,(materia) => materia.idNivel)
    materias: Materia[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
