import { GrupoMateria } from "src/grupo_materias/entities/grupo_materia.entity";
import { Nivel } from "src/nivels/entities/nivel.entity";
import { PlanEstudio } from "src/plan_estudios/entities/plan_estudio.entity";
import { Prerequisito } from "src/prerequisitos/entities/prerequisito.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, UpdateDateColumn } from "typeorm";

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

    @ManyToOne(() => PlanEstudio, (plan_estudio) => plan_estudio.id, {
        eager: true,
        nullable: true
    })
    idPlan: PlanEstudio

    @OneToMany(() => Prerequisito, (prerequisito) => prerequisito.idMateria )
    materias: Prerequisito[];

    @OneToMany(() => Prerequisito, (prerequisito) => prerequisito.idPrerequisito )
    prerequisitos: Prerequisito[];

    @OneToMany(() => GrupoMateria, (grupo_materia) => grupo_materia.idMateria )
    grupo_materias: GrupoMateria[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
