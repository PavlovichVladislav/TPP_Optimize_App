import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StationRgc } from "../../types/redux";

interface StationState {
   summerStationRgc?: StationRgc;
   winterStationRgc?: StationRgc;
   offSeasonStationRgc?: StationRgc;
}

const initialState: StationState = {
   summerStationRgc: undefined,
   winterStationRgc: undefined,
   offSeasonStationRgc: undefined,
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
   },
});

export const { setSummerStationRgc, setWinterStationRgc, setOffSeasonStationRgc } =
   stationSlice.actions;

export default stationSlice.reducer;
