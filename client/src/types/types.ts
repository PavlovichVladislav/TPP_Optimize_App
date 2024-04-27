export interface Boiler {
   station_number: number;
   mark: string;
   heat_performance: number;
   starts_number: number;
}

export interface OptimalBoilersInventory {
   offSeasonBoilers: Boiler[];
   summerBoilers: Boiler[];
   winterBoilers: Boiler[];
}
