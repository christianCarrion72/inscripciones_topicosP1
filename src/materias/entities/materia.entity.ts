import { Nivel } from "src/nivels/entities/nivel.entity";
import { Prerequisito } from "src/prerequisitos/entities/prerequisito.entity";
import { Column, DeleteDateColumn, Entity, ManyToOne, OneToMany } from "typeorm";

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
        nullable: true
    })
    idNivel: Nivel;

    @OneToMany(() => Prerequisito, (prerequisito) => prerequisito.idMateria )
    materias: Prerequisito[];

    @OneToMany(() => Prerequisito, (prerequisito) => prerequisito.idPrerequisito )
    prerequisitos: Prerequisito[];

    @DeleteDateColumn()
    deletedAt: Date;
}
