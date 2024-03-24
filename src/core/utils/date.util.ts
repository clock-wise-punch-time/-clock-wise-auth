import { Injectable } from '@nestjs/common';
import { DateInterface } from './interfaces/date.util';
import { add, format, isBefore } from 'date-fns';

@Injectable()
export class DateUtil implements DateInterface {
  toFormat(date: Date, model: string): string {
    return format(new Date(date), model);
  }

  isExpired(
    date: Date,
    duration: number,
    unit: 'days' | 'months' | 'years' | 'hours',
  ): boolean {
    const currentDate = new Date();
    const providedDate = new Date(date);
    const expirationDate = add(providedDate, { [unit]: duration });
    return isBefore(expirationDate, currentDate);
  }
}
