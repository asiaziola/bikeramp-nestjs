import { Module } from '@nestjs/common';
import { DateService } from './services/date/date.service';

@Module({
  providers: [DateService],
  exports: [DateService],
})
export class DateModule {}
