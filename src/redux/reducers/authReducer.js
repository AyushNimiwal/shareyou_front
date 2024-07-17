import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: null,  // Store access token here
  refreshToken: null, // Optionally store refresh token
  user: null,         // Store user information
  isAuthenticated: false // Flag to indicate if user is authenticated
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logoutSuccess(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.isAuthenticated = false;
    }
  },
    
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;