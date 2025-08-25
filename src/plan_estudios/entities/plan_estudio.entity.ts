import { Carrera } from "src/carreras/entities/carrera.entity";
import { Nivel } from "src/nivels/entities/nivel.entity";
import { Column, DeleteDateColumn, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class PlanEstudio {

    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    nombre: string;
    
    @ManyToOne(() => Carrera ,(carrera)=> carrera.id, {
        eager: true,
        nullable: true
    })
    idCarrera: Carrera;

    @OneToMany(() =>Nivel, (nivel) => nivel.idPlan)
    nivels: Nivel[];

    @DeleteDateColumn()
    deletedAt: Date;
}
