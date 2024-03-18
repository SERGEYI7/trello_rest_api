import { Controller, Body, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/users.dtos';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    getUsers() {
        console.log("Ты в гете или не в гете3")
        return this.userService.getUsers()
    }

    @Get(":id")
    findUsersById(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findUserById(id)
    }

    @HttpCode(HttpStatus.OK)
    @Post()
    @UsePipes(ValidationPipe)
    createUsers(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto)
    }

}
