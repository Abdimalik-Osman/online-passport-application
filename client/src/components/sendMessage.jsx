// export default Stepper;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
// import HorizontalStepper from "./horizontalStepper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalShow from "./stepper/Modal";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";


function SendMessage() {
  const navigate = useNavigate("/");
  const [message, setMessage] = useState("");

 
  // handle submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // console.log(data);
    if (
      !message
    ) {
      toast.error("please provide all required fields.");
      return;
    }
    // const data ={
    //   appointmentDate,
    //   id:applicantInfo?._id
    // }
    // dispatch(updateAppointment(data))
  };

  // console.log(applicantInfo)
  return (
    <>
      {/* <HorizontalStepper isOpen={isOpen} /> */}
      <div className="bg-cyan-900 w-100 h-100 py-10 text-white lg:px-12 ">
        <ToastContainer />
          <form className=" shadow-2xl px-4 " onSubmit={handleSubmit}>
          <div className="border-b border-gray-900/10 pb-6">

            <h2 className="text-base font-extrabold leading-9 text-white">
              SEND MESSAGE 
            </h2>
            <p className="mt-1 text-sm leading-6 text-white">
             IF YOU HAVE CHALLENGE AT YOUR APPOINTMENT DATE OR TIME, YOU CAN SEND A MESSAGE TO.
            </p>
            <div className="sm:col-span-2 mt-4" >
                <button
                  type="submit"
                  
                  className="w-full sm:w-auto rounded-md bg-sky-500 w-100 py-2   text-sm font-semibold text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700">
                  UPDATE
                </button>
              </div>
             
            
          </div>
        </form>
      </div>
    </>
  );
}

export default SendMessage;
