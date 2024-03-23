import { Injectable } from '@nestjs/common';
import { CreateCommentaryDto } from './dto/create-commentary.dto';
import { UpdateCommentaryDto } from './dto/update-commentary.dto';
import { Card } from 'src/card/entities/card.entity';
import { Commentary } from './entities/commentary.entity';
import { ColumnEntity } from 'src/column/entities/column.entity';
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Reflector } from '@nestjs/core';

@Injectable(
)
export class CommentaryService {
  constructor (
    @InjectRepository(Commentary) private readonly commentaryRepository: Repository<Commentary>,
    @InjectRepository(ColumnEntity) private readonly columnRepository: Repository<ColumnEntity>,
    @InjectRepository(Card) private readonly cardRepository: Repository<Card>,
    private reflector: Reflector
  ) {}

  async create(createCommentaryDto: CreateCommentaryDto, columnId: number, cardId: number) {
    const newCommentary = this.commentaryRepository.create(createCommentaryDto)
    newCommentary.card = await this.cardRepository.findOneBy({id: cardId})
    const saveCommentary = await this.commentaryRepository.save(newCommentary)
    return {"id": saveCommentary.id, "text": saveCommentary.text};
  }

  async findAll(userId: number, columnId: number, cardId: number) {
    const result = await this.commentaryRepository.find({select: {id: true, text: true}, 
      where: {card: {id: cardId, column: {id: columnId, user: {id: userId}}}}}
      )
    return result
  }

  async findOne(userId: number, columnId: number, cardId: number, commentaryId: number) {
    const result = await this.commentaryRepository.find({select: {id: true, text: true}, 
      where: {id: commentaryId, card: {id: cardId, column: {id: columnId, user: {id: userId}}}}}
      )
    return result[0]
  }

  async update(id: number, updateCommentaryDto: UpdateCommentaryDto) {
    updateCommentaryDto["id"] = id
    return await this.commentaryRepository.save(updateCommentaryDto)
  }

  remove(id: number) {
    this.commentaryRepository.delete(id)
    return {"result": "deletion successful"}
  }
}
