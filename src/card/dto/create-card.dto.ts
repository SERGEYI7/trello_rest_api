import {IsNotEmpty, MinLength } from "class-validator"

export class CreateCardDto {
    @MinLength(3)
    name: string

}
