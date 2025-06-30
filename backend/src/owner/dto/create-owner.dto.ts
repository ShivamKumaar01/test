
import { IsArray, IsEmail, IsEnum, IsInt, IsOptional, IsString } from "class-validator";
export class CreateOwnerDto {
    @IsString()
    name: string

    @IsString()
    password: string

    @IsEmail()
    email: string



}
