import { DiaHorario } from "src/dia_horarios/entities/dia_horario.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, UpdateDateColumn } from "typeorm";

@Entity()
export class Dia {

    @Column({ primary: true, generated: true})
    id: number;

    @Column()
    nombre: string;

    @OneToMany(() => DiaHorario,(dia_horario) => dia_horario.idDia)
    dia_horarios: DiaHorario[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
