import { Column, DeleteDateColumn, Entity } from "typeorm";

@Entity()
export class Nota {

    @Column({ primary: true, generated: true})
    id: number;

    @Column()
    nota: number;

    @Column()
    idMatGrup: number;

    @Column()
    idEstudiante: number;

    @DeleteDateColumn()
    deletedAt: Date;

}
