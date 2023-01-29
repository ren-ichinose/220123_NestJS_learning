import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      // secret: 'secretkey123',
      signOptions: {
        expiresIn: 3600
      }
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy,JwtAuthGuard],
  exports: [JwtStrategy,JwtAuthGuard],
})
export class AuthModule {}
