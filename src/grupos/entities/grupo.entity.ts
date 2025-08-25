import { Column, DeleteDateColumn, Entity } from "typeorm";

@Entity()
export class Grupo {

    @Column({ primary: true, generated: true})
    id: number;

    @Column()
    sigla: string;

    @DeleteDateColumn()
    deletedAt: Date;
}
