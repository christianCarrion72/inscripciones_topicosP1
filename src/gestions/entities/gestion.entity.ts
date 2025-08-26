import { Periodo } from "src/periodos/entities/periodo.entity";
import { Column, DeleteDateColumn, Entity, OneToMany } from "typeorm";

@Entity()
export class Gestion {

    @Column({ primary: true, generated: true})
    id: number;

    @Column()
    numero: number;

    @OneToMany(() => Periodo, (periodo) => periodo.idGestion)
    periodos: Periodo[];

    @DeleteDateColumn()
    deletedAt: Date;
}
