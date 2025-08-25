import { Column, DeleteDateColumn, Entity } from "typeorm";

@Entity()
export class Estudiante {

    @Column({ primary: true, generated: true})
    id: number;

    @Column()
    nombre: string;

    @Column()
    ci: number;

    @Column()
    registro: number;

    @Column()
    telefono: number;

    @Column()
    direccion: string;

    @Column()
    tituloBachiller: number;

    @Column()
    idPlan: number;

    @DeleteDateColumn()
    deletedAt: Date;

}
