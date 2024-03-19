import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm"
import { User } from './entities/user.entity';
import { Repository, DataSource } from 'typeorm';
import { CreateUserDto } from './dto/users.dtos'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {}

    getUsers() {
        return this.userRepository.find()
    }

    async createUser(createUserDto: CreateUserDto) {
        const user = await this.userRepository.findOne({where : {email: createUserDto.email}})
        if (!user) {
            const newUser = this.userRepository.create(createUserDto)
            this.userRepository.save(newUser)
            if (newUser) {
                return {result: "Создан новый пользователь"}
            }
        }
        else {
            return {result : 
                {
                    id :user.id
                }
            }
        }

    }

    findUserById(id: number) {
        return this.userRepository.findOneBy({id})
    }

    find 
}
