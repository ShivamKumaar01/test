import { Reservation } from "src/reservation/entities/reservation.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar" })
    name: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @Column({ type: 'enum', enum: ['m', 'f', 'u'] })
    gender: string;

    @CreateDateColumn()
    createdAt: Date

    @OneToMany(()=>Reservation,(reservation)=>reservation.user)
    reservations:Reservation[]

}
