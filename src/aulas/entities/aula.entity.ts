import { Horario } from "src/horarios/entities/horario.entity";
import { Modulo } from "src/modulos/entities/modulo.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, UpdateDateColumn } from "typeorm";

@Entity()
export class Aula {

    @Column({ primary: true, generated: true})
    id: number;

    @Column()
    numero: number;

    @ManyToOne(() =>Modulo, (modulo) => modulo.id,{
        eager: true,
        nullable: false,
    })
    idModulo: Modulo;
    
    @OneToMany(() => Horario,(horario) => horario.idAula)
    horarios: Horario[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
