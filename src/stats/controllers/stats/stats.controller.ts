import { Controller, Get } from '@nestjs/common';
import { StatsService } from '../../services/stats/stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('weekly')
  getWeeklyStats() {
    return this.statsService.getWeeklyStats();
  }
}
