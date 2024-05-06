export interface IBoiler {
   station_number: number;
   mark: string;
   heat_performance: number;
   starts_number: number;
}

export interface ITurbine {
   station_number: number;
   mark: string;
   electricity_power: number;
   thermal_power: number;
   power_generation: number;
}

export interface OptimalTurbinesInventory {
   offSeasonTurbines?: ITurbine[];
   summerTurbines?: ITurbine[];
   winterTurbines?: ITurbine[];
}

export interface FlowChar {
   x: number[];
   y: number[];
}

export interface TurbineShopHop {
   x: number[];
   y: number[];
}

export interface TurbineShopRgc {
   flow_char: FlowChar;
   turbines_shop_hop: TurbineShopHop;
}

export interface StationRgc {
   N: number[],
   b: number[]
}