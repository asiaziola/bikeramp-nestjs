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
    const expectedResult = [
      {
        id: 28,
        start_address: 'ul. Grzybowska 60, Warszawa, Polska',
        destination_address: 'ul. Józefa Bema 83, Warszawa, Polska',
        price: 22.3,
        date: new Date(2016),
        distance_meters: 0,
      },
    ];
    jest
      .spyOn(service, 'getTrips')
      .mockImplementation(
        () => new Promise((resolve) => resolve(expectedResult)),
      );

    const actualResult = await controller.getTrips();
    expect(actualResult).toBe(expectedResult);
  });

  it('should call service post method', async () => {
    const postRequest = {
      start_address: 'ul. Grzybowska 60, Warszawa, Polska',
      destination_address: 'ul. Stryjeńskich 6, Warszawa, Polska',
      price: 22.3,
      date: new Date(2016),
    };

    const expectedResult = {
      id: 28,
      start_address: 'ul. Grzybowska 60, Warszawa, Polska',
      destination_address: 'ul. Józefa Bema 83, Warszawa, Polska',
      price: 22.3,
      date: new Date(2016),
      distance_meters: 0,
    };
    jest
      .spyOn(service, 'createTrip')
      .mockImplementation(
        () => new Promise((resolve) => resolve(expectedResult)),
      );
    controller.createTrip(postRequest);
    expect(service.createTrip).toHaveBeenCalled();
  });
});
