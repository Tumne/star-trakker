import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  initialNodes: [],
  connections: [],
  details: [],
};

export const fetchNodes = createAsyncThunk('nodes/fetchNodes', async () => {
  const res = await fetch('http://localhost:5000/nodes');
  return await res.json();
});

export const searchNodes = createAsyncThunk(
  'nodes/searchNodes',
  async (query) => {
    const res = await fetch('http://localhost:5000/nodes/search', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
      }),
    });
    return await res.json();
  }
);

const nodesSlice = createSlice({
  name: 'nodes',
  initialState,
  reducers: {
    resetConnections(state) {
      return {
        ...state,
        connections: state.initialNodes,
      };
    },
    updateDetails(state, action) {
      return {
        ...state,
        details: action.payload,
      };
    },
  },
  extraReducers: {
    [fetchNodes.fulfilled]: (state, action) => {
      return {
        ...state,
        initialNodes: action.payload,
        connections: action.payload,
      };
    },
    [searchNodes.fulfilled]: (state, action) => {
      return {
        ...state,
        connections: action.payload,
      };
    },
  },
});

export const { resetConnections, updateDetails } = nodesSlice.actions;

export default nodesSlice.reducer;
