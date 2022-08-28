import { Test, TestingModule } from '@nestjs/testing';
import {
  getDataSourceName,
  getDataSourcePrefix,
  getDataSourceToken,
  getRepositoryToken,
} from '@nestjs/typeorm';
import { Trip } from '../../../typeorm';
import { StatsService } from '../../../stats/services/stats/stats.service';
import { StatsController } from './stats.controller';
import { DateService } from '../../../date/services/date/date.service';

describe('StatsController', () => {
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

    controller = module.get<StatsController>(StatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
