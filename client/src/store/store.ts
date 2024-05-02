import { combineReducers, configureStore } from '@reduxjs/toolkit'
import boilerReducer from './reducers/BoilersSlice';
import turbineReducer from './reducers/TurbineSlice';

const rootReducer = combineReducers({
    boilerReducer,
    turbineReducer
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch