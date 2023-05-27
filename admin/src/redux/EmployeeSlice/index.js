import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const url = "http://localhost:4000/api/employees";

// const formData = {
//   firstName:"", lastName:"", pob:"", dob:"", nID:""
//  }

// Define the initial state for your slice
const initialState = {
  employees: [],
  empData: [],
  status: 'idle',
  message:"",
  error: null
};

// Define your async actions using createAsyncThunk
export const fetchEmployees = createAsyncThunk('employees/all', async (_,thunkAPI) => {
  try{
    const response = await axios.get(url+"/all");
    return response.data;
  }catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message); 
}
});
// get single employee
export const getSingleEmployee = createAsyncThunk('employees/single', async (id,thunkAPI) => {
  try{
  const response = await axios.get(url+`/single/${id}`);
  return response.data;
  }catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message); 
}
});


//add new employee

export const addEmployee = createAsyncThunk('employee/add', async (data,thunkAPI) => {

  try{
    const response = await axios.post('/add', data);
    return response.data;
    
}catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message); 
}
});

// update employee
// get single employee
export const updateEmployee = createAsyncThunk('employees/update', async (data,thunkAPI) => {
    try{
    const response = await axios.patch(url+`/update/${data.id}`);
    return response.data;
    }catch (err) {
      const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
      return thunkAPI.rejectWithValue(message); 
  }
  });

// export const updateItem = createAsyncThunk('items/updateItem', async (item) => {
//   const response = await axios.put(`/api/items/${item._id}`, item);
//   return response.data;
// });
// delete employee
export const deleteEmployee = createAsyncThunk('employees/delete', async (id,thunkAPI) => {
    try{
      const response =  await axios.delete(`/delete/${id}`);
        return response.data;

}catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message); 
}
});

// Define your slice using createSlice
export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers:{
    reset:(state)=> initialState,
    getData:(state)=> {
      
    }
},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.districts = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.message = action.payload;
      })
      .addCase(getSingleEmployee.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSingleEmployee.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.empData = action.payload;
        
      })
      .addCase(getSingleEmployee.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.message = action.payload;
      })
      .addCase(addEmployee.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.employees.push(action.payload);
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.message = action.payload;
      })
      
      .addCase(updateEmployee.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const { _id, ...updatedItem } = action.payload;
        const existingItem = state.items.find((item) => item._id === _id);
        if (existingItem) {
          Object.assign(existingItem, updatedItem);
        }
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.message = action.payload;
      })
      .addCase(deleteEmployee.pending, (state) => {
        state.status = 'loading';
      })
       .addCase(deleteEmployee.fulfilled, (state, action) => {
        const index = state.employees.findIndex((emp) => emp._id === action.payload);
        if (index !== -1) {
          state.employees.splice(index, 1);
        }
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.message = action.payload;
      })
    //   .addCase(deleteItem.fulfilled, (state, action) => {
    //     const index = state.items.findIndex((item) => item._id === action.payload);
    //     if (index !== -1) {
    //       state.items.splice(index, 1);
    //     }
    //   });
  }
});

// Export your async action creators

export const {reset} = employeeSlice.actions;

// Export the slice and the useAppDispatch hook
export default employeeSlice.reducer;
export const useAppDispatch = () => useDispatch();