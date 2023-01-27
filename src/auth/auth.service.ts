import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { CreatUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(private userRepository: UserRepository){}

    async signUp(creatUserDto: CreatUserDto): Promise<User>{
        return await this.userRepository.creatUser(creatUserDto);
    }
}
