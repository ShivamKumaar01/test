import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { RideModule } from 'src/ride/ride.module';

@Module({
  imports:[TypeOrmModule.forFeature([Reservation]),RideModule],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
