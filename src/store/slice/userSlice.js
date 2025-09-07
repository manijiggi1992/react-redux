import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: { data: [], loading: false },
  reducers: {
    fetchUsersStart: (state) => { state.loading = true; },
    fetchUsersSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
  },
});

export const { fetchUsersStart, fetchUsersSuccess } = userSlice.actions;
export default userSlice.reducer;
