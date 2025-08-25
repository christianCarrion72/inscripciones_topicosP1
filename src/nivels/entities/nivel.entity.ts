import { PlanEstudio } from "src/plan_estudios/entities/plan_estudio.entity";
import { Column, DeleteDateColumn, Entity, ManyToOne } from "typeorm";

@Entity()
export class Nivel {

    @Column({ primary: true, generated: true})
    id: number;

    @Column()
    nombre: string;

    @ManyToOne(() =>PlanEstudio, (plan_estudio) => plan_estudio.id,{
        eager: true,
    })
    idPlan: PlanEstudio;

    @DeleteDateColumn()
    deletedAt: Date;
}
