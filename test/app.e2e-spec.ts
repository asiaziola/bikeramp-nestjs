import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './../src/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TripsModule } from './../src/trips/trips.module';
import { StatsModule } from './../src/stats/stats.module';
import { DateModule } from './../src/date/date.module';
import { AppController } from './../src/app.controller';
import { AppService } from './../src/app.service';
import { DateService } from './../src/date/services/date/date.service';
import { configuration } from './../config/configuration';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: `${process.cwd()}/config/env/${
            process.env.NODE_ENV
          }.env`,
          load: [configuration],
        }),
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities,
          dropSchema: true,
          synchronize: true,
          logging: false,
        }),
        TripsModule,
        StatsModule,
        DateModule,
      ],
      controllers: [AppController],
      providers: [AppService, DateService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to Bikeramp!');
  });

  it('/api/trips (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/trips')
      .expect(200)
      .expect([]);
  });

  it('/api/trips (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/trips')
      .send({
        start_address: 'ul. Grzybowska 60, Warszawa, Polska',
        destination_address: 'ul. Stryjeńskich 6, Warszawa, Polska',
        price: 22.3,
        date: '2020-10-01',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .expect({
        start_address: 'ul. Grzybowska 60, Warszawa, Polska',
        destination_address: 'ul. Stryjeńskich 6, Warszawa, Polska',
        price: 22.3,
        date: '2020-10-01',
        distance_meters: 15453,
        id: 1,
      });
  });

  it('/api/trips (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/trips')
      .expect(200)
      .expect([
        {
          trip_id: 1,
          trip_start_address: 'ul. Grzybowska 60, Warszawa, Polska',
          trip_destination_address: 'ul. Stryjeńskich 6, Warszawa, Polska',
          trip_price: 22.3,
          trip_date: '2020-10-01',
          trip_distance_meters: 15453,
        },
      ]);
  });
});
