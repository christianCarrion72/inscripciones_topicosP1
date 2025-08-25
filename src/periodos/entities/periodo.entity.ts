import { Column, DeleteDateColumn, Entity } from "typeorm";

@Entity()
export class Periodo {

    @Column({ primary: true, generated: true})
    id: number;

    @Column()
    numero: number;

    @Column()
    idGrupoMateria: number;

    @Column()
    idGestion: number;

    @DeleteDateColumn()
    deletedAt: Date;
}
