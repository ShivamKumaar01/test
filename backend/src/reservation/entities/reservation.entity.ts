import { Ride } from "src/ride/entities/ride.entity";
import { User } from "src/user/entities/user.entity";
import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Reservation {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Ride, (ride) => ride.reservations)
    ride: Ride

    @ManyToOne(() => User, (user) => user.reservations)
    user: User

    @CreateDateColumn()
    createdAt: Date


}
