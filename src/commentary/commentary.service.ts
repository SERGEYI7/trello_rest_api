import { Injectable } from '@nestjs/common';
import { CreateCommentaryDto } from './dto/create-commentary.dto';
import { UpdateCommentaryDto } from './dto/update-commentary.dto';
import { Card } from 'src/card/entities/card.entity';
import { Commentary } from './entities/commentary.entity';
import { ColumnEntity } from 'src/column/entities/column.entity';
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable(
)
export class CommentaryService {
  constructor (
    @InjectRepository(Commentary) private readonly commentaryRepository: Repository<Commentary>,
    @InjectRepository(ColumnEntity) private readonly columnRepository: Repository<ColumnEntity>,
    @InjectRepository(Card) private readonly cardRepository: Repository<Card>,
  ) {}

  async create(createCommentaryDto: CreateCommentaryDto, columnId: number, cardId: number) {
    const newCommentary = this.commentaryRepository.create(createCommentaryDto)
    newCommentary.card = await this.cardRepository.findOneBy({id: cardId})
    console.log(newCommentary)
    const saveCommentary = this.commentaryRepository.save(newCommentary)
    return saveCommentary;
  }

  findAll(columnId: number, cardId: number) {
    this.commentaryRepository.find({relations: ["card", "card.column"], where: {}})
    return this.commentaryRepository.find({relations: ["card", "card.column"], where: {card: {id: cardId}}});
  }

  findOne(id: number) {
    return `This action returns a #${id} commentary`;
  }

  update(id: number, updateCommentaryDto: UpdateCommentaryDto) {
    return `This action updates a #${id} commentary`;
  }

  remove(id: number) {
    return `This action removes a #${id} commentary`;
  }
}
