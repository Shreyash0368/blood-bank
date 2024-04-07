import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
        if (donor.status === 422) {
          return thunkAPI.rejectWithValue('expired');
        }
        else {
          throw new Error("error");
        }
      }

      const donorData = await donor.json();

      return donorData;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchRole = createAsyncThunk("user/fetchRole", async (authToken) => {
  try {
    const role = await fetch(
      `${import.meta.env.VITE_SERVER_PATH}/user/getRole`,
      {
        method: "GET",
        headers: {
          Authorization: authToken,
        },
      }
    );

    if (!role.ok) {      
      throw new Error("error");      
    }
    
    const roleVal = await role.json();
    return roleVal;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.message);
  }

})

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

      // clearing local storage
      localStorage.removeItem("bloodBankAuth");
      localStorage.removeItem("role");
      localStorage.removeItem("donorData");
    },
    setAuth(state, action) {
      state.auth = action.payload;
    },
    decodeAuth(state, action) {
      state.role = action.payload.role;
      state.data = action.payload.donor;
      state.id = action.payload.donor._id;
    },
    setDonorFromLocal(state, action) {
      state.data = JSON.parse(localStorage.getItem('donorData'));
      state.role = localStorage.getItem('role');
      state.id = JSON.parse(localStorage.getItem('donorData'))._id;
    },    

  },
  extraReducers(builder) {
    builder
      .addCase(fetchDonor.fulfilled, (state, action) => {
        state.data = action.payload.donor;
        state.role = action.payload.role;
        state.id = action.payload.donor._id;
        state.status = "auth-fetched";        

        if (localStorage.getItem('donorData') === null || (localStorage.getItem('role') ) === null) {
          localStorage.setItem('donorData', JSON.stringify(action.payload.donor));
          localStorage.setItem('role', action.payload.role);
        }
      })
      .addCase(fetchDonor.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchDonor.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(fetchRole.fulfilled, (state, action) => {
        state.role = action.payload.role;
        localStorage.setItem('role', action.payload.role);
      })
  },
});

export default userSlice.reducer;
export const { logout, setAuth, decodeAuth, setDonorFromLocal} = userSlice.actions;
export const selectAuthToken = (state) => state.user.auth;
export const selectUserStatus = (state) => state.user.status;
export const selectRole = (state) => state.user.role;
export const selectUserId = (state) => state.user.id;
export const selectDonorData = (state) => state.user.data;
export const selectUserError = (state) => state.user.error;
