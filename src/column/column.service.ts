import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColumnEntity } from './entities/column.entity'
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { Repository } from 'typeorm'

@Injectable()
export class ColumnService {
  constructor (
    @InjectRepository(ColumnEntity) private readonly columnRepository: Repository<ColumnEntity>
  ) {}

  create(createColumnDto: CreateColumnDto) {
    const newColumn = this.columnRepository.create(createColumnDto)
    this.columnRepository.save(newColumn)
    return newColumn;
  }

  findAll() {
    return this.columnRepository.find();
  }

  findOne(id: number) {
    const newColumn = this.columnRepository.findOneBy({id})
    return ;
  }

  update(id: number, updateColumnDto: UpdateColumnDto) {
    return `This action updates a #${id} column`;
  }

  remove(id: number) {
    return `This action removes a #${id} column`;
  }
}
