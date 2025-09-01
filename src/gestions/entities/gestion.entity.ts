import { Periodo } from "src/periodos/entities/periodo.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, UpdateDateColumn } from "typeorm";

@Entity()
export class Gestion {

    @Column({ primary: true, generated: true})
    id: number;

    @Column()
    numero: number;

    @OneToMany(() => Periodo, (periodo) => periodo.idGestion)
    periodos: Periodo[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
