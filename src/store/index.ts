import { configureStore } from '@reduxjs/toolkit';
import testReducer from './slices/testSlice';
import authReducer from './slices/authSlice';
import usersReducer from './slices/usersSlice';
import companiesReducer from './slices/companiesSlice';

export const store = configureStore({
  reducer: {
    test: testReducer,
    auth: authReducer,
    users: usersReducer,
    companies: companiesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
