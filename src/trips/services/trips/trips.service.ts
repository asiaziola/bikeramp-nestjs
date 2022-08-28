import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTripDto } from '../../dto/trips.dtos';
import { Trip } from '../../../typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip) private readonly tripRepository: Repository<Trip>,
  ) {}

  async createTrip(createTripDto: CreateTripDto) {
    const newTrip = this.tripRepository.create(createTripDto);
    return this.tripRepository.save(newTrip);
  }
}
