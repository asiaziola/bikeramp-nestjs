import { Injectable } from '@nestjs/common';
const dayjs = require('dayjs');
const advancedFormat = require('dayjs/plugin/advancedFormat');

@Injectable()
export class DateService {
  formatDate(date: Date): string {
    dayjs.extend(advancedFormat);
    return dayjs(date).format('MMM, Do');
  }
}
