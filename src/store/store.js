import { configureStore } from '@reduxjs/toolkit';
import currenciesSlice from '../components/currencies/currenciesSlice'

export const store = configureStore({
  reducer: {
    currency: currenciesSlice,
  },
});
