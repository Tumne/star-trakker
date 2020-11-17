import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const fetchVariables = createAsyncThunk(
  'variables/fetchVariables',
  async () => {
    const resVariables = await fetch('http://localhost:5000/variables');
    return await resVariables.json();
  }
);

const variablesSlice = createSlice({
  name: 'variables',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchVariables.fulfilled]: (_state, action) => {
      return action.payload;
    },
  },
});

export default variablesSlice.reducer;
