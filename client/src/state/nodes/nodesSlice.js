import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  initialNodes: [],
  nodes: [],
  content: [],
  selectedId: '',
  queryString: '',
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
        nodes: state.initialNodes,
      };
    },
    setSelectedNode(state, action) {
      const { content, nodeId: selectedId } = action.payload;
      return { ...state, content, selectedId };
    },
    setQueryString(state, action) {
      return { ...state, queryString: action.payload };
    },
  },
  extraReducers: {
    [fetchNodes.fulfilled]: (state, action) => {
      const nodes = action.payload.map((node) => ({
        ...node,
        nodeId: node.id.toString(),
      }));
      return {
        ...state,
        initialNodes: nodes,
        nodes,
      };
    },
    [searchNodes.fulfilled]: (state, action) => {
      return {
        ...state,
        nodes: action.payload,
      };
    },
  },
});

export const {
  resetConnections,
  setSelectedNode,
  setQueryString,
} = nodesSlice.actions;

export default nodesSlice.reducer;
