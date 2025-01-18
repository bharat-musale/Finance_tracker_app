import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

// Async thunks
export const fetchBudgets = createAsyncThunk(
  'budgets/fetchBudgets',
  async () => {
    const response = await api.get('/budgets');
    return response.data;
  }
);

export const addBudget = createAsyncThunk(
  'budgets/addBudget',
  async (budget) => {
    const response = await api.post('/budgets', budget);
    return response.data;
  }
);

export const updateBudget = createAsyncThunk(
  'budgets/updateBudget',
  async ({ id, budget }) => {
    const response = await api.put(`/budgets/${id}`, budget);
    return response.data;
  }
);

export const deleteBudget = createAsyncThunk(
  'budgets/deleteBudget',
  async (id) => {
    await api.delete(`/budgets/${id}`);
    return id;
  }
);

const budgetSlice = createSlice({
  name: 'budgets',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBudgets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBudgets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchBudgets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addBudget.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateBudget.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteBudget.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
      });
  },
});

export default budgetSlice.reducer;
