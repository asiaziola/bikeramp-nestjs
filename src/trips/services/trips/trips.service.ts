import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { CreateTripDto } from '../../dto/trips.dtos';
import { Trip } from '../../../typeorm';
import { createQueryBuilder, DataSource, Repository } from 'typeorm';
import { MapsService } from '../../../maps/services/maps/maps.service';

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip) private readonly tripRepository: Repository<Trip>,
    private readonly mapsService: MapsService,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async createTrip(createTripDto: CreateTripDto) {
    const distance = await this.mapsService.calculateDistance(
      createTripDto.start_address,
      createTripDto.destination_address,
    );

    const trip = {
      ...createTripDto,
      distanceMeters: distance.value,
    };
    const newTrip = this.tripRepository.create(trip);
    return this.tripRepository.save(newTrip);
  }

  async getTrips() {
    return await this.dataSource
      .getRepository(Trip)
      .createQueryBuilder('trip')
      .orderBy('trip_date', 'DESC')
      .execute();
  }
}
