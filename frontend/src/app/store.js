import { configureStore } from '@reduxjs/toolkit'
import bloodUnitsReducers from '../features/bloddUnits/bloodUnitsSlice'
import userReducers from '../features/user/userSlice'
import appointmentsReducers from '../features/appointments/appointmentsSlice'
export default configureStore({
  reducer: {
    bloodUnits : bloodUnitsReducers,
    user: userReducers,
    appointments: appointmentsReducers
  },
})