import { PlanEstudio } from "src/plan_estudios/entities/plan_estudio.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, UpdateDateColumn } from "typeorm";

@Entity()
export class Carrera {

    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    nombre: string;

    @Column()
    codigo: string;

    @OneToMany(() => PlanEstudio,(plan_estudio) =>plan_estudio.idCarrera)
    planEstudios: PlanEstudio[];
    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
    
    @DeleteDateColumn()
    deletedAt: Date;

}
