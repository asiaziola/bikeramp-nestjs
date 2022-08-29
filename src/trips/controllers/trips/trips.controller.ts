import { Body, Controller, Get, Post } from '@nestjs/common';
import { TripsService } from '../../services/trips/trips.service';
import { CreateTripDto } from '../../../trips/dto/trips.dtos';
import { Trip } from '../../../typeorm';

@Controller('api/trips')
export class TripsController {
  constructor(private tripService: TripsService) {}

  @Post()
  createTrip(@Body() createTripDto: CreateTripDto) {
    return this.tripService.createTrip(createTripDto);
  }

  @Get()
  async getTrips(): Promise<Trip[] | []> {
    return await this.tripService.getTrips();
  }
}
