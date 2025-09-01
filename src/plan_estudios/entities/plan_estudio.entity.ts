import { Carrera } from "src/carreras/entities/carrera.entity";
import { Estudiante } from "src/estudiantes/entities/estudiante.entity";
import { Materia } from "src/materias/entities/materia.entity";
import { Nivel } from "src/nivels/entities/nivel.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, UpdateDateColumn } from "typeorm";

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

    @OneToMany(() => Estudiante, (estudiante) => estudiante.idPlan)
    estudiantes: Estudiante[];

    @OneToMany(() => Materia,(materia) => materia.idPlan)
    materias: Materia[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
