import { AppService } from "./app.service"
import { AppController } from "./app.controller";
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from "./users/entities/user.entity";
import { ColumnEntity } from "./column/entities/column.entity";
import { Card } from "./card/entities/card.entity";
import { Commentary } from "./commentary/entities/commentary.entity";
import { CardModule } from './card/card.module';
import { CommentaryModule } from './commentary/commentary.module';
import { ColumnModule } from './column/column.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'db',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'postgres',
        entities: [User, ColumnEntity, Card, Commentary],
        synchronize: true,
    }),
    UsersModule,
    CardModule,
    CommentaryModule,
    ColumnModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
