import { GrupoMateria } from "src/grupo_materias/entities/grupo_materia.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, UpdateDateColumn } from "typeorm";

@Entity()
export class Grupo {

    @Column({ primary: true, generated: true})
    id: number;

    @Column()
    sigla: string;

    @OneToMany(() => GrupoMateria, (grupo_materia) => grupo_materia.idGrupo)
    grupo_materias: GrupoMateria[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
