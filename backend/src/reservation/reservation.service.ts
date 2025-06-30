import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { RideService } from 'src/ride/ride.service';
import { UpdateRideDto } from 'src/ride/dto/update-ride.dto';
import { Ride } from 'src/ride/entities/ride.entity';

@Injectable()
export class ReservationService {
  constructor(@InjectRepository(Reservation) private readonly reservationRepository: Repository<Reservation>,
    private readonly rideService: RideService,
    private readonly dataSource: DataSource

  ) { }

  async create(dto: CreateReservationDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const ride = await queryRunner.manager.findOne(Ride, {
        where: { id: dto.rideId },
      });

      if (!ride) {
        throw new NotFoundException('Ride not found');
      }
      if (ride.availableSeat <= 0) {
        throw new BadRequestException("ther is no seat left in this bus ");
      }
      ride.availableSeat = ride.availableSeat - 1;
      await queryRunner.manager.save(ride);
      const reservation = new Reservation();
      reservation.ride = { id: dto.rideId } as any
      reservation.user = { id: dto.userId } as any

      await queryRunner.manager.save(reservation);
      await queryRunner.commitTransaction();
      return reservation;

    } catch (err) {

      await queryRunner.rollbackTransaction();
      throw err;
    } finally {

      await queryRunner.release();
    }
  }

  findAll() {
    return `This action returns all reservation`;
  }

  async findOne(id: number) {
    const data = await this.reservationRepository.findOne({ where: { user: { id: id } }, relations: ['ride', 'user'] })
    return data
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return `This action updates a #${id} reservation`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservation`;
  }
}
