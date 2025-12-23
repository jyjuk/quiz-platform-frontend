import { configureStore } from '@reduxjs/toolkit';
import testReducer from './slices/testSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    test: testReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
