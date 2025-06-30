import { IsEnum, IsInt, IsString } from "class-validator";

export class CreateBusDto {
    @IsString()
    color: string

    @IsString()
    regno: string

    @IsInt()
    seat: number

    @IsEnum(['ac', 'nonAc', 'volvo'], { message: 'bus type must be ac,nonac and volvo' })
    busType: string;

    @IsInt()
    ownerId:number
}
