import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from 'api/userApi';

export const register = createAsyncThunk(
  'user/fetchByIdStatus',
  async (payload) => {
    // call API to register
    const data = await userApi.register(payload);

    // save data to local storage
    localStorage.setItem('access_token', data.jwt);
    localStorage.setItem('user', JSON.stringify(data.user));

    // return user data
    return data.user;
  }
);
export const login = createAsyncThunk('user/login', async (payload) => {
  // call API to register
  const data = await userApi.login(payload);

  // save data to local storage
  localStorage.setItem('access_token', data.jwt);
  localStorage.setItem('user', JSON.stringify(data.user));

  // return user data
  return data.user;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: {}, // logged-in user's info
    settings: {}, // maybe list of permissions
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      state.current = action.payload;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.current = action.payload;
    });
  },
});

const { actions, reducer } = userSlice;
export const { increase, decrease } = actions;

export default reducer;
