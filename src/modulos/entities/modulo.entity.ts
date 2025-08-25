import { Column, DeleteDateColumn, Entity } from "typeorm";

@Entity()
export class Modulo {

    @Column({ primary: true, generated: true})
    id: number;

    @Column()
    codigo: string;

    @DeleteDateColumn()
    deleteAt: Date;
}
