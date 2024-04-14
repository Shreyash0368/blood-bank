import {
  createSlice,
  createSelector,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

const bloodUnitsAdapter = createEntityAdapter({
  sortComparer: (a, b) => new Date(b.date) - new Date(a.date),
  selectId: (entity) => entity._id
});

const initialState = bloodUnitsAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const createUnit = createAsyncThunk(
  "bloodUnits/createUnit",
  async (donationData) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_SERVER_PATH + "/blood/createUnit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(donationData),
        }
      );

      if (!response.ok) {
        throw new Error(JSON.stringify({status: response.status, messgae: response.statusText}));
      }
      const data = await response.json();
      console.log(data);
      return data.savedUnit;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAll = createAsyncThunk("bloodUnits/getAll", async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_PATH}/blood/getAll`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("error");
    }
    const data = await response.json();
    return data.units;
  } catch (error) {
    console.log(error);
  }
});

export const bloodUnitsSlice = createSlice({
  name: "bloodUnits",
  initialState,
  reducers: {
    placeholder(state, action) {
      //do nothing
    }
  },
  extraReducers(builder) {
    builder      
      .addCase(getAll.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.status = "fulfilled";
        bloodUnitsAdapter.upsertMany(state, action.payload);
      })
      .addCase(getAll.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(createUnit.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createUnit.fulfilled, (state, action) => {
        state.status = "fulfilled";
        bloodUnitsAdapter.addOne(state, action.payload);
      })
      .addCase(createUnit.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      
  },
});

export const { selectAll: selectAllUnits} = bloodUnitsAdapter.getSelectors(
  (state) => state.bloodUnits
);
export const selectByType = createSelector(
  [selectAllUnits, (state, blood_type) => blood_type],
  (units, blood_type) => units.filter((unit) => unit.blood_type === blood_type)
);

// export const selectIds = createSelector([selectAllUnits])

export const selectByDonorId = createSelector([selectAllUnits, (state, donor_id) => donor_id],
    (units, donor_id) => units.filter(unit => unit.donor_id === donor_id)
)

export default bloodUnitsSlice.reducer;
