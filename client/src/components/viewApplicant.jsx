import React, { useEffect, useState } from "react";
// import { CircularProgressbar } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "../components/view.css";
// import HorizontalStepper from "./horizontalStepper";
// Import react-circular-progressbar module and styles
// Import react-circular-progressbar module and styles
import {
  CircularProgressbar,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Animation

// Radial separators
// Animation

// Radial separators
import {
  appReset,
  getApplicantInfo,
  sendMessage
} from "../app/applicantSlice";
import {
  useAppDispatch
} from "../app/districtSlice";

import { useSelector } from "react-redux";
const ViewApplicant = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [appointmentNumber, setAppointmentNumber] = useState("");
  const [progress, setProgress] = React.useState(0);

  const handleProgressChange = (event) => {
    setProgress(event.target.value);
  };
  const dispatch = useAppDispatch();
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
  const applicantInfo = useSelector((state) => state.applicant.applicantInfo);
  const appMessage = useSelector((state) => state.applicant.message);
  const appStatus = useSelector((state) => state.applicant.status);
  const errorMessage = useSelector((state) => state.applicant.error);
  const isAppError = useSelector((state) => state.applicant.isError);
  const isAppSuccess = useSelector((state) => state.applicant.isSuccess);
  const isAppLoading = useSelector((state) => state.applicant.isLoading);

  const [message1, setMessage] = useState("");

  
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

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("test")
  //   dispatch(getApplicantInfo({appointmentNumber:"APPT1007"}));
  //   if(errorMessage?.status == "fail" || errorMessage?.status ==="fail"){
  //     console.log(errorMessage);
  //     toast.error(errorMessage?.message)
  //   }
  //   console.log(applicantInfo);
  // }
  

  const percentage = applicantInfo?.ratio;

  // <CircularProgressbar value={percentage} maxValue={1} text={`${percentage * 100}%`} />;
//   <CircularProgressbar
//   value={percentage}
//   text={`${percentage}%`}
//   styles={{
//     // Customize the root svg element
//     root: {},
//     // Customize the path, i.e. the "completed progress"
//     path: {
//       // Path color
//       stroke: `rgba(62, 152, 199, ${percentage / 100})`,
//       // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
//       strokeLinecap: 'butt',
//       // Customize transition animation
//       transition: 'stroke-dashoffset 0.5s ease 0s',
//       // Rotate the path
//       transform: 'rotate(0.25turn)',
//       transformOrigin: 'center center',
//     },
//     // Customize the circle behind the path, i.e. the "total progress"
//     trail: {
//       // Trail color
//       stroke: '#d6d6d6',
//       // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
//       strokeLinecap: 'butt',
//       // Rotate the trail
//       transform: 'rotate(0.25turn)',
//       transformOrigin: 'center center',
//     },
//     // Customize the text
//     text: {
//       // Text color
//       fill: '#f88',
//       // Text size
//       fontSize: '16px',
//     },
//     // Customize background - only used when the `background` prop is true
//     background: {
//       fill: '#3e98c7',
//     },
//   }}
// />
  return (
    <>
    {/* <ToastContainer /> */}
    <div className="bg-cyan-900 w-100 h-100 py-10 text-white lg:px-12 ">
    <ToastContainer />
          <form className=" shadow-2xl px-4 " onSubmit={handleSubmit}>
          <div className="border-b border-gray-900/10 pb-6">

            <h2 className="text-base font-extrabold leading-9 text-white">
              APPLICANT STATUS
            </h2>
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
              </div>
          </div>
        </form>
        </div>
  {
    applicantInfo && applicantInfo?.districtId  && (
      <>
      <div className="shadow-lg px-2  bg-cyan-900 py-10  text-white" style={{height:"605px"}}>
    <h4 className="text-center">VIEW APPLICANT STATUS</h4>
      <div className="">
        {/* <div className="circle">
          <div className="mask full">
            <div className="fill"></div>
          </div>
          <div className="mask half">
            <div className="fill"></div>
          </div>
          <div className="inside-circle"> {applicantInfo?.ratio}% </div>
        </div> */}
        <div style={{ width: 180, height: 180, marginLeft:"80px" }}>
    {/* <CircularProgressbar value={applicantInfo?.ratio} /> */}
    <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          strokeLinecap: "butt"
        })}
      />
</div>
      </div>
   <div className="px-5">
   <div className="flex gap-2 mt-5">
  
  <h2 className="text-lg " >Full Name:</h2>
  <p className="text-md mt-1 ml-4">{applicantInfo?.fullname}</p>
</div>

<div className="flex gap-2">

  <h2 className="text-lg">Appointment Number:</h2>
  <p className="text-md mt-1 ml-4">{appointmentNumber}</p>

</div>
<div className="flex gap-2 ">


  <h2 className="text-lg">Phone Number:</h2>
  <p className="text-md mt-1 ml-4">{applicantInfo?.phoneNumber}</p>
</div>

<div className="flex gap-2 ">


  <h2 className="text-lg">Application Type:</h2>
  <p className="text-md mt-1 ml-4">New</p>

</div>
<div className="flex gap-2  ">


  <h2 className="text-lg text-justify">Application Status</h2>
  <p className="text-md mt-1 ml-4">{applicantInfo?.isApproved ? "Approved":"Pending"}</p>
  </div>

   </div>
  </div>
      </>
    )
  }

    </>
  );
};

export default ViewApplicant;
