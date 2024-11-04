import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://take-home-test-api.nutech-integrasi.com';

export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, credentials);
    const token = response.data.data.token;
    const expirationTime = new Date().getTime() + 12 * 60 * 60 * 1000;

    sessionStorage.setItem('token', token);
    sessionStorage.setItem('email', credentials.email);
    sessionStorage.setItem('tokenExpiration', expirationTime);
    return { email: credentials.email, token: token };
  } catch (error) {
    return thunkAPI.rejectWithValue('Login failed');
  }
});

export const register = createAsyncThunk('auth/register', async (credentials, thunkAPI) => {
  try {
    const response = await axios.post(`${BASE_URL}/registration`, credentials);
    return { success: true, data: response.data };
  } catch (error) {
    return thunkAPI.rejectWithValue({
      status: error.response?.status || 'ERROR',
      message: error.response?.data?.message || 'Registration failed',
    });
  }
});

export const fetchProfile = createAsyncThunk('auth/fetchProfile', async (_, thunkAPI) => {
  try {
      const token = sessionStorage.getItem('token');

      if (!token) {
          throw new Error("No token found");
      }

      const response = await axios.get(`${BASE_URL}/profile`, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });

      return response.data.data;
  } catch (error) {
      console.error('Error fetching profile:', error);
      return thunkAPI.rejectWithValue('Failed to fetch profile');
  }
});

export const fetchBalance = createAsyncThunk('auth/fetchBalance', async (_, thunkAPI) => {
  try {
    const token = sessionStorage.getItem('token');
    
    if (!token) {
      throw new Error("No token found");
    }
    
    const response = await axios.get(`${BASE_URL}/balance`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('Fetched balance:', response.data);
    
    return response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to fetch Balance');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    email: null,
    token: null,
    profile: {data: null},
    balance: {data: null},
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.email = null;
      state.profile = null;
      state.balance = null;
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('email');
      sessionStorage.removeItem('tokenExpiration');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.email = action.payload.email;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        console.log('profile',action);
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        console.log('balance',action);
        state.loading = false;
        state.balance = action.payload;
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
