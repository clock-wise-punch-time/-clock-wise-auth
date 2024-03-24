export interface DateInterface {
  toFormat(date: Date, model: string): string;
  isExpired(
    date: Date,
    duration: number,
    unit: 'days' | 'months' | 'years' | 'hours',
  ): boolean;
}
