import { Owner } from "src/owner/entities/owner.entity";
import { Ride } from "src/ride/entities/ride.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Bus {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar" })
    color: string

    @Column({ unique: true })
    regno: string

    @Column()
    seat: number

    @Column({ type: 'enum', enum: ['ac', 'nonAc', 'volvo'] })
    busType: string;

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(()=>Owner,(owner)=>owner.buses)
    owner:Owner

    @OneToMany(()=>Ride,(ride)=>ride.bus)
    rides:Ride[]
}
