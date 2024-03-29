import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, Request } from '@nestjs/common';
import { ColumnService } from './column.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { Roles } from 'src/auth/roles.decorator'; 

@Controller('users/:userId/column')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Roles(["column"])
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createColumnDto: CreateColumnDto, @Request() request) {
    return this.columnService.create(createColumnDto, request);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll(@Param('userId') userId: number) {
    return this.columnService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.columnService.findOne(+id);
  }

  @Roles(["column"])
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateColumnDto: UpdateColumnDto) {
    return this.columnService.update(+id, updateColumnDto);
  }

  @Roles(["column"])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.columnService.remove(+id);
  }
}
