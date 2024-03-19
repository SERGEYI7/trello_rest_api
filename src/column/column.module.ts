import { Module } from '@nestjs/common';
import { ColumnService } from './column.service';
import { ColumnController } from './column.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnEntity } from './entities/column.entity'


@Module({
  controllers: [ColumnController],
  providers: [ColumnService],
  imports: [TypeOrmModule.forFeature([ColumnEntity])],
})
export class ColumnModule {}
