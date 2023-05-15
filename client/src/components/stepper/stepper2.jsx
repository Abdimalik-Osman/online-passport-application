import React, { useState } from 'react';

const StepTwo = ({ nextStep }) => {
  const [contactNumber, setContact] = useState('');
  const [cName, setCName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    nextStep();
  };

  return (
     <form>
      <div className="border-b border-gray-900/10 pb-6">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Personal Information
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Use a permanent address where you can receive mail.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
   

          {/* CONTACT NUMBER */}
          <div className="sm:col-span-3">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-gray-900">
              YOUR CONTACT NUMBER
            </label>
            <div className="mt-2">
              <input
                type="number"
                name="contactNumber"
                value={""}
                autoComplete="contact number"
                className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {/* EMAIL */}
          <div className="sm:col-span-3">
            <label
              htmlFor="last-name"
              className="block text-sm font-medium leading-6 text-gray-900">
              YOUR E-MAIL
            </label>
            <div className="mt-2">
              <input
                type="email"
                name="email"
                value={""}
                autoComplete="email"
                className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {/* EMERGENCY CONTACT NAME */}
          <div className="sm:col-span-3">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-gray-900">
             EMERGENCY CONTACT NAME
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="emergency-contact-name"
                value={""}
                autoComplete="given-name"
                className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {/*EMERGENCY CONTACT NUMBER */}
          <div className="sm:col-span-3">
            <label
              htmlFor="mLname"
              className="block text-sm font-medium leading-6 text-gray-900">
              EMERGENCY CONTACT NUMBER
            </label>
            <div className="mt-2">
              <input
                type="number"
                name="emergency-contact-number"
                value={""}
                autoComplete="family-name"
                className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

      
      
        </div>
        {/* <div class="sm:col-span-3 flex justify-center">
  <button
    type="button"
    onClick={""}
    className="w-full sm:w-auto rounded-md bg-indigo-600 w-50 py-2 mt-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
    PREVIOUS
  </button>
  <button
    type="button"
    onClick={""}
    className="w-full sm:w-auto rounded-md bg-indigo-600 w-50 py-2 mt-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
    NEXT
  </button>
</div> */}
      </div>
    </form>
  );
};

export default StepTwo;