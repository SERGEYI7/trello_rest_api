import { Module } from '@nestjs/common';
import { CommentaryService } from './commentary.service';
import { CommentaryController } from './commentary.controller';
import { Commentary } from "src/commentary/entities/commentary.entity"
import { ColumnEntity } from "src/column/entities/column.entity"
import { Card } from "src/card/entities/card.entity"
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [CommentaryController],
  providers: [CommentaryService],
  imports: [
    TypeOrmModule.forFeature([ColumnEntity, Card, Commentary]),

  ],
})
export class CommentaryModule {}
