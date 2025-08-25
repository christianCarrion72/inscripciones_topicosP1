import { Column, DeleteDateColumn, Entity } from "typeorm";

@Entity()
export class Docente {

    @Column({ primary: true, generated: true})
    id: number;

    @Column()
    ci: number;

    @Column()
    nombre: string;

    @Column()
    direccion: string;

    @Column()
    registro: number;

    @Column()
    especialidad: string;

    @Column()
    telefono: number;

    @DeleteDateColumn()
    deletedAt: Date;
}
