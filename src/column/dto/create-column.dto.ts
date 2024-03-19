import {IsNotEmpty, MinLength } from "class-validator"

export class CreateColumnDto {
    @MinLength(3)
    name: string
}
