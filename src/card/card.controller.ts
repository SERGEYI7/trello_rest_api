import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Controller('column/:columnId/card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  async create(@Body() createCardDto: CreateCardDto, @Param('columnId') columnId: number) {
    return this.cardService.create(createCardDto, columnId);
  }

  @Get()
  findAll(@Param('columnId') columnId: number) {
    console.log(`Получил айди колонки: ${columnId}`)
    return this.cardService.findAll(columnId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardService.update(+id, updateCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardService.remove(+id);
  }
}
