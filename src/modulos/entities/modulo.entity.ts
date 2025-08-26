import { Aula } from "src/aulas/entities/aula.entity";
import { Column, DeleteDateColumn, Entity, OneToMany } from "typeorm";

@Entity()
export class Modulo {

    @Column({ primary: true, generated: true})
    id: number;

    @Column()
    codigo: number;

    @OneToMany(() =>Aula, (aula) => aula.idModulo)
    aulas: Aula[];

    @DeleteDateColumn()
    deleteAt: Date;
}
