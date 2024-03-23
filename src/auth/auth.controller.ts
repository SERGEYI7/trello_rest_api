import { Controller, Body, Post, Get, HttpCode, HttpStatus, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AuthGuard, Public } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor (
        private authService: AuthService
    ) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post("login")
    signIn(@Body() authDto: AuthDto) {
        return this.authService.signIn(authDto.email, authDto.password)
    }

}
