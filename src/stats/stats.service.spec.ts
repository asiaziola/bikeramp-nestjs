import { Test, TestingModule } from '@nestjs/testing';
import {
  getDataSourceName,
  getDataSourcePrefix,
  getDataSourceToken,
  getRepositoryToken,
} from '@nestjs/typeorm';
import { DateService } from '../date/services/date/date.service';
import { Trip } from '../typeorm';
import { StatsController } from './controllers/stats/stats.controller';
import { StatsService } from './services/stats/stats.service';

describe('StatsService', () => {
  let service: StatsService;
  let controller: StatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatsController],
      providers: [
        StatsService,
        DateService,
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

    service = module.get<StatsService>(StatsService);
    controller = module.get<StatsController>(StatsController);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return weekly stats', async () => {
    const expectedResult = {
      total_distance: '15.453 km',
      total_price: '44.60PLN',
    };
    jest
      .spyOn(service, 'getWeeklyStats')
      .mockImplementation(
        () => new Promise((resolve) => resolve(expectedResult)),
      );

    const actualResult = await controller.getWeeklyStats();

    expect(actualResult).toBe(expectedResult);
  });

  it('should return monthly stats', async () => {
    const expectedResult = [
      {
        day: new Date(),
        total_distance: '15.453km',
        avg_ride: '15.453km',
        avg_price: '22.30PLN',
      },
      {
        day: new Date(),
        total_distance: '0km',
        avg_ride: '0km',
        avg_price: '22.30PLN',
      },
    ];
    jest
      .spyOn(service, 'getMonthlyStats')
      .mockImplementation(
        () => new Promise((resolve) => resolve(expectedResult)),
      );

    const actualResult = await controller.getMonthlyStats();

    expect(actualResult).toBe(expectedResult);
  });
});
