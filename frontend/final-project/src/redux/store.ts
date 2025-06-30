import { configureStore } from '@reduxjs/toolkit';
import signupSliceReducer from './signupSlice';
import loginSliceReducer from './loginSlice';
import tripSliceReducer from './rideSlice'
import bookRideSliceReducer from './assignRideSlice'
import bookTicketSliceReducer from './bookTicketSlice'


export const store = configureStore({
  reducer: {
    signup:signupSliceReducer,
    login:loginSliceReducer,
    trip:tripSliceReducer,
    createRide:bookRideSliceReducer,
    bookTicket:bookTicketSliceReducer



    
  
    
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;