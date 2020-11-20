import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  cachedNodes: [],
  nodes: [],
  content: [],
  selectedId: '',
  queryString: '',
};

export const fetchNodes = createAsyncThunk('nodes/fetchNodes', async () => {
  const res = await fetch('http://localhost:5000/nodes');
  return await res.json();
});

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
    return {
      queryString: query,
      nodes: await res.json(),
    };
  }
);

const nodesSlice = createSlice({
  name: 'nodes',
  initialState,
  reducers: {
    resetSearch(state) {
      return {
        ...state,
        nodes: state.cachedNodes,
        queryString: '',
      };
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
        cachedNodes: nodes,
        nodes,
      };
    },
    [fetchSelectedNode.fulfilled]: (state, action) => {
      const { connections, content, selectedId } = action.payload;
      const newConnections = connections
        ? connections.map((connectionId) => {
            return {
              ...state.cachedNodes.find((o) => o.id === connectionId),
              connections: [],
              nodeId: [selectedId, connectionId].join('.'),
            };
          })
        : null;

      const insertNewConnections = (currNodes, arr) => {
        if (arr.length) {
          const selectedId = arr.shift();
          return currNodes.map((node) => ({
            ...node,
            connections:
              node.id.toString() === selectedId
                ? insertNewConnections(node.connections, arr)
                : [],
          }));
        }
        return newConnections;
      };

      const cachedNodes = insertNewConnections(
        state.cachedNodes,
        selectedId.split('.')
      );

      const nodes = cachedNodes.filter((node) =>
        state.nodes.find(({ id }) => node.id === id)
      );

      return {
        ...state,
        nodes,
        cachedNodes,
        content,
        selectedId,
      };
    },
    [searchNodes.fulfilled]: (state, action) => {
      const { nodes: payloadNodes, queryString } = action.payload;
      const cachedNodes = state.queryString ? state.cachedNodes : state.nodes;

      const nodes = cachedNodes.filter((node) =>
        payloadNodes.find(({ id }) => node.id === id)
      );

      return {
        ...state,
        nodes,
        cachedNodes,
        queryString,
      };
    },
  },
});

export const { resetSearch, setSelectedNode } = nodesSlice.actions;

export default nodesSlice.reducer;
