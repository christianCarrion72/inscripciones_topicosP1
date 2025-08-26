import { DiaHorario } from "src/dia_horarios/entities/dia_horario.entity";
import { Column, DeleteDateColumn, Entity, OneToMany } from "typeorm";

@Entity()
export class Dia {

    @Column({ primary: true, generated: true})
    id: number;

    @Column()
    nombre: string;

    @OneToMany(() => DiaHorario,(dia_horario) => dia_horario.idDia)
    dia_horarios: DiaHorario[];

    @DeleteDateColumn()
    deletedAt: Date;
}
