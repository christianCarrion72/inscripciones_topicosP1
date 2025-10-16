import { Estudiante } from "src/estudiantes/entities/estudiante.entity";
import { GrupoMateria } from "src/grupo_materias/entities/grupo_materia.entity";
import { Detalle } from "src/detalles/entities/detalle.entity";
import { 
    Column, 
    CreateDateColumn, 
    DeleteDateColumn, 
    Entity, 
    ManyToOne, 
    OneToOne,
    JoinColumn, 
    UpdateDateColumn 
} from "typeorm";

@Entity()
export class Nota {

    @Column({ primary: true, generated: true })
    id: number;

    @Column({ type: 'int', nullable: true })
    nota: number | null;

    @ManyToOne(() => Estudiante, (estudiante) => estudiante.id, {
        eager: true,
        nullable: true,
    })
    idEstudiante: Estudiante;

    @OneToOne(() => Detalle, { eager: true, nullable: true })
    @JoinColumn({ name: 'idDetalle' }) // crea la columna "idDetalle" en Nota
    idDetalle: Detalle;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
