import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface bookRidePayload {
    source:string,
    destination:string,
    arrival:string,
    departure:string,
    location:string,
    price:number,
    busId:number
}

export const bookRide = createAsyncThunk(
    'ride',
    async (formData: bookRidePayload, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:8080/ride', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const error = await response.json();
                return rejectWithValue(error);
            }

            const data = await response.json();
            return data;
        } catch (err) {
            return rejectWithValue({ message: 'Network error' });
        }
    }
);

const bookRideSlice = createSlice({
  name: 'createRide',
  initialState: {
    loading: false,
    user: null,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(bookRide.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookRide.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(bookRide.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default bookRideSlice.reducer;