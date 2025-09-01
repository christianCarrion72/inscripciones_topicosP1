import { Aula } from "src/aulas/entities/aula.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, UpdateDateColumn } from "typeorm";

@Entity()
export class Modulo {

    @Column({ primary: true, generated: true})
    id: number;

    @Column()
    codigo: number;

    @OneToMany(() =>Aula, (aula) => aula.idModulo)
    aulas: Aula[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;
}
