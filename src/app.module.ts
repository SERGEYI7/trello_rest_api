import { AppService } from "./app.service"
import { AppController } from "./app.controller";
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
// import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from "./typeorm/user.entity";
// import entities from "./typeorm"

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'db',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'postgres',
        entities: [User],
        synchronize: true,
    }),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
