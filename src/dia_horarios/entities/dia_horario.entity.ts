import { Dia } from "src/dias/entities/dia.entity";
import { Horario } from "src/horarios/entities/horario.entity";
import { Column, DeleteDateColumn, Entity, ManyToOne } from "typeorm";

@Entity()
export class DiaHorario {

    @Column({ primary: true, generated: true})
    id: number;

    @ManyToOne(() => Dia, (dia) => dia.id,{
        eager: true,
        nullable: false
    })
    idDia: Dia;

    @ManyToOne(() => Horario, (horario) => horario.id,{
        eager: true,
        nullable: false
    })
    idHorario: Horario;

    @DeleteDateColumn()
    deletedAt: Date;
}
