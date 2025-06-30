import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RideService } from './ride.service';
import { CreateRideDto } from './dto/create-ride.dto';
import { UpdateRideDto } from './dto/update-ride.dto';

@Controller('ride')
export class RideController {
  constructor(private readonly rideService: RideService) {}

  @Post()
  create(@Body() createRideDto: CreateRideDto) {
    return this.rideService.create(createRideDto);
  }

  @Get()
  findAll(
    @Query('source') source?: string,
    @Query('destination') destination?: string,
    // @Query('destination') destination?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string
  ) {
    return this.rideService.findAll({source, destination,page,limit});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rideService.findOne(+id);
  }
  // @Get('/all')
  // findAllRide(){
  //   return this.rideService.findAllRide()
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRideDto: UpdateRideDto) {
    return this.rideService.update(+id, updateRideDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rideService.remove(+id);
  }
}
