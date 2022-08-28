import { Module } from '@nestjs/common';
import { TripsModule } from './trips/trips.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatsModule } from './stats/stats.module';
import { DateService } from './date/services/date/date.service';
import { DateModule } from './date/date.module';
import entities from './typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      url: process.env.DATABASE_URL,
      type: 'postgres',
      ssl: {
        rejectUnauthorized: false,
      },
      entities: entities,
      synchronize: true,
    }),
    TripsModule,
    StatsModule,
    DateModule,
  ],
  controllers: [],
  providers: [DateService],
})
export class AppModule {}
