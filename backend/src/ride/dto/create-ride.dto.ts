import { IsInt, IsString } from "class-validator";

export class CreateRideDto {
    @IsString()
    source: string

    @IsString()
    arrival: string

    @IsString()
    departure: string

    @IsString()
    location: string

    @IsString()
    destination: string

    @IsInt()
    price: number

    @IsInt()
    busId: number

    @IsInt()
    seat:number


}
