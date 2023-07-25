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
    if (!message) {
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
        <form
          onSubmit={handleSubmit}
          className="shadow-2xl px-4 mt-5"
          style={{ height: "616px" }}>
          <div className="border-b border-gray-900/10 pb-6">
            <h2 className="text-base font-extrabold leading-9 text-white text-center">
              SEND MESSAGE
            </h2>
            <p className="mt-1 text-sm leading-6 text-white text-center mb-5">
              IF YOU HAVE CHALLENGE AT YOUR APPOINTMENT DATE OR TIME, YOU CAN
              SEND A MESSAGE TO.
            </p>

  {/* <form className="mx-auto" onSubmit={handleSubmit}> */}
  <div className="form-group row">
    <label for="message" className="form-label">Message*</label> 
    <div className="col-sm-12 my-2">
      <textarea
        className="form-control"
        id="message"
        rows="3"
        // cols={50}
        placeholder="Enter your message here..."
      ></textarea>
    </div>
  </div>
  <button type="submit" className="btn btn-primary px-5">SEND MESSAGE</button>

          </div>
        </form>
      </div>
    </>
  );
}

export default SendMessage;
