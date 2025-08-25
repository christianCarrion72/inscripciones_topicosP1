import { Column, DeleteDateColumn, Entity } from "typeorm";

@Entity()
export class BoletaHorario {

    @Column({ primary: true, generated: true})
    id: number;

    @Column()
    idHorario: number;

    @Column()
    idGrupoMateria: number;

    @DeleteDateColumn()
    deletedAt: Date;
}
