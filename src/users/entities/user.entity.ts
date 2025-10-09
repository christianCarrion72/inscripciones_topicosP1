import { Docente } from "src/docentes/entities/docente.entity";
import { Estudiante } from "src/estudiantes/entities/estudiante.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToOne, UpdateDateColumn } from "typeorm";

@Entity()
export class User {

    @Column({ primary: true, generated: true })
    id: number;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({nullable: false})
    contraseña: string;

    @Column({ 
        type: 'enum',
        enum: ['admin', 'docente', 'estudiante'],
        default: 'estudiante'
    })
    rol: string;

    @OneToOne(() => Estudiante, { nullable: true })
    estudiante: Estudiante;

    @OneToOne(() => Docente, { nullable: true })
    docente: Docente;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;
}
