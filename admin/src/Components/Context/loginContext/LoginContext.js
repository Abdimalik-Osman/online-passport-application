import axios from "axios";
import { createContext, useReducer, useRef } from "react";

import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  DELETE_EMPLOYEE_SUCCESS,
  FETCH_ALL_DISTRICTS,
  FETCH_APPLICANT_IMAGE,
  FETCH_APPOINTMENT,
  FETCH_APPROVED_APPLICANTS,
  FETCH_AVAILABLE_DATES,
  FETCH_AVAILABLE_DATES_ERROR,
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
  REGISTER_EMPLOYEE_ERROR,
  REGISTER_EMPLOYEE_SUCCESS,
  REGISTER_USER,
  UNAPPROVED_APPLICANTS
} from "./loginActions";
import reducer from "./loginReducer";

export const LoginContext = createContext();
// const addToLocalStorage = (user) => {
//   localStorage.setItem("user", JSON.stringify(user));
//   localStorage.setItem("token", JSON.stringify(user.accessToken));
//   // localStorage.setItem("OTP", JSON.stringify(user.OTP));
// };
const addOTPToLocalStorage = (otp) => {
  localStorage.setItem("OTP", JSON.stringify(otp));
};
const getIDlocalStroge = (id, status, useeer) => {
  localStorage.setItem("_id", JSON.stringify(id));
  localStorage.setItem("status", JSON.stringify(status));
  localStorage.setItem("useeer", JSON.stringify(useeer));
};

const removeIDFromLocalStorage = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("useeer");
};
// addOTPToLocalStorage()
// const removeFromLocalStorage = () => {
//   localStorage.setItem("user", "");
//   localStorage.setItem("OTP", "");
// };

const addToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};
const removeFromLocalStorage = () => {
  localStorage.removeItem("user");
};
const user = localStorage.getItem("user");
const useeer = localStorage.getItem("useeer");
const ottp = localStorage.getItem("OTP");
console.log(user);
console.log(ottp);

const initialState = {
  User: user ? JSON.parse(user) : null,
//   Otp: ottp ? JSON.parse(ottp) : null,
  OTPNumber: "",
  allUsers: [],
  showAlert: false,
  showAlertText: "",
  items: [],
  getEmployees:[],
  employeeReport: [],
  Employees: [],
  singleEmployee:[],
  theUser: user && user != "undefined" ? JSON.parse(user) : null,
  isLoading: false,
  allUsers: [],
  districts: [],
  selectedState:{},
  districtData: {},
  workingHours: [],
  unavailableDates: [],
  availableDates: [],
  unapprovedApplicants: [],
  approvedApplicants: [],
  nationalID:{},
  data:{},
  applicantInfo:{},
  districtHolydays:[],
  applicantImage:{},
  appointments:[]
  // isLoading: false,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();

  const componentRef = useRef();

    // registering users
    const registerUser = async (user) => {
      // console.log(user);
      try {
        const res = await axios.post("/users/register", user);
        toast.success(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        dispatch({ type: REGISTER_USER });
        getAllUsers();
      } catch (error) {
        console.log(error);
      }
    };


    // get all users
    const getAllUsers = async () => {
      dispatch({ type: "REGISTER_USER_BEGINN" });
      try {
        const data = await axios.get("/users/all");
        dispatch({ type: GET_ALL_USER, payload: { data } });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    //update user
    const UpdateUser = async (user) => {
      console.log(user);
      try {
        const res = await axios.patch(`/users/update/${user.id}`, user);
        toast.success(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        dispatch({ type: REGISTER_USER });
        getAllUsers();
      } catch (error) {
        console.log(error);
      }
    };
    const getCurrentUserId = () => {
      const { _id } = localStorage.getItem("userData");
      //  let user= jwtDecode(jwt);
      return _id;
    };
    // login user
    const loginUser = async (user) => {
      // console.log(user);
      dispatch({ type: "REGISTER_LOGIN_BEGIN" });
      try {
        const res = await axios.post("/users/login", user);
        console.log(res);
        // console.log(res);
        if (res?.data?.status == "success") {
          addToLocalStorage(res);
        }
  
        dispatch({ type: "REGISTER_LOGIN", payload: { res } });
        if (res.status == "fail") {
          toast.error(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          console.log("ERRORRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR");
          return;
        } else {
          toast.success(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          console.log("sucesssssssssssssssssssssssssssssssssss");
        }
      } catch (error) {
        console.log(error);
      }
    };

    const logoutUser = () => {
      dispatch({ type: LOGOUT_USER });
      removeFromLocalStorage();
      removeIDFromLocalStorage();
      // removeCartItems()
    };
  // registering users
  const EmployeeRegister = async (data) => {
    console.log(data);
    try {
      const res = await axios.post("/employees/add", data);
      fetchEmployees();
      dispatch({ type: REGISTER_EMPLOYEE_SUCCESS });
      if (res.status == "success") {
        toast.success(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      dispatch({ type: REGISTER_EMPLOYEE_ERROR });
      console.log(error);
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  // Employee fetching
  const fetchEmployees = async () => {
    try {
      const data = await axios.get("/employees/all");
      dispatch({ type: GET_EMPLOYEE__SUCCESS, payload: { data } });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  ///delete employee
  const deleteEmployee = async (id) => {
    try {
      const res = await axios.delete(`/employees/delete/${id}`);
      dispatch({ type: DELETE_EMPLOYEE_SUCCESS });
      fetchEmployees();
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  // Update Employee
  const updateEmployee = async (data) => {
    console.log(data);
    try {
      const updatedEmp = await axios.patch(`/employees/update/${data.id}`, data);
      toast.success(updatedEmp.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      fetchEmployees();
      console.log(updatedEmp);
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(error);
    }
  };

  // get single employee
  const getSingleEmployee = async (id) => {
    try {
      const data = await axios.get(`/employees/single/${id}`);
      dispatch({ type: FETCH_SINGLE_EMPLOYEE, payload: { data } });
      // registerItemType();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // fetch states
  const fetchStates = async () => {
      try {
        const data = await axios.get("/districts/all");
        dispatch({ type: FETCH_ALL_DISTRICTS, payload: { data } });
        // console.log(data);
      } catch (error) {
        console.log(error);
        toast.error(error.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
  };

  // fetch single district
  const fetchSingleDistrict = async (id) => {
      try {
        const data = await axios.get(`/districts/single/${id}`);
        dispatch({ type: FETCH_SINGLE_DISTRICT, payload: { data } });
        console.log(data);
      } catch (error) {
        console.log(error);
        toast.error(error.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
  };
 // fetch working hours
 const fetchWorkingHours = async (id) => {
  try {
    const data = await axios.get(`/workingHours/hours/single/${id}`);
    dispatch({ type: FETCH_WORKING_HOURS, payload: { data } });
    // console.log(data);
  } catch (error) {
    console.log(error);
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};
 // fetch selected state
 const fetchSelectedState = async (id) => {
  try {
    const data = await axios.get(`/districts/state/single/data/info/${id}`);
    dispatch({ type: FETCH_SELECTED_STATE, payload: { data } });
    // console.log(data);
  } catch (error) {
    console.log(error);
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};
   // fetch available dates
const fetchAvailableDates = async (data) => {
    // console.log(data);
    try {
      const res = await axios.post("/applicants/dates/availableTime/all", data);
      // fetchEmployees();
      dispatch({ type: FETCH_AVAILABLE_DATES });
      if (res.status == "success") {
        toast.success(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      dispatch({ type: FETCH_AVAILABLE_DATES_ERROR });
      console.log(error);
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

// fetch national id
const fetchNationalId = async (id) => {
  try {
    const data = await axios.get(`/profile/person/${id}`);
    dispatch({ type: FETCH_NATIONAL_ID, payload: { data } });
    // console.log(data);
  } catch (error) {
    console.log(error);
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};

  // fetch unapproved applications
const fetchUnapprovedApplicants = async (user) => {
    try {
      const data = await axios.get(`/applicants/unapproved/all/${user.districtId}/${user.userId}`);
      dispatch({ type: FETCH_UNAPPROVED_APPLICANTS, payload: { data } });
      // console.log(data);
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
};
  // fetch approved applications
  const fetchApprovedApplicants = async (user) => {
    try {
      const data = await axios.get(`/applicants/approved/all/${user.districtId}/${user.userId}`);
      dispatch({ type: FETCH_APPROVED_APPLICANTS, payload: { data } });
      // console.log(data);
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
};

// approve
const fetchSingleUnapprovedApplicant = async (nID,phoneNumber) => {
  try {
    const data = await axios.get(`/applicants/pending/${nID}/${phoneNumber}`);
    dispatch({ type: UNAPPROVED_APPLICANTS, payload: { data } });
    // console.log(data);
  } catch (error) {
    console.log(error);
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};


// update applicant information
const updateApplicantInfo = async (data) => {
  // console.log(data);
  try {
    const updateApplicant = await axios.patch(`/applicants/update/${data.id}`, data);
    toast.success(updateApplicant.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
    // fetchEmployees();
    // console.log(updateApplicant);5
  } catch (error) {
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
    console.log(error);
  }
};
const uploadImage = async (image) => {
  console.log(image);
  try {
    const res = await axios.post("/applicants/upload", image);
    
    dispatch({ type: "UPLOAD_IMAGE_SUCCESS" });
    if (res.status == "success") {
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      console.log(res)
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  } catch (error) {
    dispatch({ type: "UPLOAD_IMAGE_FAIL" });
    console.log(error);
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};

  // registering district holydays
  const registerDistrictHolydays = async (data) => {
    console.log(data);
    try {
      const res = await axios.post("/districtHolydays/add", data);
      fetchDistrictHolydays();
      dispatch({ type: "REGISTER_DISTRICT_HOLYDAYS_SUCCESS" });
      if (res.status == "success") {
        toast.success(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        console.log(res)
        toast.error(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      dispatch({ type: REGISTER_EMPLOYEE_ERROR });
      console.log(error);
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  //  fetch district holydays
  const fetchDistrictHolydays = async () => {
    try {
      const data = await axios.get("/districtHolydays/all");
      dispatch({ type: FETCH_DISTRICT_HOLYDAYS, payload: { data } });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  ///delete district holyday
  const deleteDistrictHolyday = async (id) => {
    try {
      const res = await axios.delete(`/districtHolydays/delete/${id}`);
      dispatch({ type: "DELETE_DISTRICT_HOLYDAY_SUCCESS" });
      fetchDistrictHolydays();
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  // Update district holyday
  const updateDistrictHolyday = async (data) => {
    console.log(data);
    try {
      const updateDistrictHolyday = await axios.patch(`/districtHolydays/update/${data.id}`, data);
      toast.success(updateDistrictHolyday.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      fetchDistrictHolydays();
      console.log(updateDistrictHolyday);
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(error);
    }
  };
  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  // });
  const getApplicantImage = async (id) => {
    try {
      const data = await axios.get(`/applicants/images/${id}`);
      dispatch({ type: FETCH_APPLICANT_IMAGE, payload: { data } });
      // console.log(data);
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

// fetch appointments by districtId and appointment date
const getAppointment = async (appointmentDate,districtId) => {
  try {
    const data = await axios.get(`/applicants/appointment/all/${appointmentDate}/${districtId}`);
    dispatch({ type: FETCH_APPOINTMENT, payload: { data } });
    // console.log(data);
  } catch (error) {
    console.log(error);
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};
  // cancel appointment
  const cancelAppointmentFun = async (data) => {
    // console.log(data);
    try {
      const res = await axios.post(`/applicants/appointments/cancel`, data);
      console.log(res);
      if(res.status == "success") {
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }  else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
      // fetchDistrictHolydays();
      
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      // console.log(error);
    }
  };

  // 
  return (
    <LoginContext.Provider
      value={{
        ...state,
        EmployeeRegister,
        getSingleEmployee,
        updateEmployee,
        deleteEmployee,
        fetchEmployees,
        registerUser,
        getAllUsers,
        UpdateUser,
        loginUser,
        logoutUser,
        getCurrentUserId,
        fetchNationalId,
        fetchAvailableDates,
        fetchSelectedState,
        fetchWorkingHours,
        fetchSingleDistrict,
        fetchStates,
        fetchUnapprovedApplicants,
        fetchSingleUnapprovedApplicant,
        fetchApprovedApplicants,
        updateApplicantInfo,registerDistrictHolydays,fetchDistrictHolydays,deleteDistrictHolyday,updateDistrictHolyday,
        uploadImage,
        getApplicantImage,
        cancelAppointmentFun,
        getAppointment,
        
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default AppProvider;
