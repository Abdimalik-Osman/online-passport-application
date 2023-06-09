import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {  appReset,useAppDispatch, getApplicantInfo
} from "../app/applicantSlice";
import { useSelector } from "react-redux";
const ViewApplicant = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [appointmentNumber, setAppointmentNumber] = useState("");
  const dispatch = useAppDispatch();
  const applicantInfo = useSelector((state) => state.applicant.applicantInfo);
  const appMessage = useSelector((state) => state.applicant.message);
  const appStatus = useSelector((state) => state.applicant.status);
  const errorMessage = useSelector((state) => state.applicant.error);
  const isAppError = useSelector((state) => state.applicant.isError);
  const isAppSuccess = useSelector((state) => state.applicant.isSuccess);
  const isAppLoading = useSelector((state) => state.applicant.isLoading);
  useEffect(()=>{
    if(isAppError){
      toast.error(errorMessage?.message);
    }
    return ()=>{
      dispatch(appReset())
    }
  },[isAppSuccess,isAppLoading,isAppError,errorMessage,dispatch])
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("test")
    dispatch(getApplicantInfo({appointmentNumber:"APPT1007",phoneNumber:"5535354"}));
    if(errorMessage?.status == "fail" || errorMessage?.status ==="fail"){
      console.log(errorMessage);
      toast.error(errorMessage?.message)
    }
    console.log(applicantInfo);
  }
  return (
    <>
    <ToastContainer />
    <form onSubmit={handleSubmit} className=" shadow-2xl px-5 ">
      <div className="border-b border-gray-900/10 pb-6">
        <h2 className="text-base font-extrabold leading-9 text-black">
          Personal Information
        </h2>
        <p className="mt-1 text-sm leading-6 text-black">
          Please fill your personal information.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-6 m-0">
          <div className="col-span-3 lg:col-span-2">
            <label
          htmlFor="appointmentNumber"
          className="block text-sm font-medium leading-6 text-gray-900">
         APPOINTMENT NUMBER
        </label>
            <input
              type="text"
              name="appointmentNumber"
              placeholder="Enter Your Appointment Number"
              value={appointmentNumber}
              onChange={(e) => setAppointmentNumber(e.target.value)}
              autoComplete="address-level2"
              className="block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="col-span-3 lg:col-span-2">
            <label
          htmlFor="phoneNumber"
          className="block text-sm font-medium leading-6 text-gray-900">
          Phone Number
        </label>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Enter Your Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              autoComplete="address-level2"
              className="block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div className="col-span-3 lg:col-span-2 mt-4">
            <button
              type="submit"
           
              className="w-full sm:w-auto rounded-md bg-sky-500 w-100 py-2   text-sm font-semibold text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700">
              VIEW
            </button>
          </div>
        </div>
      </div>
    </form>
    </>
  );
};

export default ViewApplicant;
