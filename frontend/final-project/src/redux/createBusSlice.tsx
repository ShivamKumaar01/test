import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface registerBusPayload {
    color:string,
    regno:string,
    seat:number,
    busType:string,
    ownerId:number
}

export const registerBus = createAsyncThunk(
    'register/bus',
    async (formData: registerBusPayload, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:8080/bus', {
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
const registerBusSlice = createSlice({
  name: 'createRide',
  initialState: {
    loading: false,
    user: null,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerBus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerBus.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerBus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default registerBusSlice.reducer;