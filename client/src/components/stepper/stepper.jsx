import React, { useState } from 'react';
import HorizontalStepper from './horizontalStepper';
const Stepper = ({ steps }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  return (
  <div>
  <HorizontalStepper />
   {steps[activeStep]}
   <div>
  {activeStep && <button
    type="button"
   
    disabled={activeStep === 0} onClick={handleBack}
    className="w-full sm:w-auto rounded-md bg-indigo-600 w-25 py-2 mb-5 mx-14 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
    PREVIOUS
  </button>}
  <button
    type="button"
    style={{ marginLeft: activeStep === 0 && "100px"}}
    disabled={activeStep === steps.length - 1}  onClick={handleNext}
    className="w-full sm:w-auto rounded-md bg-indigo-600 w-25 py-2 mb-5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
    NEXT
  </button>
  </div>
</div>

  );
};

export default Stepper;