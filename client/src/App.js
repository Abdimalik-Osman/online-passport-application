import React, { useEffect, useState } from "react";
import MultiStepForm from './components/stepper/stepper';
import Appointment from "./components/appointment";
import StepperOne from './components/stepper/stepper1';
import StepperTwo from './components/stepper/stepper2';
import StepperThree from './components/stepper/stepper3';
import StepperFour from "./components/stepper/stepper4";
function App() {
  const steps = [
   <StepperOne />,
    <StepperTwo />,
    <StepperThree />,
    <StepperFour />
  ];

  return (
    <div className="">
 <MultiStepForm />
    </div>
    // <div className="container">
    //   <h1>hello </h1>
    //   <div className="row">
    //     <Select
    //       className="w-50"
    //       options={options}
    //       value={selectedOptions}
    //       onChange={handleChange1}
    //     />
    //     <Select
    //       className="w-50"
    //       options={options2}
    //       value={selectedOptions2}
    //       onChange={handleChange2}
    //     />
    //   </div>
    //   <hr />
    //   <br />
    //   {/* <button className='btn btn-sm btn-dark mt-3' onClick={handleSubmit}>GET DATA</button> */}
    //   {/* <DistrictDetail district={selectedDistrict}/> */}

    //   <div className="row">
    //     <div className="col">
    //       {selectedDistrict.length > 0 &&
    //         selectedDistrict?.map((item) => (
    //           <div className="">
    //             <h5>District Name: {item.districtName}</h5>
    //             <p>Office Name: {item.office}</p>
    //             <p>Location: {item.location}</p>
    //             <p>contact Number: {item.contactNumber}</p>
    //             <p>start Time: {item.startTime}</p>
    //             <p>End Time: {item.endTime}</p>
    //             <p>
    //               Number of people to be worked every day: {item.dailySlots}
    //             </p>
    //             <p>Hourly Slots: {item.hourlySlots}</p>
    //             <p>start Time: {item.startTime}</p>
    //           </div>
    //         ))}
    //     </div>
    //     <div className="col">
    //   <h5>working hours</h5>
    //   {workingHours.length > 0 &&
    //     workingHours?.map((item) => (
    //       <div key={item.startTime} className="">
    //         <div className="form-group">
    //           <input
    //             type="radio"
    //             name="time"
    //             value={item.startTime}
    //             id={item.startTime}
    //             className="mx-2"
    //             checked={selectedTime === item.startTime}
    //             onChange={handleTimeChange}
    //           />
    //           <label htmlFor={item.startTime}>
    //             {item.startTime} ------- {item.endTime}{" "}
    //           </label>
    //         </div>
    //       </div>
    //     ))}
    // </div>
    // <div className="col">
    //   <Appointment unavailableDates={unavailableDates} />
    // </div>
    //   </div>
    // </div>
  );
}

export default App;
