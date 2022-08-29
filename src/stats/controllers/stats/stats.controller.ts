import { Controller, Get } from '@nestjs/common';
import { StatsService } from '../../services/stats/stats.service';

@Controller('api/stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('weekly')
  async getWeeklyStats() {
    return await this.statsService.getWeeklyStats();
  }

  @Get('monthly')
  async getMonthly() {
    return this.statsService.getMonthlyStats();
  }
}
