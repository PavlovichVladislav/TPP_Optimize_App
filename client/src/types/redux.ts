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

export interface TurbineShopRgc {
    flow_char: {
       x: number[];
       y: number[];
    };
    turbines_shop_hop: {
       x: number[];
       y: number[];
    };
 }
