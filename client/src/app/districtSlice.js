import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const url = "http://localhost:4000/api";

// const formData = {
//   firstName:"", lastName:"", pob:"", dob:"", nID:""
//  }

// Define the initial state for your slice
const initialState = {
  districts: [],
  selectedState:{},
  districtData: {},
  workingHours: [],
  unavailableDates: [],
  availableDates: [],
  nationalID:{},
  data:{},
  status: 'idle',
  message:"",
  error: null
};

// Define your async actions using createAsyncThunk
export const fetchData = createAsyncThunk('districts/all', async (_,thunkAPI) => {
  try{
    const response = await axios.get(url+"/districts/all");
    return response.data;
  }catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message); 
}
});
// get single distinct
export const getSingleDistrict = createAsyncThunk('districts/single', async (id,thunkAPI) => {
  try{
  const response = await axios.get(url+`/districts/single/${id}`);
  return response.data;
  }catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message); 
}
});
// get selected district data
export const getDistrictData = createAsyncThunk('districts/data', async (id,thunkAPI) => {
  try{
  const response = await axios.get(url+`/districts/single/${id}`);
  return response.data;
  }catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message); 
}
});
// get selected district data
export const getDistrictInfo = createAsyncThunk('districts/data/single', async (id,thunkAPI) => {
  try{
  const response = await axios.get(url+`/districts/state/single/data/info/${id}`);
  return response.data;
  }catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message); 
}
});

// get the selected district working hours
export const getDistrictWorkingHours = createAsyncThunk('districts/workingHours', async (id,thunkAPI) => {
  try{
  const response = await axios.get(url+`/workingHours/hours/single/${id}`);
  return response.data;
  }catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message); 
}
});
// get the un available date every district
export const getUnavailableDates = createAsyncThunk('applicants/unavailable', async (id,thunkAPI) => {
  try{
  const response = await axios.get(url+`/applicants/date/unavailable/all/${id}`);
  return response.data;
  }catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message); 
}
});
// get the un available date every district
export const getAvailableDates = createAsyncThunk('applicants/availableDates', async (data,thunkAPI) => {
  try{
  const response = await axios.post(url+`/applicants/dates/availableTime/all`,data);
  return response.data;
  }catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message); 
}
});
// get national ID
export const getNationalId = createAsyncThunk('profile/national', async (id,thunkAPI) => {
  try{
  const response = await axios.get(url+`/profile/person/${id}`);
  return response.data;
  }catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    // console.log(err.message);
    return thunkAPI.rejectWithValue(message); 
}
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
    getData:(state)=> {
      
    }
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
        state.message = action.payload;
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
        state.message = action.payload;
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
        state.message = action.payload;
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
        state.message = action.payload;
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
        state.message = action.payload;
      })
      .addCase(getNationalId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getNationalId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.nationalID = action.payload;
      })
      .addCase(getNationalId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.message = action.payload;
      })
      .addCase(getDistrictInfo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getDistrictInfo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedState = action.payload;
      })
      .addCase(getDistrictInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.message = action.payload;
      })
      .addCase(getAvailableDates.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAvailableDates.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.availableDates =action.payload
      })
      .addCase(getAvailableDates.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.message = action.payload;
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