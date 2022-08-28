import { Module } from '@nestjs/common';
import { TripsModule } from './trips/trips.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TripsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
