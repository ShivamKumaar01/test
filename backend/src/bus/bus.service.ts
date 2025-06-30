import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bus } from './entities/bus.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BusService {
  constructor(@InjectRepository(Bus) private readonly busRepository: Repository<Bus>) { }
  async create(createBusDto: CreateBusDto) {
    const bus=new Bus()
    bus.color=createBusDto.color
    bus.regno=createBusDto.regno
    bus.seat=createBusDto.seat
    bus.busType=createBusDto.busType
    bus.owner={id:createBusDto.ownerId}as any
    await this.busRepository.save(bus)

    return {message:"bus registerd successfully",bus};
  }


  async findSeatInBus(id:number){
    const bus= await this.busRepository.findOne({where:{id:id}})
    if(!bus){
      throw new NotFoundException("bus with this id is not found")
    }
    return bus.seat
  }

  findAll() {
    return `This action returns all bus`;
  }

  async findOne(id: number) {
    const busDetails=await this.busRepository.findOne({where:{id:id},relations:['rides']})
    return busDetails;
  }

  update(id: number, updateBusDto: UpdateBusDto) {
    return `This action updates a #${id} bus`;
  }

  remove(id: number) {
    return `This action removes a #${id} bus`;
  }
}
