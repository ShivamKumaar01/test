import { IsArray, IsEmail, IsEnum, IsInt, IsOptional, IsString } from "class-validator";
export class LoginOwnerDto {
   

    @IsString()
    password: string

    @IsEmail()
    email: string



}