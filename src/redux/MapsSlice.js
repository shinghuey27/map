import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchMaps = createAsyncThunk("maps/fetchMaps", async () => {
  return [
    {
      id: 1,
      title: "Kuala Lumpur",
      isOpen: false,
      url: "https://lh5.googleusercontent.com/p/AF1QipP0eEHS4CTw1eEot1moGc-wekUsG1tKdDbZzia1=w426-h240-k-no",
      address: "Kuala Lumpur",
      formatted_address:
        "Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia",
      coords: {
        lat: 3.139003,
        lng: 101.686855,
      },
      rating: null,
      review: 0,
      quantity: 0,
      reviewDetails: [ {author_name: "John Doe", rating: 5, relative_time_description: "1 year ago", text: "Pretty Place!" } ],
    },
  ];
});

const MapsSlice = createSlice({
  name: "maps",
  initialState: {
    entities: [],
    loading: false,
  },
  reducers: {
    mapAdded(state, action) {
      state.entities.push(action.payload);
    },
  },
  extraReducers: {
    [fetchMaps.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchMaps.fulfilled]: (state, action) => {
      state.loading = false;
      state.entities = [...state.entities, ...action.payload];
    },
    [fetchMaps.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const { mapAdded } = MapsSlice.actions;
export default MapsSlice.reducer;
