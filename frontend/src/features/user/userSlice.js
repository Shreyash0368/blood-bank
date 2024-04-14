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
  async (authToken, thunkAPI) => {
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
        console.log({
          status: donor.status,
          message: donor.statusText,
        });
        return thunkAPI.rejectWithValue({
          status: donor.status,
          message: donor.statusText,
        });
      }

      const userData = await donor.json();

      return userData;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchRole = createAsyncThunk(
  "user/fetchRole",
  async (authToken, thunkAPI) => {
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
        console.log({
          status: role.status,
          message: role.statusText,
        });
        return thunkAPI.rejectWithValue({
          status: role.status,
          message: role.statusText,
        });
      }

      const roleVal = await role.json();
      return roleVal;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchStaff = createAsyncThunk(
  "user/fetchStaff",
  async (authToken, thunkAPI) => {
    try {
      const staff = await fetch(
        `${import.meta.env.VITE_SERVER_PATH}/staff/getStaff`,
        {
          method: "GET",
          headers: {
            Authorization: authToken,
          },
        }
      );

      if (!staff.ok) {
        console.log({
          status: staff.status,
          message: staff.statusText,
        });
        return thunkAPI.rejectWithValue({
          status: staff.status,
          message: staff.statusText,
        });
      }

      const staffData = await staff.json();
      return staffData;
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

      // clearing local storage
      localStorage.removeItem("bloodBankAuth");
      localStorage.removeItem("role");
      localStorage.removeItem("userData");
    },
    setAuth(state, action) {
      state.auth = action.payload;
    },
    decodeAuth(state, action) {
      state.role = action.payload.role;
      state.data = action.payload.donor;
      state.id = action.payload.donor._id;
    },
    setUserFromLocal(state, action) {
      state.data = JSON.parse(localStorage.getItem("userData"));
      state.role = localStorage.getItem("role");
      state.id = JSON.parse(localStorage.getItem("userData"))._id;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchDonor.fulfilled, (state, action) => {
        state.data = action.payload.donor;
        state.role = action.payload.role;
        state.id = action.payload.donor._id;
        state.status = "fullfilled";

        if (
          localStorage.getItem("userData") === null ||
          localStorage.getItem("role") === null
        ) {
          localStorage.setItem(
            "userData",
            JSON.stringify(action.payload.donor)
          );
          localStorage.setItem("role", action.payload.role);
        }
      })
      .addCase(fetchDonor.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchDonor.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(fetchStaff.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.role = action.payload.role;
        state.id = action.payload.user._id;
        state.status = "fullfilled";

        if (
          localStorage.getItem("userData") === null ||
          localStorage.getItem("role") === null
        ) {
          localStorage.setItem("userData", JSON.stringify(action.payload.user));
          localStorage.setItem("role", action.payload.role);
        }
      })
      .addCase(fetchStaff.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchStaff.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(fetchRole.fulfilled, (state, action) => {
        state.role = action.payload.role;        
        localStorage.setItem("role", action.payload.role);
      });
  },
});

export default userSlice.reducer;
export const { logout, setAuth, decodeAuth, setUserFromLocal } =
  userSlice.actions;
export const selectAuthToken = (state) => state.user.auth;
export const selectUserStatus = (state) => state.user.status;
export const selectRole = (state) => state.user.role;
export const selectUserId = (state) => state.user.id;
export const selectUserData = (state) => state.user.data;
export const selectUserError = (state) => state.user.error;
