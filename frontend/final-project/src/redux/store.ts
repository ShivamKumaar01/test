import { configureStore } from '@reduxjs/toolkit';
import signupSliceReducer from './signupSlice';
import loginSliceReducer from './loginSlice';


export const store = configureStore({
  reducer: {
    signup:signupSliceReducer,
    login:loginSliceReducer
    
  
    
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;