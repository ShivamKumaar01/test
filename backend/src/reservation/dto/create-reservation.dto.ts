import { IsInt } from "class-validator";

export class CreateReservationDto {
    @IsInt()
    rideId:number

    @IsInt()
    userId:number
}
