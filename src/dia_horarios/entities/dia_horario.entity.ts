import { Column, DeleteDateColumn, Entity } from "typeorm";

@Entity()
export class DiaHorario {

    @Column({ primary: true, generated: true})
    id: number;

    @Column()
    idDia: number;

    @Column()
    idHorario: number;

    @DeleteDateColumn()
    deletedAt: Date;
}
