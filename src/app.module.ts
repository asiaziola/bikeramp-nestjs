import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DateService } from './date/services/date/date.service';
import { DateModule } from './date/date.module';
import entities from './typeorm';
import { configuration } from '../config/configuration';
import { TripsModule } from './trips/trips.module';
import { StatsModule } from './stats/stats.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/config/env/${process.env.NODE_ENV}.env`,
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      url: process.env.DATABASE_URL,
      type: 'postgres',
      ...(process.env.NODE_ENV == 'production'
        ? {
            ssl: {
              rejectUnauthorized: false,
            },
          }
        : {}),
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
