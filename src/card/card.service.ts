import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { ColumnEntity } from 'src/column/entities/column.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CardService
 {
  constructor (
    @InjectRepository(Card) private readonly cardRepository: Repository<Card>,
    @InjectRepository(ColumnEntity) private readonly columnRepository: Repository<ColumnEntity>
  ) {}

  async create(createCardDto: CreateCardDto, columnId: number) {
    const newCard = this.cardRepository.create(createCardDto)
    newCard.column = await this.columnRepository.findOneBy({id: columnId})
    const saveCard = await this.cardRepository.save(newCard)
    return {"id": saveCard.id, "name": saveCard.name}
  }

  findAll(userId: number, columnId: number) {
    return this.cardRepository.find({where: {column: {id: columnId, user: {id: userId}}}});
  }

  async findOne(userId: number, columnId: number, id: number) {
    const relala = await this.cardRepository.findOne({where: {id: id, column: {id: columnId, user: {id: userId}}}})
    return relala;
  }

  async update(id: number, updateCardDto: UpdateCardDto) {
    updateCardDto["id"] = id 
    return await this.cardRepository.save(updateCardDto)
  }

  remove(id: number) {
    this.cardRepository.delete(id)
    return {"result": "deletion successful"}
  }
}
