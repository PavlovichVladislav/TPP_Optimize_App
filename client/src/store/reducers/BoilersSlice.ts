import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBoiler } from "../../types/redux";
import { BoilerShopRgc, OptimalBoilersInventory } from "../../types/types";

interface BoilersState {
   boilers: IBoiler[];
   inventoryBoilerNumbers: number[];
   optimalBoilers?: OptimalBoilersInventory;
   boilerShopRgc?: BoilerShopRgc;
   isLoading: boolean;
   error: string;
}

const initialState: BoilersState = {
   boilers: [],
   inventoryBoilerNumbers: [],
   optimalBoilers: undefined,
   boilerShopRgc: undefined,
   isLoading: false,
   error: "",
};

export const boilerSlice = createSlice({
   name: "boilers",
   initialState,
   reducers: {
      setBoilers: (state, action: PayloadAction<IBoiler[]>) => {
         state.boilers = action.payload;
      },
      addInventoryBoiler: (state, action: PayloadAction<number>) => {
         state.inventoryBoilerNumbers = [...state.inventoryBoilerNumbers, action.payload];
      },
      deleteInventoryBoiler: (state, action: PayloadAction<number>) => {
         state.inventoryBoilerNumbers = state.inventoryBoilerNumbers.filter(
            (boilerNumber) => boilerNumber !== action.payload
         );
      },
      setOptimalBoilersInventory: (state, action: PayloadAction<OptimalBoilersInventory>) => {
         state.optimalBoilers = action.payload;
      },
      clearOptimalBoilersInventory: (state) => {
         state.optimalBoilers = undefined;
      },
      clearShopRgc: (state) => {
         state.boilerShopRgc = undefined;
      },
      setBoilerShopRgc: (state, action: PayloadAction<BoilerShopRgc>) => {
         state.boilerShopRgc = action.payload;
      },
   },
});

export const {
   setBoilers,
   addInventoryBoiler,
   deleteInventoryBoiler,
   setOptimalBoilersInventory,
   clearOptimalBoilersInventory,
   clearShopRgc,
   setBoilerShopRgc,
} = boilerSlice.actions;

export default boilerSlice.reducer;
