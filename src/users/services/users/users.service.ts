import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm"
import { User } from 'src/typeorm/user.entity';
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

    async createUser(createUserDto: CreateUserDto) {
        const user = await this.userRepository.findOne({where : {username: createUserDto.username}})
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
