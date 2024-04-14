import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  error : null,
  pendingAppointments: [],
};

export const addDonorAppointment = createAsyncThunk(
  "appointments/addDonorAppointment",
  async (appointmentData, thunkAPI) => {
    const { date, donor_name, units, blood_type, sex } = appointmentData;

    try {
      const appointment = await fetch(
        `${import.meta.env.VITE_SERVER_PATH}/appointments/addAppointment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("bloodBankAuth"),
          },
          body: JSON.stringify({ date, donor_name, units, blood_type, sex }),
        }
      );

      if (!appointment.ok) {
        console.log({
          status: appointment.status,
          message: appointment.statusText,
        });
        return thunkAPI.rejectWithValue({
          status: appointment.status,
          message: appointment.statusText,
        });
      }

      const appointmentData = await appointment.json();
      return appointmentData.savedAppoint;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getDonorAppointments = createAsyncThunk("appointments/getDonorAppointments", async (authtoken, thunkAPI) => {
  try {
    if (!authtoken) {
      return thunkAPI.rejectWithValue("No Auth Token");
    }

    let result = await fetch(`${import.meta.env.VITE_SERVER_PATH}/appointments/getAppointment`, {
      method: "GET",
      headers : {
        "Authorization" : authtoken
      }
    });

    if (!result.ok) {
      console.log({
        status: result.status,
        message: result.statusText,
      });
      return thunkAPI.rejectWithValue({
        status: result.status,
        message: result.statusText,
      });
    }

    result = await result.json();
    return result.appointments;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})

export const getAllAppointments = createAsyncThunk('appointments/getAllAppointments', async (authtoken) => {
  try {
    if (!authtoken)  return thunkAPI.rejectWithValue("No Auth Token");

    const result = await fetch(`${import.meta.env.VITE_SERVER_PATH}/appointments/getAll`, {
      method: "GET",
      headers: {
        "Authorization" : authtoken
      }
    });

    if (!result.ok) {
      console.log({
        status: result.status,
        message: result.statusText,
      });
      return thunkAPI.rejectWithValue({
        status: result.status,
        message: result.statusText,
      });
    }

    const data = await result.json();
    return data.allAppointments;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);

  }
})

export const appointmentsSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(addDonorAppointment.pending, (state, action) => {
        state.status = 'pending'
    })
    .addCase(addDonorAppointment.fulfilled, (state, action) => {
        state.status = 'fullfilled',
        state.pendingAppointments.push(action.payload);
    })
    .addCase(addDonorAppointment.rejected, (state, action) => {
        state.status = 'rejected',
        state.error = action.error;
    })
    .addCase(getDonorAppointments.pending, (state, action) => {
        state.status = 'pending'
    })
    .addCase(getDonorAppointments.fulfilled, (state, action) => {
      if (state.status !== 'fullfilled') state.pendingAppointments = [...state.pendingAppointments, ...action.payload],
      state.status = 'fullfilled'
        
    })
    .addCase(getDonorAppointments.rejected, (state, action) => {
        state.status = 'rejected',
        state.error = action.error;
    })
    .addCase(getAllAppointments.pending, (state, action) => {
        state.status = 'pending'
    })
    .addCase(getAllAppointments.fulfilled, (state, action) => {
      if (state.status === 'fullfilled') return;
      if (state.status !== 'fullfilled') state.pendingAppointments = [...state.pendingAppointments, ...action.payload],
      state.status = 'fullfilled'
        
    })
    .addCase(getAllAppointments.rejected, (state, action) => {
        state.status = 'rejected',
        state.error = action.error;
    })
  },
});

export default appointmentsSlice.reducer;
export const selectPending = (state) => state.appointments.pendingAppointments;
export const selectAppointmentStatus = (state) => state.appointments.status;
