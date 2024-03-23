import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './constants'
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard'; 
import { RolesGuard } from './roles.guard';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity'; 
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {expiresIn: "60h"}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
   {
    provide: APP_GUARD,
    useClass: RolesGuard,
   },
  UsersService],
  exports: [AuthService]
})
export class AuthModule {}
