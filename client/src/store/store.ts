import { combineReducers, configureStore } from '@reduxjs/toolkit'
import boilerReducer from './reducers/BoilersSlice';

const rootReducer = combineReducers({
    boilerReducer
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch