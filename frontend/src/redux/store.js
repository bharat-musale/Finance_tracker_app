import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from './slices/transactionSlice';
import budgetReducer from './slices/budgetSlice';

export const store = configureStore({
  reducer: {
    transactions: transactionReducer,
    budgets: budgetReducer,
  },
});
