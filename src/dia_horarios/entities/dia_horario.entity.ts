import { Dia } from "src/dias/entities/dia.entity";
import { Horario } from "src/horarios/entities/horario.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, UpdateDateColumn } from "typeorm";

@Entity()
export class DiaHorario {

    @Column({ primary: true, generated: true})
    id: number;

    @ManyToOne(() => Dia, (dia) => dia.id,{eager: true, nullable: true})
    idDia: Dia;

    @ManyToOne(() => Horario, (horario) => horario.id,{ eager: true,nullable: true})
    idHorario: Horario;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
