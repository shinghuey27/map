import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchReviews = createAsyncThunk("reviews/fetchReviews", async () => {
  return [
    {
      id: null,
      title:"",
      reviews:[{}],
    },
  ];
});

const ReviewsSlice = createSlice({
  name: "reviews",
  initialState: {
    entities: [],
    loading: false,
  },
  reducers: {
    reviewAdded(state, action) {
      state.entities.push(action.payload);
    },
    reviewDeleted(state, action) {
      const { selectedId } = action.payload;
      const existingReview = state.entities.find((review) => review.id === selectedId);
      if (existingReview) {
        state.entities = state.entities.filter((review) => review.id !== selectedId);
      }
    },
    extraReducers: {
      [fetchReviews.pending]: (state, action) => {
        state.loading = true;
      },
      [fetchReviews.fulfilled]: (state, action) => {
        state.loading = false;
        state.entities = [...state.entities, ...action.payload];
      },
      [fetchReviews.rejected]: (state, action) => {
        state.loading = false;
      },
    },
  }
});

export const { reviewAdded,reviewDeleted } = ReviewsSlice.actions;
export default ReviewsSlice.reducer;
