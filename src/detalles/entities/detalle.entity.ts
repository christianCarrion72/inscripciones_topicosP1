import { Column, DeleteDateColumn, Entity } from "typeorm";

@Entity()
export class Detalle {

    @Column({ primary: true, generated: true})
    id: number;

    @Column()
    idInscripcion: number;

    @Column()
    idGrupoMat: number;

    @DeleteDateColumn()
    deletedAt: Date;
}
