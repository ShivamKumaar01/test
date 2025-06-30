import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './database/data-source';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { OwnerModule } from './owner/owner.module';
import { BusModule } from './bus/bus.module';
import { RideModule } from './ride/ride.module';
// import { SeatModule } from './seat/seat.module';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource.options), AuthModule, UserModule, OwnerModule, BusModule, RideModule, ReservationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
