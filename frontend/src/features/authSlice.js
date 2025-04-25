// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api'; // Change to your Laravel API base

export const loginUser = createAsyncThunk('auth/login', async (formData, thunkAPI) => {
  try {
    const response = await axios.post(`${API_URL}/login`, formData);
    console.log("login data:",response.data);
    
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message || 'Login failed');
  }
});

export const registerUser = createAsyncThunk('auth/register', async (formData, thunkAPI) => {
  try {
    const response = await axios.post(`${API_URL}/register`, formData);
    console.log(response.data);
    
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message || 'Registration failed');
  }
});

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  isRegister: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.isRegister = !state.isRegister;
    },
    logout: (state) => {
        console.log("logout");
      state.user = null;
      localStorage.removeItem('token');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        localStorage.setItem('token', action.payload.access_token);
        console.log("extrareducer:" ,state.user);
        state.isLoading = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        localStorage.setItem('token', action.payload.access_token);
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, registerUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { toggleMode, logout } = authSlice.actions;
export default authSlice.reducer;
