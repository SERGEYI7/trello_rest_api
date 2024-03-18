import {IsNotEmpty, MinLength } from "class-validator"

export class CreateColumnDto {

    @IsNotEmpty()
    id: number

    @MinLength(3)
    name: string
}
