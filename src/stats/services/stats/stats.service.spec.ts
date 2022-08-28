import { Test, TestingModule } from '@nestjs/testing';
import { getDataSourceName, getDataSourcePrefix, getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { DateService } from '../../../date/services/date/date.service';
import { Trip } from '../../../typeorm';
import { StatsService } from './stats.service';

describe('StatsService', () => {
  let service: StatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
