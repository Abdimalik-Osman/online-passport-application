import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const url = "http://localhost:4000/api/applicants";

// const formData = {
//   firstName:"", lastName:"", pob:"", dob:"", nID:""
//  }

// Define the initial state for your slice
const initialState = {
  applicants: [],
  newApplicants: [],
  singleApplicant: {},
  status: 'idle',
  
  message:"",
  error: null
};

// Define your async actions using createAsyncThunk
export const getApplicants = createAsyncThunk('applicants/all', async (_,thunkAPI) => {
  try{
    const response = await axios.get(url+"/all");
    return response.data;
  }catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message); 
}
});
// get single applicant
export const getSingleApplicant = createAsyncThunk('applicants/single', async (id,thunkAPI) => {
  try{
  const response = await axios.get(url+`/single/${id}`);
  return response.data;
  }catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message); 
}
});

// add new applicant
export const addNewApplicant = createAsyncThunk('applicants/add', async (data,thunkAPI) => {

    try{
      const response = await axios.post(url+'/add', data);
      return response.data;
      
  }catch (err) {
      const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
      return thunkAPI.rejectWithValue(message); 
  }
  });
  
  // update applicant
  // get single applicant
  export const updateApplicant = createAsyncThunk('applicants/update', async (data,thunkAPI) => {
      try{
      const response = await axios.patch(url+`/update/${data.id}`);
      return response.data;
      }catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
        return thunkAPI.rejectWithValue(message); 
    }
    });

  // delete applicant
  export const deleteApplicant = createAsyncThunk('applicants/delete', async (id,thunkAPI) => {
      try{
        const response =  await axios.delete(url+`/delete/${id}`);
          return response.data;
  
  }catch (err) {
      const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
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
export const applicantSlice = createSlice({
  name: 'applicants',
  initialState,
  reducers:{
    reset:(state)=> initialState,
    getData:(state)=> {
      
    }
},
  extraReducers: (builder) => {
    builder
      .addCase(getApplicants.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getApplicants.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.applicants = action.payload;
      })
      .addCase(getApplicants.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.message = action.payload;
      })
      .addCase(getSingleApplicant.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSingleApplicant.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.singleApplicant = action.payload;
        
      })
      .addCase(getSingleApplicant.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.message = action.payload;
      })
      .addCase(addNewApplicant.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addNewApplicant.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.applicants.push(action.payload);
        // state = initialState
      })
      .addCase(addNewApplicant.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.message = action.payload;
      })
      
      .addCase(updateApplicant.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateApplicant.fulfilled, (state, action) => {
        const { _id, ...updatedItem } = action.payload;
        const existingItem = state.applicants.find((item) => item._id === _id);
        if (existingItem) {
          Object.assign(existingItem, updatedItem);
        }
      })
      .addCase(updateApplicant.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.message = action.payload;
      })
      .addCase(deleteApplicant.pending, (state) => {
        state.status = 'loading';
      })
       .addCase(deleteApplicant.fulfilled, (state, action) => {
        const index = state.applicants.findIndex((app) => app._id === action.payload);
        if (index !== -1) {
          state.applicants.splice(index, 1);
        }
      })
      .addCase(deleteApplicant.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.message = action.payload;
      })

    //   .addCase(addItem.fulfilled, (state, action) => {
    //     state.applicants.push(action.payload);
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

export const {reset} = applicantSlice.actions;

// Export the slice and the useAppDispatch hook
export default applicantSlice.reducer;
export const useAppDispatch = () => useDispatch();