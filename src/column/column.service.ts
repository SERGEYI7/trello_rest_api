import { Injectable, HttpException, HttpStatus, ExecutionContext } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColumnEntity } from './entities/column.entity'
import { User } from '../users/entities/user.entity'
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { Repository } from 'typeorm'

@Injectable()
export class ColumnService {
  constructor (
    @InjectRepository(ColumnEntity) private readonly columnRepository: Repository<ColumnEntity>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createColumnDto: CreateColumnDto, request: Request) {
    const userId = request["user"]['sub']
    const newColumn = this.columnRepository.create(createColumnDto)
    newColumn.user = await this.userRepository.findOneBy({id: userId})
    const saveColumn = await this.columnRepository.save(newColumn)
    return {"id": saveColumn.id, "name": saveColumn.name};
  }

  async findAll(user_id: number) {
    return await this.columnRepository.find({relations: ["cards", "cards.commentaries"], where: {user: {id: user_id}}});
  }

  findOne(id: number) {
    const column = this.columnRepository.findOneBy({id: id})
    return column;
  }

  async update(id: number, updateColumnDto: UpdateColumnDto) {
    updateColumnDto["id"] = id 
    return await this.columnRepository.save(updateColumnDto)
    }

  async remove(id: number) {
    await this.columnRepository.delete(id)
    return {"result": "deletion successful"}
  }
}
