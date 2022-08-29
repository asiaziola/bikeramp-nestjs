import { Test, TestingModule } from '@nestjs/testing';
import { DateService } from './services/date/date.service';

describe('DateService', () => {
  let service: DateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DateService],
    }).compile();

    service = module.get<DateService>(DateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should format date', () => {
    const expectedResult = 'Oct, 9th';
    const actualResult = service.formatDate(new Date('2016-10-09'));
    expect(actualResult).toBe(expectedResult);
  });
});
