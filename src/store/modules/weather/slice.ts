import {createSlice} from '@reduxjs/toolkit';
import {IInitialStateDTO} from './types';

const initialState = {
  loading: false,
} as IInitialStateDTO;

const weather = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    testRequest(state, _payload) {
      state.loading = true;
    },

    testSuccess(state) {
      state.loading = false;
    },

    testFailure(state) {
      state.loading = false;
    },
  },
});

export const {testRequest, testSuccess, testFailure} = weather.actions;
export default weather.reducer;
