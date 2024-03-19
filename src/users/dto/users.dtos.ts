import { IsEmail, IsNotEmpty, MinLength, IsNumber } from "class-validator"
import { ColumnEntity } from "src/column/entities/column.entity"

export class CreateUserDto {
    @IsNotEmpty()
    @MinLength(8)
    password: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    columns: ColumnEntity[]
}
