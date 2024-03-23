import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CommentaryService } from './commentary.service';
import { CreateCommentaryDto } from './dto/create-commentary.dto';
import { UpdateCommentaryDto } from './dto/update-commentary.dto';
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('users/:userId/column/:columnId/card/:cardId/commentary')
export class CommentaryController {
  constructor(private readonly commentaryService: CommentaryService) {}

  @Roles(["commentary"])
  @Post()
  create(@Body() createCommentaryDto: CreateCommentaryDto, @Param('columnId') columnId: number, @Param('cardId') cardId: number) {
    return this.commentaryService.create(createCommentaryDto, columnId, cardId);
  }

  @Get()
  findAll(@Param('userId') userId: number, @Param('columnId') columnId: number, @Param('cardId') cardId: number) {
    return this.commentaryService.findAll(userId, columnId, cardId);
  }

  @Get(':id')
  findOne(@Param('userId') userId: number, @Param('columnId') columnId: number, @Param('cardId') cardId: number, @Param('id') id: string) {
    return this.commentaryService.findOne(userId, columnId, cardId, +id);
  }

  @Roles(["commentary"])
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentaryDto: UpdateCommentaryDto) {
    return this.commentaryService.update(+id, updateCommentaryDto);
  }

  @Roles(["commentary"])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentaryService.remove(+id);
  }
}
