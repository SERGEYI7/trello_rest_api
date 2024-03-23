import {IsNotEmpty, MinLength, IsEmail, IsStrongPassword } from "class-validator"

export class AuthDto {
    @IsEmail()
    email: string

    @IsStrongPassword()
    password: string
}