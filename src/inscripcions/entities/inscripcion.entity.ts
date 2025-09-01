import { Detalle } from "src/detalles/entities/detalle.entity";
import { Estudiante } from "src/estudiantes/entities/estudiante.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, UpdateDateColumn } from "typeorm";

@Entity()
export class Inscripcion {
    
    @Column({ primary: true, generated: true})
    id: number;

    @Column()
    fechaInscripcion: Date;

    @ManyToOne(() => Estudiante, (estudiante) => estudiante.id,{
        eager: true,
        nullable: false
    })
    idEstudiante: Estudiante;

    @OneToMany(() => Detalle, (detalle) => detalle.idInscripcion)
    detalles: Detalle[];
    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
