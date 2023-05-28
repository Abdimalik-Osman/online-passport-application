import {
    GET_EMPLOYEE__SUCCESS,
    DELETE_EMPLOYEE_SUCCESS,
    FETCH_GETBYIDEMPLOYEE_SUCCESS,
    FETCH_EMPLOYEE_REPORT,
    FETCH_SINGLE_EMPLOYEE,
    REGISTER_EMPLOYEE_ERROR,
    REGISTER_EMPLOYEE_SUCCESS,
    LOGOUT_USER,
    GET_ALL_USER,
    FETCH_SINGLE_DISTRICT,
    FETCH_WORKING_HOURS,
    FETCH_ALL_DISTRICTS ,
    FETCH_SELECTED_STATE ,
    FETCH_NATIONAL_ID ,
    FETCH_UNAVAILABLE_HOURS ,
    FETCH_AVAILABLE_DATES ,
    FETCH_AVAILABLE_DATES_ERROR 
    
}  from "./loginActions"


const reducer = (state, action) => {
 /// login
 if (action.type === "CLEAR_THE_STATE") {
  return {
    ...state,
   User:""
  };
}
if (action.type === "REGISTER_LOGIN_BEGIN") {
  return {
    ...state,
   isLoading:true
  };
}
if (action.type === "REGISTER_LOGIN") {
  return {
    ...state,
    User: action.payload.res.data,
    isLoading:false

  };
}
if (action.type === "REGISTER_LOGIN_Fail") {
  return {
    ...state,
   
    isLoading:false

  };
}
if (action.type === LOGOUT_USER) {
  return {
    ...state,
    User: null,
  };
}
if (action.type === "REGISTER_USER_BEGINN") {
  return {
    ...state,
    isLoading: true,
  };
}
if (action.type === "REGISTER_USER_BEGINN") {
  return {
    ...state,
  
    userLoading: true,
  };
}
if (action.type === GET_ALL_USER) {
  return {
    ...state,
    allUsers: action.payload.data,
    userLoading: false,
  };
}
    // fetch all employees
    if (action.type === GET_EMPLOYEE__SUCCESS) {
        return {
          ...state,
          getEmployees: action.payload.data,
        };
      }
    
      // fetch single employee
      if (action.type === FETCH_SINGLE_EMPLOYEE) {
        return {
          ...state,
          singleEmployee: action.payload.data,
        };
      }

         // fetch single district
         if (action.type === FETCH_SINGLE_DISTRICT) {
          return {
            ...state,
            selectedState: action.payload.data,
          };
        }
      
         // fetch all districts
         if (action.type === FETCH_ALL_DISTRICTS) {
          return {
            ...state,
            districts: action.payload.data,
            
          };
        }


        // get national Id     
         if (action.type === FETCH_NATIONAL_ID) {
          return {
            ...state,
            nationalId: action.payload.data,     
          };
        }
        // get working hours   
         if (action.type === FETCH_WORKING_HOURS) {
          return {
            ...state,
            workingHours: action.payload.data,     
          };
        }
          // get available dates  
          if (action.type === FETCH_AVAILABLE_DATES) {
            return {
              ...state,
              availableDates: action.payload.data,     
            };
          }
          // get selected state  
          if (action.type === FETCH_SELECTED_STATE) {
            return {
              ...state,
              districtData: action.payload.data,     
            };
          }
      //register
  //       if (action.type === REGISTER_EMPLOYEE_SUCCESS) {
  //   return {
  //     ...state,
  //     Employees: action.payload.data,
  //   };
  // }
    return state;
};

export default reducer;