import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  nodes: [],
};

export const fetchAllNodes = createAsyncThunk(
  'variables/fetchVariables',
  async () => {
    const resNodes = await fetch('http://localhost:5000/nodes');
    return await resNodes.json();
  }
);

const nodesSlice = createSlice({
  name: 'variables',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllNodes.fulfilled]: (state, action) => {
      return {
        ...state,
        nodes: action.payload,
      };
    },
  },
});

export default nodesSlice.reducer;
