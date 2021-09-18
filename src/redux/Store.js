import { configureStore } from "@reduxjs/toolkit";

import MapsReducer from "./MapsSlice"
import ReviewsReducer from "./ReviewsSlice"


export default configureStore({
  reducer: {
      maps: MapsReducer,
      reviews:ReviewsReducer,
  },
});