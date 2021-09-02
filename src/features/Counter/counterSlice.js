import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increase: (state) => state + 1,
    decrease: (state) => state - 1,
  },
});

const { actions, reducer } = counterSlice;
export const { increase, decrease } = actions;

export default reducer;
