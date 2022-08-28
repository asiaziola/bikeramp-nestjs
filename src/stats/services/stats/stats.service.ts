import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DateService } from '../../../date/services/date/date.service';
import { DataSource, Repository } from 'typeorm';
import { Trip } from '../../../typeorm';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Trip) private readonly userRepository: Repository<Trip>,
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly dateService: DateService,
  ) {}

  async getWeeklyStats() {
    const weekly = await this.dataSource.query(
      `SELECT price, distance_meters FROM trip WHERE date >= date_trunc('week',current_date);`,
    );

    if (weekly.length == 0) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'No records for the current week in the database.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const prices = weekly.map((w: any) => parseFloat(w.price));
    const pricesSum = prices.reduce((a: number, b: number) => a + b, 0);

    const distances = weekly.map((w: any) => w.distance_meters);
    const distancesSum = distances.reduce((a: number, b: number) => a + b, 0);

    const distanceInKm = distancesSum / 1000;

    return {
      total_distance: `${distanceInKm} km`,
      total_price: `${pricesSum.toFixed(2)}PLN`,
    };
  }

  async getMonthlyStats() {
    const monthly = await this.dataSource.query(
      `SELECT 
            date, 
            CAST(avg(price) AS DECIMAL(10, 2)) as avg_price, 
            SUM(distance_meters) as total_distance, 
            CAST(avg(distance_meters) AS INT) as avg_distance 
            FROM trip 
            WHERE date >= date_trunc('month',current_date) 
            GROUP BY date, distance_meters;
        `,
    );

    if (monthly.length == 0) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'No records for the current month in the database.',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const monthlyGrouped = monthly.map((m: any) => ({
      day: this.dateService.formatDate(m.date),
      total_distance: `${m.total_distance / 1000}km`,
      avg_ride: `${m.avg_distance / 1000}km`,
      avg_price: `${m.avg_price}PLN`,
    }));

    return monthlyGrouped;
  }
}
