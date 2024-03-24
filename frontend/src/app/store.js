import { configureStore } from '@reduxjs/toolkit'
import bloodUnitsReducers from '../features/bloddUnits/bloodUnitsSlice'
import userReducers from '../features/donor/userSlice'
export default configureStore({
  reducer: {
    bloodUnits : bloodUnitsReducers,
    user: userReducers
  },
})