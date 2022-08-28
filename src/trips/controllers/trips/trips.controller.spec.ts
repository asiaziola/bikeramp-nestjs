import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Trip } from '../../../typeorm';
import { TripsService } from '../../../trips/services/trips/trips.service';
import { TripsController } from './trips.controller';
import { MapsService } from '../../../maps/services/maps/maps.service';

describe('TripsController', () => {
  let controller: TripsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripsController],
      providers: [
        TripsService,
        MapsService,
        {
          provide: getRepositoryToken(Trip),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<TripsController>(TripsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
