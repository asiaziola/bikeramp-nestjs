import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DateService } from '../../../date/services/date/date.service';
import { DataSource } from 'typeorm';
import {
  MonthlyStats,
  WeeklyStats,
} from '../../interfaces/stats/stats.interface';

@Injectable()
export class StatsService {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly dateService: DateService,
  ) {}

  async getWeeklyStats(): Promise<WeeklyStats | {}> {
    const weekly = await this.dataSource.query(
      `SELECT price, distance_meters FROM trip WHERE date >= date_trunc('week',current_date);`,
    );

    if (weekly.length == 0) {
      return {};
    }
    const prices = weekly.map((w: { price: string; distance_meters: number }) =>
      parseFloat(w.price),
    );
    const pricesSum = prices.reduce((a: number, b: number) => a + b, 0);

    const distances = weekly.map(
      (w: { price: string; distance_meters: number }) => w.distance_meters,
    );
    const distancesSum = distances.reduce((a: number, b: number) => a + b, 0);

    const distanceInKm = distancesSum / 1000;
    const priceFormatted = pricesSum.toFixed(2);

    return {
      total_distance: `${distanceInKm} km`,
      total_price: `${priceFormatted}PLN`,
    };
  }

  async getMonthlyStats(): Promise<MonthlyStats[] | []> {
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
      return [];
    }

    const monthlyGrouped = monthly.map(
      (m: {
        date: Date;
        total_distance: number;
        avg_distance: number;
        avg_price: number;
      }) => ({
        day: this.dateService.formatDate(m.date),
        total_distance: `${m.total_distance / 1000}km`,
        avg_ride: `${m.avg_distance / 1000}km`,
        avg_price: `${m.avg_price}PLN`,
      }),
    );

    return monthlyGrouped;
  }
}
