import { Column, CreateDateColumn, DeleteDateColumn, Entity, UpdateDateColumn } from "typeorm";

@Entity()
export class Detalle {

    @Column({ primary: true, generated: true})
    id: number;

    @Column()
    idInscripcion: number;

    @Column()
    idGrupoMat: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
