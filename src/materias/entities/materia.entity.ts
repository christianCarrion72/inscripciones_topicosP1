import { Nivel } from "src/nivels/entities/nivel.entity";
import { Column, DeleteDateColumn, Entity, ManyToOne } from "typeorm";

@Entity()
export class Materia {

    @Column({primary: true, generated: true})
    id: number;

    @Column()
    nombre: string;

    @Column()
    codigo: string;

    @ManyToOne(() => Nivel, (nivel) => nivel.id,{
        eager: true,
    })
    idNivel: Nivel;

    @DeleteDateColumn()
    deletedAt: Date;
}
