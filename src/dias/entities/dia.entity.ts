import { Column, DeleteDateColumn, Entity } from "typeorm";

@Entity()
export class Dia {

    @Column({ primary: true, generated: true})
    id: number;

    @Column()
    nombre: string;

    @DeleteDateColumn()
    deletedAt: Date;
}
