import { Aula } from "src/aulas/entities/aula.entity";
import { BoletaHorario } from "src/boleta_horarios/entities/boleta_horario.entity";
import { DiaHorario } from "src/dia_horarios/entities/dia_horario.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, UpdateDateColumn } from "typeorm";

@Entity()
export class Horario {

    @Column({ primary: true, generated: true})
    id: number;

    @Column({ type: 'time' })
    horaInicio: string;

    @Column({ type: 'time' })
    horaFin: string;

    @ManyToOne(() => Aula, (aula) => aula.id,{
        eager: true,
        nullable: false
    })
    idAula: Aula;

    @OneToMany(() => DiaHorario,(dia_horario) => dia_horario.idHorario)
    dia_horarios: DiaHorario[];

    @OneToMany(() => BoletaHorario, (boleta_horario) =>boleta_horario.idHorario)
    boletaHorarios: BoletaHorario[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

}
