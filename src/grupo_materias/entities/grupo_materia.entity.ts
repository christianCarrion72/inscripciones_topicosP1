import { Column, DeleteDateColumn, Entity } from "typeorm";

@Entity()
export class GrupoMateria {

    @Column({ primary: true, generated: true})
    id: number;

    @Column()
    cupos: number;

    @Column()
    idMateria: number;

    @Column()
    idDocente: number;

    @Column()
    idGrupo: number;

    @DeleteDateColumn()
    deletedAt: Date;

}
