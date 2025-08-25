import { Column, DeleteDateColumn, Entity } from "typeorm";

@Entity()
export class Horario {

    @Column({ primary: true, generated: true})
    id: number;

    @Column({ type: 'time' })
    horaInicio: string;

    @Column({ type: 'time' })
    horaFin: string;

    @Column()
    idAula: number;

    @DeleteDateColumn()
    deletedAt: Date;

}
