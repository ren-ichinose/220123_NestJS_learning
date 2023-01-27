import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { AuthService } from './auth.service';
import { CreatUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authServeice: AuthService){}

    @Post('signup')
    async signup(@Body() creatUserDto: CreatUserDto): Promise<User>{
        return await this.authServeice.signUp(creatUserDto);
    }
}
