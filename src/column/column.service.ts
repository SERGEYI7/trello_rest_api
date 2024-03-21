import { Injectable } from '@nestjs/common';
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

  async create(createColumnDto: CreateColumnDto, userId: number) {
    const newColumn = this.columnRepository.create(createColumnDto)
    newColumn.user = await this.userRepository.findOneBy({id: userId})
    const saveColumn = this.columnRepository.save(newColumn)
    return saveColumn;
  }

  async findAll(user_id: number) {
    return await this.columnRepository.find({relations: ["cards", "cards.commentaries"], where: {user: {id: user_id}}});
  }

  findOne(id: number) {
    const user_id = 1
    const newColumn = this.columnRepository.findOneBy({id: id, user: {id: user_id}})
    return ;
  }

  update(id: number, updateColumnDto: UpdateColumnDto) {
    return `This action updates a #${id} column`;
  }

  async remove(id: number) {
    return await this.columnRepository.delete(id)
  }
}
