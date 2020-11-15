import { configureStore } from '@reduxjs/toolkit';

import variablesSlice from './variables/variablesSlice';

export default configureStore({
  reducer: {
    variables: variablesSlice,
  },
});
