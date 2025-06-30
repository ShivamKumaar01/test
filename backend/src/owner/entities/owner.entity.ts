import { Bus } from "src/bus/entities/bus.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Owner {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar" })
    name: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string


    @CreateDateColumn()
    createdAt: Date

    @OneToMany(()=>Bus,(bus)=>bus.owner)
    buses:Bus[]
}
