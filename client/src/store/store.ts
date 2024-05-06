import { combineReducers, configureStore } from '@reduxjs/toolkit'
import boilerReducer from './reducers/BoilersSlice';
import turbineReducer from './reducers/TurbineSlice';
import stationReducer from './reducers/StationSlice';

const rootReducer = combineReducers({
    boilerReducer,
    turbineReducer,
    stationReducer
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch