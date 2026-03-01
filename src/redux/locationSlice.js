// import { createSlice } from "@reduxjs/toolkit";

// // Initial state
// const initialState = {
//   selectedCity: "Tirupati"
// };

// const locationSlice = createSlice({
//   name: "location",
//   initialState,
//   reducers: {
//     setCity: (state, action) => {
//       state.selectedCity = action.payload;
//     }
//   }
// });

// // Export action
// export const { setCity } = locationSlice.actions;

// // Export reducer
// export default locationSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ------------------------------
// 🔥 Async Thunk (API call)
// ------------------------------
export const fetchNamazTimings = createAsyncThunk(
  "location/fetchNamazTimings",
  async (city, thunkAPI) => {
    try {
      const response = await fetch(
        `https://api.aladhan.com/v1/timingsByCity?city=${city.name}&country=${city.country}&method=2&school=1`
      );

      const data = await response.json();

      return data.data.timings; // return only timings object
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch timings");
    }
  }
);

// ------------------------------
// Default City Object
// ------------------------------
const defaultCity = {
  id: 1,
  name: "Tirupati",
  state: "Andhra Pradesh",
  country: "India",
  lat: 13.6288,
  lon: 79.4192
};

// ------------------------------
// Initial State
// ------------------------------
const initialState = {
  selectedCity: defaultCity,
  timings: null,
  loading: false,
  error: null
};

// ------------------------------
// Slice
// ------------------------------
const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setCity: (state, action) => {
      state.selectedCity = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNamazTimings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNamazTimings.fulfilled, (state, action) => {
        state.loading = false;
        state.timings = action.payload;
      })
      .addCase(fetchNamazTimings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setCity } = locationSlice.actions;

export default locationSlice.reducer;