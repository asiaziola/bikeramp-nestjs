import { Module } from '@nestjs/common';
import { StatsService } from './services/stats/stats.service';
import { StatsController } from './controllers/stats/stats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from '../typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Trip])],
  providers: [StatsService],
  controllers: [StatsController],
})
export class StatsModule {}
