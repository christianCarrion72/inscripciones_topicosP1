import { BoletaHorario } from "src/boleta_horarios/entities/boleta_horario.entity";
import { Docente } from "src/docentes/entities/docente.entity";
import { Grupo } from "src/grupos/entities/grupo.entity";
import { Materia } from "src/materias/entities/materia.entity";
import { Periodo } from "src/periodos/entities/periodo.entity";
import { Column, DeleteDateColumn, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class GrupoMateria {

    @Column({ primary: true, generated: true})
    id: number;

    @Column()
    cupos: number;

    @ManyToOne(() =>Materia, (materia) => materia.id,{ eager: true, nullable: true })
    idMateria: Materia;

    @ManyToOne(() =>Docente, (docente) => docente.id,{ eager: true, nullable: true })
    idDocente: Docente;

    @ManyToOne(() => Grupo, (grupo) => grupo.id, { eager: true, nullable: true })
    idGrupo: Grupo;

    @OneToMany(() => Periodo, (periodo) => periodo.idGrupoMateria)
    periodos: Periodo[];

    @OneToMany(() => BoletaHorario, (boleta_horario) =>boleta_horario.idGrupoMateria)
    boletaHorarios: BoletaHorario[];

    @DeleteDateColumn()
    deletedAt: Date;

}
