import React, { useState } from 'react';
import StepOne from './stepper1';
import StepTwo from './stepper2';
import StepThree from './stepper3';
import { ProgressBar } from 'react-bootstrap';
import HorizontalStepper from './horizontalStepper';
// import StepFour from './';
const Stepper = () => {
  const [step, setStep] = useState(1);
    const [currentStep, setCurrentStep] = useState(1);
  
    const nextStep = () => {
      setStep(step + 1);
      setCurrentStep(currentStep + 1);
    };
  
    const prevStep = () => {
      setStep(step - 1);
      setCurrentStep(currentStep - 1);
    };
  
    const renderStep = () => {
      switch (currentStep) {
        case 1:
          return <StepOne nextStep={nextStep} />;
        case 2:
          return <StepTwo nextStep={nextStep} prevStep={prevStep} />;
        case 3:
          return <StepThree nextStep={nextStep} prevStep={prevStep} />;
        // case 4:
        //   return <StepFour prevStep={prevStep} />;
        default:
          return null;
      }
    };
  
    return <div>
    <HorizontalStepper />

     {/* <ProgressBar now={step * 33.33} /> */}
    {renderStep()}</div>;
  };
  
  export default Stepper;