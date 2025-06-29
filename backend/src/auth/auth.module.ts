import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
     PassportModule,
    JwtModule.register({
      secret: 'shivamSecret',
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
    providers: [AuthService, JwtStrategy], 
  exports: [JwtModule], 
})
export class AuthModule {}
