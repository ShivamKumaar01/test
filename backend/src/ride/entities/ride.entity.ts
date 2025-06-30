import { Bus } from "src/bus/entities/bus.entity";
import { Reservation } from "src/reservation/entities/reservation.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Ride {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar" })
    source: string

    @Column({ type: "varchar" })
    destination: string



    @Column({ type: "varchar" })
    arrival: string

    @Column({ type: "varchar" })
    departure: string

    @Column()
    price: number


    @Column()
    location: string

    @Column({nullable:true})
    availableSeat:number


    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(()=>Bus,(bus)=>bus.rides)
    bus:Bus

    @OneToMany(()=>Reservation,(reservation)=>reservation.ride)
    reservations:Reservation[]


}
