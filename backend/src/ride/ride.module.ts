import { Module } from '@nestjs/common';
import { RideService } from './ride.service';
import { RideController } from './ride.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ride } from './entities/ride.entity';
import { BusModule } from 'src/bus/bus.module';


@Module({
  imports:[TypeOrmModule.forFeature([Ride]),BusModule],
  controllers: [RideController],
  providers: [RideService],
  exports:[RideService]
})
export class RideModule {}
