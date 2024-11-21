import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  errorCode: null,
  token: null,
  authenticationStatus: false,
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    authLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    getErrorCode: (state, { payload }) => {
      state.errorCode = payload;
    },
    getToken: (state, { payload }) => {
      state.token = payload;
    },
    authenticationStatus: (state, { payload }) => {
      state.authenticationStatus = payload;
    },
  },
});

const { actions, reducer } = authSlice;

export const { authLoading, getErrorCode, getToken, authenticationStatus } =
  actions;

export default reducer;
