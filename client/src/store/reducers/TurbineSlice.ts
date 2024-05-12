import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITurbine, TurbineShopRgc, OptimalTurbinesInventory } from "../../types/redux";
import { SteamConsumption } from "../../types/types";

// const mockData: SteamConsumption[] = [
//    {station_number: "ТГ03", steam_consumption:  [28.3, 35.7, 27, 25.2, 15.1, 10.6, 23.7, 17.2, 27.8, 29, 35.6, 36.6]},
//    {station_number: "ТГ04", steam_consumption:  [35.3, 25.9, 35.3, 35.3, 21.6, 13.9, 25.2, 22.3, 22.7, 38.5, 33.2, 38.5]},
//    {station_number: "ТГ05", steam_consumption:  [38.9, 30.1, 35.2, 0, 0, 0, 0, 15.6, 15.3, 40.3, 42.7, 41.3]},
//    {station_number: "ТГ06", steam_consumption:  [70.2, 47.6, 63.1, 53.1, 0, 0, 0, 0, 0, 20.2, 51.3, 51.0]},
//    {station_number: "ТГ07", steam_consumption:  [63.7, 54.7, 78, 48.2, 0, 0, 0, 31, 26.1, 56.8, 62.3, 61.8]},
//    {station_number: "ТГ08", steam_consumption:  [95.4, 80.9, 82.5, 76.5, 43.6, 22.4, 33, 31.5, 33.1, 68.6, 65.5, 55.3]},
//    {station_number: "ТГ09", steam_consumption:  [91.1, 76.2, 81.8, 71.6, 29.4, 0, 0, 0, 0, 0, 67, 70.3]},
// ]

interface TurbinesState {
   turbines: ITurbine[];
   inventoryTurbineNumbers: number[];
   optimalTurbines?: OptimalTurbinesInventory;
   steamConsumptions: SteamConsumption[];
   summerRgc?: TurbineShopRgc;
   winterRgc?: TurbineShopRgc;
   offSeasonRgc?: TurbineShopRgc;
   isLoading: boolean;
   error: string;
}

const initialState: TurbinesState = {
   turbines: [],
   inventoryTurbineNumbers: [],
   steamConsumptions: [],
   optimalTurbines: undefined,
   summerRgc: undefined,
   winterRgc: undefined,
   offSeasonRgc: undefined,
   isLoading: false,
   error: "",
};

export const turbineSlice = createSlice({
   name: "turbines",
   initialState,
   reducers: {
      setTurbines: (state, action: PayloadAction<ITurbine[]>) => {
         state.turbines = action.payload;
      },
      addInventoryTurbine: (state, action: PayloadAction<number>) => {
         state.inventoryTurbineNumbers = [...state.inventoryTurbineNumbers, action.payload];
      },
      deleteInventoryTurbine: (state, action: PayloadAction<number>) => {
         state.inventoryTurbineNumbers = state.inventoryTurbineNumbers.filter(
            (turbineNumber) => turbineNumber !== action.payload
         );
      },
      setOptimalTurbinesInventory: (state, action: PayloadAction<OptimalTurbinesInventory>) => {
         state.optimalTurbines = action.payload;
      },
      setSteamConsumptions: (state, action: PayloadAction<SteamConsumption[]>) => {
         state.steamConsumptions = action.payload;
      },
      setSummerRgc: (state, action: PayloadAction<TurbineShopRgc>) => {
         state.summerRgc = action.payload;
      },
      setWinterRgc: (state, action: PayloadAction<TurbineShopRgc>) => {
         state.winterRgc = action.payload;
      },
      setOffSeasonRgc: (state, action: PayloadAction<TurbineShopRgc>) => {
         state.offSeasonRgc = action.payload;
      },
   },
});

export const {
   setTurbines,
   addInventoryTurbine,
   deleteInventoryTurbine,
   setOptimalTurbinesInventory,
   setSummerRgc,
   setWinterRgc,
   setOffSeasonRgc,
   setSteamConsumptions
} = turbineSlice.actions;

export default turbineSlice.reducer;
