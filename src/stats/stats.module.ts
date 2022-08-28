import { Module } from '@nestjs/common';
import { StatsService } from './services/stats/stats.service';
import { StatsController } from './controllers/stats/stats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from '../typeorm';
import { DateModule } from '../date/date.module';

@Module({
  imports: [TypeOrmModule.forFeature([Trip]), DateModule],
  providers: [StatsService],
  controllers: [StatsController],
})
export class StatsModule {}
