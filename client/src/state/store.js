import { configureStore } from '@reduxjs/toolkit';

import variablesSlice from './variables/variablesSlice';
import nodesSlice from './nodes/nodesSlice';

export default configureStore({
  reducer: {
    variables: variablesSlice,
    nodes: nodesSlice,
  },
});
