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

export interface BoilerRgc {
   Q: number[];
   b: number[];
}

export interface BoilerShopRgc {
   offSeasonBoilerShopRGC: BoilerRgc;
   summerBoilerShopRGC: BoilerRgc;
   winterBoilerShopRGC: BoilerRgc;
}

export interface SteamConsumption {
   turbine_mark: string;
   steam_consumption: number[];
}

export interface OptimalTurbinesData {
   turbinesData: SteamConsumption[]
   season: string;
}
