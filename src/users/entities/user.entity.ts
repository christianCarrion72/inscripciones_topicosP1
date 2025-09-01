import { Column, CreateDateColumn, DeleteDateColumn, Entity, UpdateDateColumn } from "typeorm";

@Entity()
export class User {

    @Column({ primary: true, generated: true })
    id: number;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({nullable: false})
    contraseña: string;

    @Column({ default: 'user' })
    rol: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;
}
