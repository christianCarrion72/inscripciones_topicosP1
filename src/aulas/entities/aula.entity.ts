import { Column, DeleteDateColumn, Entity } from "typeorm";

@Entity()
export class Aula {

    @Column({ primary: true, generated: true})
    id: number;

    @Column()
    numero: number;

    @Column()
    idModulo: number;

    @DeleteDateColumn()
    deletedAt: Date;
}
