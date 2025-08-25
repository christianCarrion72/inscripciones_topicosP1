import { Column, DeleteDateColumn, Entity } from "typeorm";

@Entity()
export class Prerequisito {

    @Column({ primary: true, generated: true})
    id: number;

    @Column()
    idMateria: number;

    @Column()
    idPrerequisito: number;

    @DeleteDateColumn()
    deletedAt: Date;

}
