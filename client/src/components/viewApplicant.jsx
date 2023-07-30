import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "../components/view.css"
import {  appReset,useAppDispatch, getApplicantInfo
} from "../app/applicantSlice";
import Table from 'react-bootstrap/Table'
import { useSelector } from "react-redux";
const ViewApplicant = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [appointmentNumber, setAppointmentNumber] = useState("");
  const [progress, setProgress] = React.useState(0);

  const handleProgressChange = (event) => {
    setProgress(event.target.value);
  };
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
    dispatch(getApplicantInfo({appointmentNumber:"APPT1007"}));
    if(errorMessage?.status == "fail" || errorMessage?.status ==="fail"){
      console.log(errorMessage);
      toast.error(errorMessage?.message)
    }
    console.log(applicantInfo);
  }

  return (
    <>
    <ToastContainer />

    <div className="shadow-lg px-2  bg-cyan-900 py-10  text-white" style={{height:"745px"}}>
    <h4 className="text-center">VIEW APPLICANT STATUS</h4>
      <div className="circle-wrap">
        <div className="circle">
          <div className="mask full">
            <div className="fill"></div>
          </div>
          <div className="mask half">
            <div className="fill"></div>
          </div>
          <div className="inside-circle"> 75% </div>
        </div>
      </div>
   <div className="px-5">
   <div className="flex gap-2 mt-5">
  
  <h2 className="text-lg " >Full Name:</h2>
  <p className="text-md mt-1 ml-4">Abdimalik Osman Hassan</p>
</div>

<div className="flex gap-2">

  <h2 className="text-lg">Appointment Number:</h2>
  <p className="text-md mt-1 ml-4">APPT1000</p>

</div>
<div className="flex gap-2 ">


  <h2 className="text-lg">Phone Number:</h2>
  <p className="text-md mt-1 ml-4">0616328920</p>
</div>

<div className="flex gap-2 ">


  <h2 className="text-lg">Application Type:</h2>
  <p className="text-md mt-1 ml-4">New</p>

</div>
<div className="flex gap-2  ">


  <h2 className="text-lg text-justify">Application Status</h2>
  <p className="text-md mt-1 ml-4">Approved</p>
  </div>

   </div>
  </div>

    </>
  );
};

export default ViewApplicant;
