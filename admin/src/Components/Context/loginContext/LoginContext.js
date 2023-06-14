import axios from "axios";
import { createContext, useReducer, useRef, useMemo } from "react";
import jwtDecode from "jwt-decode";
import moment from "moment";

import { useReactToPrint, ReactToPrint } from "react-to-print";
import "react-toastify/dist/ReactToastify.css";
import {
 
    
    DELETE_EMPLOYEE_SUCCESS,
    GET_EMPLOYEE__SUCCESS,
    // FETCH_GETBYIDEMPLOYEE_SUCCESS,
    FETCH_EMPLOYEE_REPORT,
    FETCH_SINGLE_EMPLOYEE,
    REGISTER_EMPLOYEE_ERROR,
    REGISTER_EMPLOYEE_SUCCESS, 
    REGISTER_USER, GET_ALL_USER,
    LOGOUT_USER,
    FETCH_SINGLE_DISTRICT,
    FETCH_WORKING_HOURS,
    FETCH_ALL_DISTRICTS ,
    FETCH_SELECTED_STATE ,
    FETCH_NATIONAL_ID ,
    FETCH_UNAVAILABLE_HOURS ,
    FETCH_AVAILABLE_DATES ,
    FETCH_AVAILABLE_DATES_ERROR, 
    FETCH_UNAPPROVED_APPLICANTS,
    
    UNAPPROVED_APPLICANTS

} from "./loginActions";
import reducer from "./loginReducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";

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
  localStorage.setItem("_id", "");
  localStorage.setItem("useeer", "");
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
  localStorage.setItem("user", "");
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
  nationalID:{},
  data:{},
  applicantInfo:{}
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
  const fetchUnapprovedApplicants = async () => {
    try {
      const data = await axios.get("/applicants/unapproved/all");
      dispatch({ type: FETCH_UNAPPROVED_APPLICANTS, payload: { data } });
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
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
 
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
        updateApplicantInfo
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default AppProvider;
