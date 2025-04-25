import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import noteReducer from '../features/noteSlice';

const store = configureStore({
    reducer:{
        auth:authReducer,
        note:noteReducer,
    }
})


export default store;