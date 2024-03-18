import { Controller, Body, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/users.dtos';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    getUsers() {
        console.log("Ты в гете или не в гете")
        return this.userService.getUsers()
    }

    @Get("id/:id")
    findUsersById(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findUserById(id)
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    createUsers(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto)
    }

}
