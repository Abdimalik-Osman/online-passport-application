import React, { useEffect, useState } from "react";
import {BrowserRouter,Route,Routes} from "react-router-dom"
import MultiStepForm from './components/stepper/stepper';
import ViewApplicant from "./components/viewApplicant";
import StepperOne from './components/stepper/stepper1';
import StepperTwo from './components/stepper/stepper2';
import StepperThree from './components/stepper/stepper3';
import StepperFour from "./components/stepper/stepper4";
import UpdateAppointment from "./components/updateAppointment";
import SendMessage from "./components/sendMessage";

function App() {
  const steps = [
   <StepperOne />,
    <StepperTwo />,
    <StepperThree />,
    <StepperFour />
  ];

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MultiStepForm />} />
      <Route path="/view" element={<ViewApplicant />} />
      <Route path="/update" element={<UpdateAppointment />} />
      <Route path="/send" element={<SendMessage />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App;
