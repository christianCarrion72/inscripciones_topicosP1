import { Column, DeleteDateColumn, Entity } from "typeorm";

@Entity()
export class Materia {

    @Column({primary: true, generated: true})
    id: number;

    @Column()
    nombre: string;

    @Column()
    codigo: string;

    @Column()
    idNivel: number;

    @DeleteDateColumn()
    deletedAt: Date;
}
