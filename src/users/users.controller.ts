import { 
    Controller, 
    Body, 
    Get, 
    Param, 
    ParseIntPipe, 
    Post, 
    Delete,
    UsePipes, 
    ValidationPipe, 
    HttpCode, 
    HttpStatus, 
    UseInterceptors, 
    ClassSerializerInterceptor 
} from '@nestjs/common';

import { CreateUserDto } from 'src/users/dto/users.dtos';
import { UsersService } from './users.service';
import { Public } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}


    // @Public()
    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    async getUsers() {
        console.log("Ты в гете или не в гете3")
        return await this.userService.getUsers()
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

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.deleteUser(id)
    }

}
