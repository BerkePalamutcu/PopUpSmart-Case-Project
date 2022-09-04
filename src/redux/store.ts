import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import apiDataSlice from './slices/apiDataSlice';
import viewModeSlice from './slices/viewModeSlice';

const store = configureStore({
  reducer: {
    getApi: apiDataSlice,
    changeViewMode: viewModeSlice,
  },
});

export type Rootstate = ReturnType<typeof store.getState>;

export type Appdispatch = typeof store.dispatch;
export const useAppDispatch: () => Appdispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<Rootstate> = useSelector;

export default store;
