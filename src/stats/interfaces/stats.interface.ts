export interface WeeklyStats {
  total_distance: string;
  total_price: string;
}

export interface MonthlyStats {
  day: Date;
  total_distance: string;
  avg_ride: string;
  avg_price: string;
}
