import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MapsService } from '../../../maps/services/maps/maps.service';
import { Trip } from '../../../typeorm';
import { TripsService } from './trips.service';

describe('TripsService', () => {
  let service: TripsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TripsService,
        MapsService,
        {
          provide: getRepositoryToken(Trip),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<TripsService>(TripsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
