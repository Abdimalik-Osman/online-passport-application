import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNationalId, useAppDispatch } from "../../app/districtSlice";

export default function StepperOne() {
  let [amount,setAmount] = useState("150")
  const [type,setType] = useState("")
  const handleChange = (e) => {
    setType(e.target.value);
    if (e.target.value == "Ordinary") {
      setAmount("150")
    }if(e.target.value == "deg-deg"){
      setAmount("300")
    }
  }
  console.log(type)
  return (
    <form>
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Personal Information
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Use a permanent address where you can receive mail.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

      {/* type of passport  application */}
      <div className="sm:col-span-3">
            <label
              htmlFor="country"
              className="block text-sm font-medium leading-6 text-gray-900">
              Passport Application
            </label>
            <div className="">
              <select
                id="country"
                disabled={true}
                name="country"
                autoComplete="country-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                <option>New Application</option>
              </select>
            </div>
            </div>
          {/*  */}

          {/* type of passport */}
          <div className="sm:col-span-3">
            <label
              htmlFor="country"
              className="block text-sm font-medium leading-6 text-gray-900">
              SELECT PASSPORT TYPE
            </label>
            <div className="">
              <select
                id="country"
                name="type"
                autoComplete="country-name"
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                <option value={"Ordinary"}>Ordinary</option>
                <option value={"deg-deg"}>Deg Deg</option>
              </select>
            </div>
          </div>

{/* Amount */}
          <div className="sm:col-span-2">
            <label
              htmlFor="postal-code"
              className="block text-sm font-medium leading-6 text-gray-900">
              AMOUNT
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="amount"
                value={amount}
                disabled={true}
                id="postal-code"
                autoComplete="postal-code"
                className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div> 
        </div>
        {/* <div className="sm:col-span-6 flex justify-center">
  <button
    type="button"
    onClick={handleClick}
    className="w-full sm:w-auto rounded-md bg-indigo-600 w-50 py-2 mt-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
    Next
  </button>
</div> */}
      </div>
    </form>
  );
}
