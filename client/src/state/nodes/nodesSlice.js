import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  initialNodes: [],
  connections: [],
};

export const fetchNodes = createAsyncThunk('nodes/fetchNodes', async () => {
  const resNodes = await fetch('http://localhost:5000/nodes');
  return await resNodes.json();
});

const nodesSlice = createSlice({
  name: 'nodes',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchNodes.fulfilled]: (state, action) => {
      return {
        ...state,
        initialNodes: action.payload,
        connections: action.payload,
      };
    },
  },
});

export default nodesSlice.reducer;
