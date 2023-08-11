import {
  FETCH_ALL_DISTRICTS,
  FETCH_APPLICANT_IMAGE,
  FETCH_APPOINTMENT,
  FETCH_APPROVED_APPLICANTS,
  FETCH_AVAILABLE_DATES,
  FETCH_DISTRICT_HOLYDAYS,
  FETCH_NATIONAL_ID,
  FETCH_SELECTED_STATE,
  FETCH_SINGLE_DISTRICT,
  FETCH_SINGLE_EMPLOYEE,
  FETCH_UNAPPROVED_APPLICANTS,
  FETCH_WORKING_HOURS,
  GET_ALL_USER,
  GET_EMPLOYEE__SUCCESS,
  LOGOUT_USER,
  UNAPPROVED_APPLICANTS
} from "./loginActions";


const reducer = (state, action) => {
 /// login
 if (action.type === "CLEAR_THE_STATE") {
  return {
    ...state,
   User:""
  };
}
if (action.type === "LOGIN_BEGIN") {
  return {
    ...state,
   isLoading:true
  };
}
if (action.type === "LOGIN_SUCCESS") {
  return {
    ...state,
    User: action.payload.res.data,
    isLoading:false

  };
}
if (action.type === "LOGIN_FAIL") {
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
            nationalID: action.payload.data,     
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

               // fetch all unapproved
         if (action.type === FETCH_UNAPPROVED_APPLICANTS) {
          return {
            ...state,
            unapprovedApplicants: action.payload.data,
            
          };
        }
         if (action.type === FETCH_APPROVED_APPLICANTS) {
          return {
            ...state,
            approvedApplicants: action.payload.data,
            
          };
        }


        // get unapproved applicant information
             // get national Id     
             if (action.type === UNAPPROVED_APPLICANTS) {
              return {
                ...state,
                applicantInfo: action.payload.data,     
              };
            }

             // fetch all district holydays
    if (action.type === FETCH_DISTRICT_HOLYDAYS) {
      return {
        ...state,
        districtHolydays: action.payload.data,
      };
    }

    // fetch applicant image
    if (action.type === FETCH_APPLICANT_IMAGE) {
      return {
        ...state,
        applicantImage: action.payload.data,     
      };
    }
    // fetch appointemts
    if (action.type === FETCH_APPOINTMENT) {
      return {
        ...state,
        appointments: action.payload.data,     
      };
    }
    if (action.type === "GET_APPROVED") {
      return {
        ...state,
        allApproved: action.payload.data,     
      };
    }
    // fetch daily applicants
    if (action.type === "FETCH_DAILY") {
      return {
        ...state,
        dailyApplicants: action.payload.data,   
        isLoading:false,  
      };
    }
    // fetch monthly applicants
    if (action.type === "FETCH_MONTHLY") {
      return {
        ...state,
        monthlyApplicants: action.payload.data,   
        isLoading:false,  
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