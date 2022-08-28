import { Body, Controller, Post } from '@nestjs/common';
import { TripsService } from '../../services/trips/trips.service';
import { CreateTripDto } from '../../../trips/dto/trips.dtos';

@Controller('trips')
export class TripsController {
  constructor(private tripService: TripsService) {}

  @Post('create')
  createTrip(@Body() createTripDto: CreateTripDto) {
    return this.tripService.createTrip(createTripDto);
  }
}
