import { Module } from '@nestjs/common';
import { ColumnService } from './column.service';
import { ColumnController } from './column.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnEntity } from './entities/column.entity'
import { User } from 'src/users/entities/user.entity'; 


@Module({
  controllers: [ColumnController],
  providers: [ColumnService],
  imports: [
    TypeOrmModule.forFeature([ColumnEntity, User]),

  ],
})
export class ColumnModule {}
