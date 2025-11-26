import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import authService from "~/services/authService";
import userService from "~/services/userService";

export const signIn = createAsyncThunk("auth/signIn", async ({ username, password }, { dispatch }) => {
  const res = await authService.signIn(username, password);
  const user = await dispatch(fetchMe()).unwrap();
  const { accessToken } = res;
  const infoUser = { accessToken, ...user };
  return infoUser;
});

export const signOut = createAsyncThunk("auth/signOut", async () => {
  const res = await authService.signOut();

  return res;
});

export const fetchMe = createAsyncThunk("auth/fetchMe", async () => {
  const user = await userService.fetchMe();
  return user;
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    loading: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })

      .addCase(signOut.pending, (state) => {
        state.loading = true;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.currentUser = null;
        state.loading = false;
      });
  },
});

export const authSelect = (state) => {
  return state.auth;
};

export const currentUserSelect = (state) => {
  return state.auth.currentUser;
};

export const authReducer = authSlice.reducer;
