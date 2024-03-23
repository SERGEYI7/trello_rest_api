import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Roles } from 'src/auth/roles.decorator'; 

@Controller('users/:userId/column/:columnId/card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Roles(["card"])
  @Post()
  async create(@Body() createCardDto: CreateCardDto, @Param('columnId') columnId: number) {
    return this.cardService.create(createCardDto, columnId);
  }

  @Get()
  findAll(@Param('userId') userId: number, @Param('columnId') columnId: number) {
    return this.cardService.findAll(userId, columnId);
  }

  @Get(':id')
  findOne(@Param('userId') userId: number, @Param('columnId') columnId: number, @Param('id') id: number) {
    return this.cardService.findOne(userId, columnId, +id);
  }

  @Roles(["card"])
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardService.update(+id, updateCardDto);
  }

  @Roles(["card"])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardService.remove(+id);
  }
}
