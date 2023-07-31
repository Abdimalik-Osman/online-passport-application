import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const url = "http://localhost:4000/api/applicants";

// const formData = {
//   firstName:"", lastName:"", pob:"", dob:"", nID:""
//  }

// Define the initial state for your slice
const initialState = {
  applicants: [],
  newApplicants: [],
  singleApplicant: {},
  applicantInfo:{},
  status: 'idle',
  holyDay:{},
  message:"",
  error: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
};

// Define your async actions using createAsyncThunk
export const getApplicants = createAsyncThunk('applicants/all', async (_,thunkAPI) => {
  try{
    const response = await axios.get(url+"/all");
    return response.data;
  }catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
    // const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    // return thunkAPI.rejectWithValue(message); 
}
});
// get single applicant
export const getSingleApplicant = createAsyncThunk('applicants/single', async (id,thunkAPI) => {
  try{
  const response = await axios.get(url+`/single/${id}`);
  return response.data;
  }catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);

}
});
export const getApplicantInfo = createAsyncThunk('applicants/view', async (appointmentNumber,thunkAPI) => {
  try{
  const response = await axios.get(url+`/view/${appointmentNumber}`);
  return response.data;
  }catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);

}
});

// add new applicant
export const addNewApplicant = createAsyncThunk('applicants/add', async (data,thunkAPI) => {

    try{
      const response = await axios.post(url+'/add', data);
      return response.data;
      
  }catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
      // const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
      // return thunkAPI.rejectWithValue(message); 
  }
  });
  
  // update applicant
  // get single applicant
  export const updateApplicant = createAsyncThunk('applicants/update', async (data,thunkAPI) => {
      try{
      const response = await axios.patch(url+`/update/${data.id}`);
      return response.data;
      }catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
        // const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
        // return thunkAPI.rejectWithValue(message); 
    }
    });
  // get single applicant
  export const uploadImage = createAsyncThunk('applicants/upload', async (data,thunkAPI) => {
      try{
      const response = await axios.post(url+`/upload`,data);
      return response.data;
      }catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
        // const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
        // return thunkAPI.rejectWithValue(message); 
    }
    });

  // delete applicant
  export const deleteApplicant = createAsyncThunk('applicants/delete', async (id,thunkAPI) => {
      try{
        const response =  await axios.delete(url+`/delete/${id}`);
          return response.data;
  
  }catch (err) {
      // const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
      // return thunkAPI.rejectWithValue(message); 
      return thunkAPI.rejectWithValue(err.response.data);
  }
  });
// check if its holyday
  export const checkIsHolyday = createAsyncThunk('holydays/single', async ({appointmentDate,id},thunkAPI) => {
    try{
    const response = await axios.get(`http://localhost:4000/api/holydays/single/${appointmentDate}/${id}`);
    console.log(response.data)
    return response.data;
    }catch (err) {
      // const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
      // return thunkAPI.rejectWithValue(message); 
      return thunkAPI.rejectWithValue(err.response.data);
  }
  });

    // update appointment
    export const updateAppointment = createAsyncThunk('appointment/update', async (data,thunkAPI) => {
      try{
      const response = await axios.patch(url+`/update/appointment/${data.id}`,data);
      return response.data;
      }catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
        // const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
        // return thunkAPI.rejectWithValue(message); 
    }
    });

    // send message
    export const sendMessage = createAsyncThunk('applicants/message', async (data,thunkAPI) => {

      try{
        const response = await axios.post(url+'/send/message', data);
        return response.data;
        
    }catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
        // const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
        // return thunkAPI.rejectWithValue(message); 
    }
    });
    

// Define your slice using createSlice
export const applicantSlice = createSlice({
  name: 'applicants',
  initialState,
  reducers:{
    appReset:(state)=> {
      state.isError =  false
      state.isSuccess = false
      state.isLoading = false
      state.error = null
      state.message = ""
    },
    getData:(state)=> {
      
    }
},
  extraReducers: (builder) => {
    builder
      .addCase(getApplicants.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getApplicants.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.applicants = action.payload;
        state.isSuccess = true;
        state.isLoading = false
        state.error = null;
      })
      .addCase(getApplicants.rejected, (state, action) => {
        state.status = 'failed';
        state.error =  action.payload;
        state.isLoading = false;
        state.isError = true;
        // state.message = action.payload;
      })
      .addCase(getSingleApplicant.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSingleApplicant.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isSuccess = true
        state.isLoading = false;
        state.singleApplicant = action.payload;
        state.error = null;
        
      })
      .addCase(getSingleApplicant.rejected, (state, action) => {
        state.status = 'failed';
        state.isError = true;
        state.isLoading = false;
        state.error =  action.payload;
        
        // state.message = action.payload;
      })
      .addCase(getApplicantInfo.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getApplicantInfo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isSuccess = true
        state.isLoading = false;
        state.applicantInfo = action.payload;
        state.error = null;
        
      })
      .addCase(getApplicantInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.isError = true;
        state.isLoading = false;
        state.error =  action.payload;
        
        // state.message = action.payload;
      })
      .addCase(addNewApplicant.pending, (state) => {
        state.isLoading = true;
        
        state.status = 'loading';
      })
      .addCase(addNewApplicant.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.applicants.push(action.payload);
        state.message = action.payload;
        state.error = null;
        state.isLoading = false;
        state.isSuccess = true;
        // state = initialState
      })
      .addCase(addNewApplicant.rejected, (state, action) => {
        state.status = 'failed';
        state.error =  action.payload;
        state.isLoading = false;
        state.isError = true
        // state.message = action.payload;
      })
      
      .addCase(updateApplicant.pending, (state) => {
        state.isLoading = true;
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
        state.isLoading = false;
        state.isError = true
        state.error =  action.payload;
        // state.message = action.payload;
      })
      .addCase(deleteApplicant.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
       .addCase(deleteApplicant.fulfilled, (state, action) => {
        const index = state.applicants.findIndex((app) => app._id === action.payload);
        if (index !== -1) {
          state.applicants.splice(index, 1);
        }
      })
      .addCase(deleteApplicant.rejected, (state, action) => {
        state.status = 'failed';
        state.error =  action.payload;
        state.isError = true
        state.isLoading = false
        // state.message = action.payload;
      })
      .addCase(checkIsHolyday.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true
        state.error = null;
      })
      .addCase(checkIsHolyday.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isSuccess = true;
        state.isLoading = false;
        // state.message = action.payload;;
        state.error = null;
        state.holyDay = action.payload;
      })
      .addCase(checkIsHolyday.rejected, (state, action) => {
        state.status = 'failed';
        state.error =  action.payload;
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(updateAppointment.pending, (state) => {
        state.isLoading = true;
        state.status = 'loading';
      })
      .addCase(updateAppointment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // state.applicants.push(action.payload);
        state.message = action.payload;
        state.error = null;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateAppointment.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.isError = true
        state.error =  action.payload;
        // state.message = action.payload;
      })

      .addCase(uploadImage.pending, (state) => {
        state.isLoading = true;
        
        state.status = 'loading';
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // state.applicants.push(action.payload);
        state.message = action.payload;
        state.error = null;
        state.isLoading = false;
        state.isSuccess = true;
        // state = initialState
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.status = 'failed';
        state.error =  action.payload;
        state.isLoading = false;
        state.isError = true
        // state.message = action.payload;
      })
      .addCase(sendMessage.pending, (state) => {
        state.isLoading = true;
        
        state.status = 'loading';
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // state.applicants.push(action.payload);
        state.message = action.payload;
        state.error = null;
        state.isLoading = false;
        state.isSuccess = true;
        // state = initialState
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.error =  action.payload;
        state.isLoading = false;
        state.isError = true
        // state.message = action.payload;
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

export const {appReset} = applicantSlice.actions;

// Export the slice and the useAppDispatch hook
export default applicantSlice.reducer;
export const useAppDispatch = () => useDispatch();