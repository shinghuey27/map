import { configureStore } from "@reduxjs/toolkit";

import MapsReducer from "./MapsSlice"


export default configureStore({
  reducer: {
      maps: MapsReducer,
  },
});