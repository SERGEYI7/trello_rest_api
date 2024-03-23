import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
    constructor (
        private usersService: UsersService,
        private jwrService: JwtService
    ) {}

    async signIn(userEmail: string, pass: string): Promise<any> {
        const user = await this.usersService.findUserByEmail(userEmail)
        if (user?.password !== pass) {
            throw new UnauthorizedException
        }

        const payload = {sub: user.id, username: user.email}

        return {
            access_token: await this.jwrService.signAsync(payload)
        }
    }
}
