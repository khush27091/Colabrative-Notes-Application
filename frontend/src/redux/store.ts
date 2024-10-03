// frontend/src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import noteReducer from './noslice';

export const store = configureStore({
  reducer: {
    note: noteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
