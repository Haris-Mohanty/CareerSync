import { createSlice } from "@reduxjs/toolkit";

// Create user slice
export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, actions) => {
      state.user = actions.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

// Export
export const { setUser, clearUser } = userSlice.actions;
