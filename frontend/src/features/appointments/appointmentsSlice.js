import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  error : null,
  pendingAppointments: [],
};

export const addDonorAppointment = createAsyncThunk(
  "appointments/addDonorAppointment",
  async (appointmentData, thunkAPI) => {
    const { date, donor_name, units, blood_type } = appointmentData;

    try {
      const appointment = await fetch(
        `${import.meta.env.VITE_SERVER_PATH}/appointments/addAppointment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("bloodBankAuth"),
          },
          body: JSON.stringify({ date, donor_name, units, blood_type }),
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
        state.status = 'idle',
        state.pendingAppointments.push(action.payload);
    })
    .addCase(addDonorAppointment.rejected, (state, action) => {
        state.status = 'rejected',
        state.error = action.error;
    })
  },
});

export default appointmentsSlice.reducer;
