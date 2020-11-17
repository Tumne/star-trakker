import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  initialNodes: [],
  nodes: [],
  content: [],
  details: [],
};

export const fetchNodes = createAsyncThunk('nodes/fetchNodes', async () => {
  const res = await fetch('http://localhost:5000/nodes');
  return await res.json();
});

export const fetchSelectedNode = createAsyncThunk(
  'nodes/fetchSelectedNode',
  async (id) => {
    const res = await fetch(`http://localhost:5000/nodes/${id}`);
    return (await res.json())[0];
  }
);

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
        nodes: action.payload.map((o) => ({ ...o, connections: [] })),
      };
    },
    [fetchSelectedNode.fulfilled]: (state, action) => {
      // const { connections, id: selectedId, content } = action.payload;

      // const newConnections = connections
      //   ? connections.map((connectionId) => {
      //       return {
      //         ...state.initialNodes.find((o) => o.id === connectionId),
      //         connections: [],
      //       };
      //     })
      //   : [];

      // const nodes = state.nodes.map((node) => ({
      //   ...node,
      //   connections: node.id === selectedId ? newConnections : [],
      // }));

      return {
        ...state,
        content: action.payload.content,
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

export const { resetConnections, updateDetails } = nodesSlice.actions;

export default nodesSlice.reducer;
