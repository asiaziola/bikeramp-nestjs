import { Module } from '@nestjs/common';
import { StatsService } from './services/stats/stats.service';
import { StatsController } from './controllers/stats/stats.controller';

@Module({
  providers: [StatsService],
  controllers: [StatsController]
})
export class StatsModule {}
