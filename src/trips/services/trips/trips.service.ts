import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTripDto } from '../../dto/trips.dtos';
import { Trip } from '../../../typeorm';
import { Repository } from 'typeorm';
import { MapsService } from '../../../maps/services/maps/maps.service';

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip) private readonly tripRepository: Repository<Trip>,
    private readonly mapsService: MapsService,
  ) {}

  async createTrip(createTripDto: CreateTripDto) {
    const distance = await this.mapsService.calculateDistance(
      createTripDto.startAddress,
      createTripDto.destinationAddress,
    );

    const trip = {
      ...createTripDto,
      distanceMeters: distance.value,
    };
    const newTrip = this.tripRepository.create(trip);
    return this.tripRepository.save(newTrip);
  }
}
