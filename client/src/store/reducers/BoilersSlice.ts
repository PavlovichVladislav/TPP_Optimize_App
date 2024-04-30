import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBoiler } from "../../types/redux";

interface BoilersState {
   boilers: IBoiler[];
   inventoryBoilerNumbers: number[];
   isLoading: boolean;
   error: string;
}

const initialState: BoilersState = {
   boilers: [],
   inventoryBoilerNumbers: [],
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
   },
});

export const { setBoilers, addInventoryBoiler, deleteInventoryBoiler } = boilerSlice.actions;

export default boilerSlice.reducer;
