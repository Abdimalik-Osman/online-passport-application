import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const url = "http://localhost:4000/api"
// Define the initial state for your slice
const initialState = {
  districts: [],
  selectedState:[],
  districtData: {},
  workingHours: [],
  unavailableDates: [],
  status: 'idle',
  error: null
};

// Define your async actions using createAsyncThunk
export const fetchData = createAsyncThunk('districts/all', async () => {
  const response = await axios.get(url+"/districts/all");
  return response.data;
});
// get single distinct
export const getSingleDistrict = createAsyncThunk('districts/single', async (id) => {
  const response = await axios.get(url+`/districts/single/${id}`);
  return response.data;
});
// get selected district data
export const getDistrictData = createAsyncThunk('districts/data', async (id) => {
  const response = await axios.get(url+`/districts/single/${id}`);
  return response.data;
});

// get the selected district working hours
export const getDistrictWorkingHours = createAsyncThunk('districts/workingHours', async (id) => {
  const response = await axios.get(url+`/workingHours/hours/single/${id}`);
  return response.data;
});
// get the un available date every district
export const getUnavailableDates = createAsyncThunk('applicants/unavailable', async (id) => {
  const response = await axios.get(url+`/applicants/date/unavailable/all/${id}`);
  return response.data;
});

// export const addItem = createAsyncThunk('items/addItem', async (item) => {
//   const response = await axios.post('/api/items', item);
//   return response.data;
// });

// export const updateItem = createAsyncThunk('items/updateItem', async (item) => {
//   const response = await axios.put(`/api/items/${item._id}`, item);
//   return response.data;
// });

// export const deleteItem = createAsyncThunk('items/deleteItem', async (id) => {
//   await axios.delete(`/api/items/${id}`);
//   return id;
// });

// Define your slice using createSlice
export const districtSlice = createSlice({
  name: 'districts',
  initialState,
  reducers:{
    reset:(state)=> initialState,
},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.districts = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getSingleDistrict.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSingleDistrict.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.districtData = action.payload;
      })
      .addCase(getSingleDistrict.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getDistrictData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getDistrictData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedState = action.payload;
      })
      .addCase(getDistrictData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getDistrictWorkingHours.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getDistrictWorkingHours.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.workingHours = action.payload;
      })
      .addCase(getDistrictWorkingHours.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getUnavailableDates.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUnavailableDates.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.unavailableDates = action.payload;
      })
      .addCase(getUnavailableDates.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
    //   .addCase(addItem.fulfilled, (state, action) => {
    //     state.districts.push(action.payload);
    //   })
    //   .addCase(updateItem.fulfilled, (state, action) => {
    //     const { _id, ...updatedItem } = action.payload;
    //     const existingItem = state.items.find((item) => item._id === _id);
    //     if (existingItem) {
    //       Object.assign(existingItem, updatedItem);
    //     }
    //   })
    //   .addCase(deleteItem.fulfilled, (state, action) => {
    //     const index = state.items.findIndex((item) => item._id === action.payload);
    //     if (index !== -1) {
    //       state.items.splice(index, 1);
    //     }
    //   });
  }
});

// Export your async action creators

export const {reset} = districtSlice.actions;

// Export the slice and the useAppDispatch hook
export default districtSlice.reducer;
export const useAppDispatch = () => useDispatch();