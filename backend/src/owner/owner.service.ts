import { ConflictException, Injectable } from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Owner } from './entities/owner.entity';
import * as bcrypt from 'bcrypt';
import { LoginOwnerDto } from './dto/login-owner.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class OwnerService {
  constructor(@InjectRepository(Owner) private readonly ownerRepository: Repository<Owner>, private jwtService: JwtService) { }
  async create(createOwnerDto: CreateOwnerDto) {
    const owner = new Owner()
    owner.name = createOwnerDto.name
    owner.email = createOwnerDto.email
    const password = createOwnerDto.password
    const hashPassword = await bcrypt.hash(password, 10);
    owner.password = hashPassword
    await this.ownerRepository.save(owner)

    return { message: "owner registered successfully" };
  }

  // async Login(loginOwnerDto:LoginOwnerDto){


  // }


  async login(loginOwnerDto: LoginOwnerDto) {
    const user = await this.ownerRepository.findOne({ where: { email: loginOwnerDto.email } })
    if (!user) {
      throw new ConflictException("owner with this email is not exist")
    }
    const isValidPassword = await bcrypt.compare(loginOwnerDto.password, user.password);
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
