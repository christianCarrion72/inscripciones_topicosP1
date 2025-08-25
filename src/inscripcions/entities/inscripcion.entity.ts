import { Column, DeleteDateColumn, Entity } from "typeorm";

@Entity()
export class Inscripcion {
    
    @Column({ primary: true, generated: true})
    id: number;

    @Column()
    fechaInscripcion: Date;

    @Column()
    idEstudiante: number;
    
    @DeleteDateColumn()
    deletedAt: Date;
}
