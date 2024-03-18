import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm"
import { User } from 'src/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../dto/users.dtos'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {}

    getUsers() {
        let primer = this.userRepository.find()
        return primer
    }

    createUser(createUserDto: CreateUserDto) {
        const newUser = this.userRepository.create(createUserDto)
        return this.userRepository.save(newUser)
    }

    findUserById(id: number) {
        return this.userRepository.findOneBy({id})
    }
}
