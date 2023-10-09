import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthOpened: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    openAuth: (state) => {
      state.isAuthOpened = true;
    },
    closeAuth: (state) => {
      state.isAuthOpened = false;
    },
  },
});

export const { openAuth, closeAuth } = authSlice.actions;

export default authSlice.reducer;
