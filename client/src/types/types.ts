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

export interface SteamConsumption {
   turbine_mark: string;
   steam_consumption: number[];
}

export interface OptimalTurbinesInventory {
   turbinesData: SteamConsumption[]
   season: string;
}
