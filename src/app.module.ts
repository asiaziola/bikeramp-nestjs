import { Module } from '@nestjs/common';
import { TripsModule } from './trips/trips.module';

@Module({
  imports: [TripsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
