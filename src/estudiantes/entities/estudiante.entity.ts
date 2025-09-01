import { Inscripcion } from "src/inscripcions/entities/inscripcion.entity";
import { Nota } from "src/notas/entities/nota.entity";
import { PlanEstudio } from "src/plan_estudios/entities/plan_estudio.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, UpdateDateColumn } from "typeorm";

@Entity()
export class Estudiante {

    @Column({ primary: true, generated: true})
    id: number;

    @Column()
    nombre: string;

    @Column({ unique: true })
    ci: number;

    @Column({ unique: true })
    registro: number;

    @Column()
    telefono: number;

    @Column()
    direccion: string;

    @Column()
    tituloBachiller: number;

    @ManyToOne(() =>PlanEstudio, (plan_estudio) => plan_estudio.id,{
        eager: true,
        nullable: true
    } )
    idPlan: PlanEstudio;

    @OneToMany(() => Inscripcion, (inscripcion) => inscripcion.idEstudiante)
    inscripcions: Inscripcion[];

    @OneToMany(() =>Nota, (nota) => nota.idEstudiante)
    notas: Nota[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

}
