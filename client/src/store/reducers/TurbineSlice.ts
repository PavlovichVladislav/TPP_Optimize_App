import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITurbine, TurbineShopRgc, OptimalTurbinesInventory } from "../../types/redux";
import { SteamConsumption } from "../../types/types";

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
