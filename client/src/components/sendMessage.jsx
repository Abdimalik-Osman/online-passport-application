// export default Stepper;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import HorizontalStepper from "./horizontalStepper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import HorizontalStepper from "./horizontalStepper";
import { useSelector } from "react-redux";

import {
  appReset,
  getApplicantInfo,
  sendMessage
} from "../app/applicantSlice";
import {
  useAppDispatch
} from "../app/districtSlice";

function SendMessage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate("/");
  const [message1, setMessage] = useState("");
  const [appointmentNumber, setAppointmentNumber] = useState("");
  const [districtId, setDistrictId] = useState("");
  const {
    status,
    error,
    message,
    nationalID,
    districts,
    selectedState,
    unavailableDates,
    availableDates,
    districtData,
    workingHours,
    isError,
    isSuccess,
    isLoading,
  } = useSelector((state) => state.district);
  const appMessage = useSelector((state) => state.applicant.message);
  const applicantInfo = useSelector((state) => state.applicant.applicantInfo);
  const appStatus = useSelector((state) => state.applicant.status);
  const errorMessage = useSelector((state) => state.applicant.error);
  const isAppError = useSelector((state) => state.applicant.isError);
  const isAppSuccess = useSelector((state) => state.applicant.isSuccess);
  const isAppLoading = useSelector((state) => state.applicant.isLoading);
  useEffect(() => {

    if (isAppError) {
      toast.error(errorMessage?.message);
        // dispatch(appReset());
    }
    if (isAppSuccess) {
      toast.success(appMessage?.message);
        // dispatch(appReset());
    }
    return () => {
      // dispatch(reset());
      dispatch(appReset());
    };
  }, [
    
    dispatch,
    isAppError,
    isAppSuccess,
    appMessage,
    errorMessage
  ]);
  const handleClick = async () => {
    dispatch(getApplicantInfo(appointmentNumber));
    if (error?.status === "fail" || error?.status == "fail") {
      toast.error(error.message);
      console.log(error);
      return;
    }
    // setDistrictId(applicantInfo?.districtId);

    // const data = {
    //   id,
    //   appointmentDate
    // }
  };
  // handle submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    const text = "This is a sample string of text.";
    // Remove leading and trailing whitespaces using trim()
    const trimmedText = text.trim();
    // Split the string into an array of words using split()
    const wordsArray = trimmedText.split(/\s+/);
    // Count the number of words in the array using length
    const wordCount = wordsArray.length;
    // console.log(data);
    if (!message1) {
      toast.error("please provide all required fields.");
      return;
    }
    // if (wordCount < 13) {
    //   toast.error("your message must be at least 13 characters.");
    //   return;
    // }
    const data ={
      id:applicantInfo?._id,
      message:message1
    }
    console.log(data);
    dispatch(sendMessage(data));
    // dispatch(updateAppointment(data))
  };

  // console.log(applicantInfo)
  return (
    <>
     <div className="bg-cyan-900 w-100 h-100 py-10 text-white lg:px-12 ">
        <ToastContainer />
          <form className=" shadow-2xl px-4 " onSubmit={handleSubmit}>
          <div className="border-b border-gray-900/10 pb-6">

            <h2 className="text-base font-extrabold leading-9 text-white">
              SENDING MESSAGE REQUEST
            </h2>
            <p className="mt-1 text-sm leading-6 text-white">
             YOU CAN SEND THIS MESSAGE ONLY WHEN ITS YOUR APPOINTMENT DATE AND APPOINTMENT TIME.
            </p>
            <b>NB:</b> YOUR MESSAGE CAN'T BE LESS THAN 12 WORDS.
            <div className="grid grid-cols-4 gap-2">
        
       {
        !applicantInfo || !applicantInfo?.districtId && (
          <>
          <div className="col-span-2">
                {/* <label
                  htmlFor="nID"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  NATIONAL ID
                </label> */}
                <input
                  type="text"
                  name="appointmentNumber"
                  placeholder="Enter Your appointment Number"
                  value={appointmentNumber}
                  onChange={(e) => setAppointmentNumber(e.target.value)}
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {/* {validationErrors.nID && (
        <span className="text-danger">{validationErrors.nID}</span>
      )} */}
              </div>

              <div className="col-span-2 lg:col-span-1">
                <button
                  type="button"
                  onClick={handleClick}
                  className="w-full sm:w-auto rounded-md bg-sky-500 w-100 py-2   text-sm font-semibold text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700">
                  GET
                </button>
              </div>
          </>
        )
       }

            {
              applicantInfo && applicantInfo?.districtId && (
                <>
                <div className="col-span-4 lg:col-span-4">
                {/* <label
                  htmlFor="nID"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  NATIONAL ID
                </label> */}
                <textarea
                  type="text"
                  name="message1"
                  placeholder="Enter Your Message"
                  value={message1}
                  rows={3}
                  onChange={(e) => setMessage(e.target.value)}
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {/* {validationErrors.nID && (
        <span className="text-danger">{validationErrors.nID}</span>
      )} */}
              </div>

              <div className="col-span-2 lg:col-span-1">
                <button
                  type="submit"
                  
                  className="w-full sm:w-auto rounded-md bg-sky-500 w-100 py-2   text-sm font-semibold text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700">
                  SEND MESSAGE
                </button>
              </div>
                </>
              )
            }
              </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default SendMessage;
