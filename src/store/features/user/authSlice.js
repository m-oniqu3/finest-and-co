import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  isAnonymous: false,
  email: null,
  providerID: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { id, isAnonymous, email, providerID } = action.payload;
      state.id = id;
      state.isAnonymous = isAnonymous;
      state.email = email;
      state.providerID = providerID;
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
