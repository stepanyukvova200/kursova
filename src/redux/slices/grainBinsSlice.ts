import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const grainBinsSlice = createSlice({
  name: 'grainBins',
  initialState,
  reducers: {
    setLoading: state => {
      state.loading = true;
      state.error = null;
    },
    setData: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setLoading, setData, setError } = grainBinsSlice.actions;
export default grainBinsSlice.reducer;
