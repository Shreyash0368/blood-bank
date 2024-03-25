import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  auth: null,
  data: null,
  role: null,
  status: "idle",
  error: null,
};


export const fetchDonor = createAsyncThunk(
  "user/fetchDonor",
  async (authToken) => {
    try {
      const donor = await fetch(
        `${import.meta.env.VITE_SERVER_PATH}/donor/getDonor`,
        {
          method: "GET",
          headers: {
            Authorization: authToken,
          },
        }
      );

      if (!donor.ok) {
        console.log(donor);
        throw new Error("error");
      }

      const donorData = await donor.json();
      console.log(donorData);

      return donorData;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state, action) {
      state.id = null;
      state.status = "idle";
      state.auth = null;
      state.role = null;
      state.data = null;
      state.error = null;
      
    },
    setAuth(state, action) {
      state.auth = action.payload;
    },
    decodeAuth(state, action) {
      state.role = action.payload.role;
      state.data = action.payload.donor;
      state.id = action.payload.donor._id;
    },
    
  },
  extraReducers(builder) {
    builder      
      .addCase(fetchDonor.fulfilled, (state, action) => {
        state.data = action.payload.donor;
        state.role = action.payload.role;
        state.id = action.payload.donor._id;
        state.status = "auth-fetched";
      })
      .addCase(fetchDonor.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchDonor.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
          
  },
});

export default userSlice.reducer;
export const {logout, setAuth, decodeAuth} = userSlice.actions
export const selectAuthToken = (state) => state.user.auth;
export const selectUserStatus = (state) => state.user.status;
export const selectRole = (state) => state.user.role;
export const selectUserId = (state) => state.user.id;
