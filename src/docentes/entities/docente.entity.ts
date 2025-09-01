import { GrupoMateria } from "src/grupo_materias/entities/grupo_materia.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, UpdateDateColumn } from "typeorm";

@Entity()
export class Docente {

    @Column({ primary: true, generated: true})
    id: number;

    @Column({unique: true})
    ci: number;

    @Column()
    nombre: string;

    @Column()
    direccion: string;

    @Column({unique: true})
    registro: number;

    @Column()
    especialidad: string;

    @Column()
    telefono: number;

    @OneToMany(() => GrupoMateria, (grupo_materia) => grupo_materia.idDocente)
    grupo_materias: GrupoMateria[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
