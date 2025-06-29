import { Controller, Get, Post, Body, Patch, Param, Delete,Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import {  LoginDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Response } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  create(@Body() createAuthDto: CreateUserDto) {
    return this.authService.create(createAuthDto);
  }


  @Post('/login')
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const tokenData=await this.authService.login(loginDto);

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
