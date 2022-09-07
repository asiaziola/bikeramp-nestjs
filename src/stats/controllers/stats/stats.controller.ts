import { Controller, Get } from '@nestjs/common';
import {
  MonthlyStats,
  WeeklyStats,
} from '../../interfaces/stats/stats.interface';
import { StatsService } from '../../services/stats/stats.service';

@Controller('api/stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('weekly')
  async getWeeklyStats(): Promise<WeeklyStats | {}> {
    return await this.statsService.getWeeklyStats();
  }

  @Get('monthly')
  async getMonthlyStats(): Promise<MonthlyStats[] | []> {
    return this.statsService.getMonthlyStats();
  }
}
