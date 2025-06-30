import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Trip {
   
    id: number;
    source: string;
    destination: string;
    arrival: string
    departure: string
    price:number
    location: string
    availableSeat: string | null,
}
interface TripState {
    isLoading: boolean;
    data: Trip[] | null;
    isError: boolean;
}

export const fetchTrip=createAsyncThunk<Trip[]>("fetchTrip",async()=>{
    const response=await fetch("http://localhost:8080/ride");
    const result = await response.json();
    console.log(result,"this is my result");
    return result.data;  
})

const initialState: TripState = {
  isLoading: false,
  data: null,
  isError: false,
};
const tripSlice=createSlice({
    name:"trip",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchTrip.pending ,(state)=>{
            state.isLoading=true;
        });

        builder.addCase(fetchTrip.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.data=action.payload;
            console.log(state.data)
        });
        builder.addCase(fetchTrip.rejected,(state)=>{
            state.isError=true;
        });
    }

})
export default tripSlice.reducer