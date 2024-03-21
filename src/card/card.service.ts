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
    newCard.column = await this.columnRepository.findOneBy({id: 1})
    const saveCard = this.cardRepository.save(newCard)
    return saveCard

    return 'This action adds a new card';
  }

  findAll(columnId: number) {
    return this.cardRepository.find({relations: {column: true}, where: {column: {id: columnId}}});
  }

  findOne(id: number) {
    return this.cardRepository.findOneBy({id});
  }

  update(id: number, updateCardDto: UpdateCardDto) {
    return `This action updates a #${id} card`;
  }

  remove(id: number) {
    return `This action removes a #${id} card`;
  }
}
