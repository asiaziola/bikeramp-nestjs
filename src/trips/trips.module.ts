import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapsModule } from '../maps/maps.module';
import { Trip } from '../typeorm';
import { TripsController } from './controllers/trips/trips.controller';
import { TripsService } from './services/trips/trips.service';

@Module({
  imports: [TypeOrmModule.forFeature([Trip]), MapsModule],
  controllers: [TripsController],
  providers: [TripsService],
})
export class TripsModule {}
