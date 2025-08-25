import { Column, DeleteDateColumn, Entity } from "typeorm";

@Entity()
export class Gestion {

    @Column({ primary: true, generated: true})
    id: number;

    @Column()
    numero: number;

    @DeleteDateColumn()
    deletedAt: Date;
}
