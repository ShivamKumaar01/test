import { Module } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnerController } from './owner.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [PassportModule,
    JwtModule.register({
      secret: 'shivamSecret',
      signOptions: { expiresIn: '1h' },
    }), TypeOrmModule.forFeature([Owner])],
  controllers: [OwnerController],
  providers: [OwnerService, JwtStrategy],
  exports: [JwtModule],
})
export class OwnerModule { }
