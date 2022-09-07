import { Test, TestingModule } from '@nestjs/testing';
import {
  getDataSourceName,
  getDataSourcePrefix,
  getDataSourceToken,
  getRepositoryToken,
} from '@nestjs/typeorm';
import { Trip } from '../typeorm';
import { TripsService } from './services/trips/trips.service';
import { TripsController } from './controllers/trips/trips.controller';
import { MapsService } from '../maps/services/maps/maps.service';

describe('Trips', () => {
  let controller: TripsController;
  let service: TripsService;

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
        {
          provide: getDataSourceName({ type: 'postgres' }),
          useValue: {},
        },
        {
          provide: getDataSourceToken({ type: 'postgres' }),
          useValue: {},
        },
        {
          provide: getDataSourcePrefix({ type: 'postgres' }),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<TripsController>(TripsController);
    service = module.get<TripsService>(TripsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should return array of trips', async () => {
    const expectedResult = [RESULT];
    jest
      .spyOn(service, 'getTrips')
      .mockImplementation(
        () => new Promise((resolve) => resolve(expectedResult)),
      );

    const actualResult = await controller.getTrips();
    expect(service.getTrips).toHaveBeenCalled();
    expect(actualResult).toBe(expectedResult);
    expect(actualResult).toHaveLength(1);
  });

  it('should return empty array if no trips exist', async () => {
    const expectedResult: [] = [];
    jest
      .spyOn(service, 'getTrips')
      .mockImplementation(
        () => new Promise((resolve) => resolve(expectedResult)),
      );

    const actualResult = await controller.getTrips();
    expect(actualResult).toBe(expectedResult);
    expect(actualResult).toHaveLength(0);
  });

  it('should properly create trip', async () => {
    const postRequest = {
      start_address: 'ul. Grzybowska 60, Warszawa, Polska',
      destination_address: 'ul. Stryjeńskich 6, Warszawa, Polska',
      price: 22.3,
      date: new Date(2016),
    };

    jest
      .spyOn(service, 'createTrip')
      .mockImplementation(() => new Promise((resolve) => resolve(RESULT)));

    const actualResult = await controller.createTrip(postRequest);
    expect(service.createTrip).toHaveBeenCalled();
    expect(actualResult).toBe(RESULT);
  });
});

const RESULT: Trip = {
  id: 28,
  start_address: 'ul. Grzybowska 60, Warszawa, Polska',
  destination_address: 'ul. Józefa Bema 83, Warszawa, Polska',
  price: 22.3,
  date: new Date(2016),
  distance_meters: 0,
};
