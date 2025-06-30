import { Controller, Get, Post, Body, Patch, Param, Delete ,Res} from '@nestjs/common';
import { OwnerService } from './owner.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { LoginOwnerDto } from './dto/login-owner.dto';
import { Response } from 'express'

@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Post('signup')
  create(@Body() createOwnerDto: CreateOwnerDto) {
    return this.ownerService.create(createOwnerDto);
  }

    @Post('/login')
    async login(@Body() loginOwnerDto: LoginOwnerDto, @Res({ passthrough: true }) res: Response) {
      const tokenData=await this.ownerService.login(loginOwnerDto);
  
       res.cookie('token', tokenData.details, {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
      });
  
      return {
        message: 'Logged in successfully',
        name: tokenData.user.name,
        email: tokenData.user.email,
        token:tokenData.details
      };
    }
  
}
