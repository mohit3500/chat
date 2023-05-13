import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const PostURL = 'http://localhost:3500/api';

export const registerUser = createAsyncThunk(
  'register',
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${PostURL}/register`, body);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.msg);
    }
  }
);

const initialState = {
  loading: false,
  user: {},
  token: '',
  error: null,
  success: false,
};

const registerSlice = createSlice({
  name: 'registerAuth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      registerUser.pending,
      (state, action) => {
        state.loading = true;
        state.error = null;
      },
      builder.addCase(
        registerUser.fulfilled,
        (state, { payload: { user, token } }) => {
          state.loading = true;
          state.success = true;
          state.user = user;
          state.token = token;
          localStorage.setItem('token', JSON.stringify(token));
          localStorage.setItem('user', JSON.stringify(user));
        },
        builder.addCase(registerUser.rejected, (state, { payload }) => {
          state.loading = false;
          state.error = payload;
        })
      )
    );
  },
});

export default registerSlice.reducer;
