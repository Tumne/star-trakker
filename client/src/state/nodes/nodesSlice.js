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

// TODO
export const fetchSelectedNode = createAsyncThunk(
  'nodes/fetchSelectedNode',
  async (selectedId) => {
    const id = selectedId.split('.').pop();
    const res = await fetch(`http://localhost:5000/nodes/${id}`);
    return {
      ...(await res.json())[0],
      selectedId,
    };
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
    // TO REMOVE
    // setSelectedNode(state, action) {
    //   const { content, nodeId: selectedId } = action.payload;
    //   return { ...state, content, selectedId };
    // },
    setQueryString(state, action) {
      return { ...state, queryString: action.payload };
    },
  },
  extraReducers: {
    [fetchNodes.fulfilled]: (state, action) => {
      const nodes = action.payload.map((node) => ({
        ...node,
        connections: [],
        nodeId: node.id.toString(),
      }));
      return {
        ...state,
        initialNodes: nodes,
        nodes,
      };
    },
    [fetchSelectedNode.fulfilled]: (state, action) => {
      const { connections, content, selectedId } = action.payload;
      console.log(action.payload);
      const selectedConnections = connections
        ? connections.map((connectionId) => {
            return {
              ...state.initialNodes.find((o) => o.id === connectionId),
              connections: [],
            };
          })
        : [];

      const nodes = state.nodes.map((node) => ({
        ...node,
        connections: node.nodeId === selectedId ? selectedConnections : [],
      }));

      return {
        ...state,
        nodes,
        content,
        selectedId,
      };
    },
    [searchNodes.fulfilled]: (state, action) => {
      return {
        ...state,
        nodes: state.nodes.filter((node) =>
          action.payload.find(({ id }) => node.id === id)
        ),
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
