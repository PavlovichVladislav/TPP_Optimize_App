import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StationRgc, StationDemand, StationOptimalMode } from "../../types/redux";

interface StationState {
   summerStationRgc?: StationRgc;
   winterStationRgc?: StationRgc;
   offSeasonStationRgc?: StationRgc;
   fuelPrice: number[];
   demand?: StationDemand;
   summerOptimalMode?: StationOptimalMode;
   winterOptimalMode?: StationOptimalMode;
   offSeasonOptimalMode?: StationOptimalMode;
}

const initialState: StationState = {
   summerStationRgc: undefined,
   winterStationRgc: undefined,
   offSeasonStationRgc: undefined,
   fuelPrice: [],
   demand: undefined,
   summerOptimalMode: undefined,
};

export const stationSlice = createSlice({
   name: "station",
   initialState,
   reducers: {
      setSummerStationRgc: (state, action: PayloadAction<StationRgc>) => {
         state.summerStationRgc = action.payload;
      },
      setWinterStationRgc: (state, action: PayloadAction<StationRgc>) => {
         state.winterStationRgc = action.payload;
      },
      setOffSeasonStationRgc: (state, action: PayloadAction<StationRgc>) => {
         state.offSeasonStationRgc = action.payload;
      },
      setFuelPrice: (state, action: PayloadAction<number[]>) => {
         state.fuelPrice = action.payload;
      },
      setDemand: (state, action: PayloadAction<StationDemand>) => {
         state.demand = action.payload;
      },
      setSummerOptimalMode: (state, action: PayloadAction<StationOptimalMode>) => {
         state.summerOptimalMode = action.payload;
      },
      setWinterOptimalMode: (state, action: PayloadAction<StationOptimalMode>) => {
         state.winterOptimalMode = action.payload;
      },
      setOffSeasonOptimalMode: (state, action: PayloadAction<StationOptimalMode>) => {
         state.offSeasonOptimalMode = action.payload;
      },
   },
});

export const {
   setSummerStationRgc,
   setWinterStationRgc,
   setOffSeasonStationRgc,
   setFuelPrice,
   setDemand,
   setSummerOptimalMode,
   setWinterOptimalMode,
   setOffSeasonOptimalMode
} = stationSlice.actions;

export default stationSlice.reducer;
