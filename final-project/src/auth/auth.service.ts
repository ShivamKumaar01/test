import { ConflictException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
// import { LoginUserDto } from './dto/login.dto';
import * as dotenv from 'dotenv';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
dotenv.config();

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService

  ) { }
  async create(createAuthDto: CreateUserDto) {
    const existUser = await this.userRepository.findOne({ where: { email: createAuthDto.email } })
    if (existUser) {
      throw new ConflictException("user with this email is already exist")
    }
    const user = new User()
    user.name = createAuthDto.name
    user.email = createAuthDto.email
    const password = createAuthDto.password
    const hashPassword = await bcrypt.hash(password, 10);
    user.password = hashPassword
    user.gender = createAuthDto.gender
    await this.userRepository.save(user)

    return {message:"user registerd successfully"};
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({ where: { email: loginDto.email } })
    if (!user) {
      throw new ConflictException("user with this email is not exist")
    }
    const isValidPassword = await bcrypt.compare(loginDto.password, user.password);
    if (!isValidPassword) {
      throw new ConflictException("invalid password")
    }
    const payload = { sub: user.id, useremail: user.email };

    const token = this.jwtService.sign(payload, {
      secret: process.env.SECRET,
      expiresIn: '1h'
    });

    return { details: token, user };

  }


}
