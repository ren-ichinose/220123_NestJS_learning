import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { CreatUserDto } from './dto/create-user.dto';
import { CredentialsDto } from './dto/credentials.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService,
        ){}

    async signUp(creatUserDto: CreatUserDto): Promise<User>{
        return await this.userRepository.creatUser(creatUserDto);
    }

    async signIn(credentialslDto: CredentialsDto): Promise<{ accessToken: string }>{
        const { username, password} = credentialslDto;
        const user = await this.userRepository.findOne({ username });
        if( user && (await bcrypt.compare(password, user.password))) {
            const payload = { id: user.id, username: user.username};
            const accessToken = await this.jwtService.sign(payload);
            return { accessToken };
        }
        throw new UnauthorizedException(
            'ユーザー名またはパスワードを確認してください',
        )
    }
}
CredentialsDto