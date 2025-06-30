import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRideDto } from './dto/create-ride.dto';
import { UpdateRideDto } from './dto/update-ride.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ride } from './entities/ride.entity';
import { ILike, Repository } from 'typeorm';
import { BusModule } from 'src/bus/bus.module';
import { BusService } from 'src/bus/bus.service';

interface Query {
  source: string
  destination: string
  page: number
  limit: number

}

@Injectable()
export class RideService {
  constructor(@InjectRepository(Ride) private readonly rideRepository: Repository<Ride>, private readonly busService: BusService,

  ) { }
  async create(createRideDto: CreateRideDto) {
    const ride = new Ride()
    ride.source = createRideDto.source
    ride.destination = createRideDto.destination
    ride.arrival = createRideDto.arrival
    ride.departure = createRideDto.departure
    ride.price = createRideDto.price
    ride.location = createRideDto.location
    ride.bus = { id: createRideDto.busId } as any
    ride.availableSeat = await this.busService.findSeatInBus(createRideDto.busId)
    await this.rideRepository.save(ride)

    return { message: "ride created successfully" };
  }



  async findAll(query: any) {
    const { source, destination, page = query.page || 1, limit = query.limit || 10 } = query;

    const where: any = {};

    if (source && destination) {
      where.source = ILike(`%${source}%`);
      where.destination = ILike(`%${destination}%`);
    }


    const take = +limit;
    const skip = (+page - 1) * take;

    const [data, total] = await this.rideRepository.findAndCount({
      where,
      take,
      skip,
     
    });

    return {
      data,
      total,
      page: +page,
      limit: take,
      totalPages: Math.ceil(total / take),
    };
  }

  findOne(id: number) {
    return this.rideRepository.findOne({ where: { id: id }, relations: ['bus'] });
  }

  async update(id: number, updateRideDto: UpdateRideDto) {
    return await this.rideRepository.update({ id }, { ...updateRideDto });
  }

  remove(id: number) {
    return `This action removes a #${id} ride`;
  }

  
}
