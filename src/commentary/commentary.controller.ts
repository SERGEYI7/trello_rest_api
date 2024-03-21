import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentaryService } from './commentary.service';
import { CreateCommentaryDto } from './dto/create-commentary.dto';
import { UpdateCommentaryDto } from './dto/update-commentary.dto';

@Controller('column/:columnId/card/:cardId/commentary')
export class CommentaryController {
  constructor(private readonly commentaryService: CommentaryService) {}

  @Post()
  create(@Body() createCommentaryDto: CreateCommentaryDto, @Param('columnId') columnId: number, @Param('cardId') cardId: number) {
    return this.commentaryService.create(createCommentaryDto, columnId, cardId);
  }

  @Get()
  findAll(@Param('columnId') columnId: number, @Param('cardId') cardId: number) {
    return this.commentaryService.findAll(columnId, cardId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentaryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentaryDto: UpdateCommentaryDto) {
    return this.commentaryService.update(+id, updateCommentaryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentaryService.remove(+id);
  }
}
