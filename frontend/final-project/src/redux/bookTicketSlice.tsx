
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface BookTicketPayload {
    userId: number
    rideId: number
}
export const bookTicket = createAsyncThunk(
    'auth/signup',
    async (formData: BookTicketPayload, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:8080/reservation', {
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

const bookTicketSlice = createSlice({
  name: 'bookTicket',
  initialState: {
    loading: false,
    user: null,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(bookTicket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(bookTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default bookTicketSlice.reducer;