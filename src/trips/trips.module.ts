import { Module } from '@nestjs/common';
import { TripsController } from './controllers/trips/trips.controller';
import { TripsService } from './services/trips/trips.service';

@Module({
  controllers: [TripsController],
  providers: [TripsService]
})
export class TripsModule {}
