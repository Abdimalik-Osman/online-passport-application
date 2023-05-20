import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { getNationalId, useAppDispatch } from "../../app/districtSlice";
import StepTwo from "./stepper2";

export default function StepperOne() {
  const[formData,setFormData]= useState({
    nID:"", fName:"", lName:"", mFname:"", mLname:"",
    dob:"", pob:"", status:"", occupation:"", sex:""
  })
  const dispatch = useAppDispatch();
  const [nId, setId] = useState();
  const [selectedSex, setSelectedSex] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const status = useSelector((state) => state.district.status);
  const error = useSelector((state) => state.district.error);
  const message = useSelector((state) => state.district.message);
  const nationalID = useSelector((state) => state.district.nationalID);

  let mFirstName = "";
  let mLastName = "";
  let firstName = "";
  let lastName = "";
  if (nationalID) {
    if (status != "failed" || status === "loading") {
      const text = nationalID?.fullName;
      const fullname = text?.split(" ");
      const motherName = nationalID?.motherName;
      const motherFullname = motherName?.split(" ");

      const fname = fullname?.[0];
      const secondName = fullname?.[1];
      firstName = fname?.concat(" ", secondName);
      lastName = fullname?.[2];
      // ----------------
      const mFname = motherFullname?.[0];
      const mSecondName = motherFullname?.[1];
      mFirstName = mFname?.concat(" ", mSecondName);
      mLastName = motherFullname?.[2];
    }
  }

  const handleChange = (e) => {
    setId(e.target.value);
    
    const { name, value, type, checked } = e.target;

  // Merge the new data with the existing data
  const updatedFormData = { ...formData, [name]: value };
  setFormData(updatedFormData)
  };
  const handleClick = async () => {
    dispatch(getNationalId(nId));
    const defaultSex = (await nationalID?.sex) === "Male" ? "Male" : "Female";
    setSelectedSex(defaultSex);
    const apiDate = new Date(nationalID?.DOB);
    console.log() // convert date string to date object
    setSelectedDate(apiDate?.toISOString()?.substr(0, 10));
    setFormData({
      ...formData, fName:firstName, lName:lastName, mFname:mFirstName,mLname:mLastName,sex:defaultSex, nID:nId, dob:apiDate?.toISOString()?.substr(0, 10)
    })
  };

  console.log(formData);
  // console.log(status);

  return (
    <div>
       <ToastContainer />
    <form>
      <div className="border-b border-gray-900/10 pb-6">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Personal Information
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Use a permanent address where you can receive mail.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-6 m-0">
          <div className="sm:col-span-4 sm:col-start-1">
            <label
              htmlFor="nID"
              className="block text-sm font-medium leading-6 text-gray-900">
              NATIONAL ID
            </label>
            <div className="">
              <input
                type="text"
                name="nID"
                value={formData.nID}
                onChange={handleChange}
                autoComplete="address-level2"
                className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <button
              type="button"
              onClick={handleClick}
              className="btn btn-primary btn-sm w-100 py-2 mt-4">
              check
            </button>
          </div>

          {/* //FIRST NAME */}
          <div className="sm:col-span-3">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-gray-900">
              First name
            </label>
            <div className="">
              <input
                type="text"
                name="fName"
                value={firstName}
              onChange={handleChange}
                autoComplete="given-name"
                className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {/* LAST NAME */}
          <div className="sm:col-span-3">
            <label
              htmlFor="last-name"
              className="block text-sm font-medium leading-6 text-gray-900">
              Last name
            </label>
            <div className="">
              <input
                type="text"
                name="lName"
                value={lastName}
                onChange={handleChange}
                autoComplete="family-name"
                className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {/* //MOTHER FIRST NAME */}
          <div className="sm:col-span-3">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-gray-900">
              MOTHER'S FIRST NAME
            </label>
            <div className="">
              <input
                type="text"
                name="mFname"
                value={mFirstName}
                autoComplete="given-name"
                className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {/*MOTHER'S LAST NAME */}
          <div className="sm:col-span-3">
            <label
              htmlFor="mLname"
              className="block text-sm font-medium leading-6 text-gray-900">
              MOTHER'S LAST NAME
            </label>
            <div className="">
              <input
                type="text"
                name="mLname"
                value={mLastName}
                autoComplete="family-name"
                className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {/* sex */}
          <div className="sm:col-span-2">
            <p className="mt-1 text-sm leading-6 text-gray-600">
              SELECT YOUR SEX.
            </p>
            <input
              type="radio"
              name="sex"
              checked={selectedSex === "Male"}
              onChange={handleChange}
              className="h-4 w-4 border-gray-300 mx-2 text-indigo-600 focus:ring-indigo-600"
            />
            <label
              htmlFor="mLname"
              className="text-sm mr-5 font-medium leading-6 text-gray-900">
              MALE
            </label>
            <input
              type="radio"
              name="sex"
              // value={nationalID?.sex}
              checked={selectedSex === "Female"}
              onChange={handleChange}
              className="h-4 w-4 border-gray-300 mx-2 text-indigo-600 focus:ring-indigo-600"
            />
            <label
              htmlFor="sex"
              className="text-sm font-medium leading-6 mx-2 text-gray-900">
              FEMALE
            </label>
          </div>
          {/* occupation */}
          <div className="sm:col-span-2">
            <label
              htmlFor="country"
              className="block text-sm font-medium leading-6 text-gray-900">
              SELECT YOUR OCCUPATION
            </label>
            <div className="">
              <select
                id="occupation"
                name="occupation"
                autoComplete=""
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                <option value={"Student"} >Student</option>
                <option value={"Employee"}>Employee</option>
                <option value={"Others"}>Others</option>
              </select>
            </div>
          </div>

          {/* <div className="sm:col-span-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div> */}

          {/* nationality */}
          <div className="sm:col-span-2">
            <label
              htmlFor="country"
              className="block text-sm font-medium leading-6 text-gray-900">
              SELECT COUNTRY
            </label>
            <div className="">
              <select
                id="country"
                name="country"
                autoComplete="country-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                <option>SOMALIA</option>
                <option>Canada</option>
                <option>Mexico</option>
              </select>
            </div>
          </div>

          {/* MARITAL STATUS */}
          <div className="sm:col-span-2">
            <label
              htmlFor="country"
              className="block text-sm font-medium leading-6 text-gray-900">
              MARITAL STATUS
            </label>
            <div className="">
              <select
                id="status"
                name="status"
                autoComplete="country-name"
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                <option value={"Single"} >Single</option>
                <option value={"Husband"}>Husband</option>
                <option value={"Widow"}>Widow</option>
              </select>
            </div>
          </div>
          {/* place of birth */}
          <div className="sm:col-span-2">
            <label
              htmlFor="country"
              className="block text-sm font-medium leading-6 text-gray-900">
              DATE OF BIRTH
            </label>

            <div className="">
              <input
                type="date"
                id="dob"
                name="dob"
                value={selectedDate}
                // onChange={(event) => setSelectedDate(event.target.value)}
                onChange={handleChange}
                autoComplete="email"
                className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* place of birth */}
          <div className="sm:col-span-2">
            <label
              htmlFor="pob"
              className="block text-sm font-medium leading-6 text-gray-900">
              PLACE OF BIRTH
            </label>
            <div className="">
              <input
         
                type="text"
                name="pob"
                value={formData.pob}
                onChange={handleChange}
                autoComplete="place of birth"
                className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* <div className="col-span-full">
            <label
              htmlFor="street-address"
              className="block text-sm font-medium leading-6 text-gray-900">
              Street address
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="street-address"
                id="street-address"
                autoComplete="street-address"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2 sm:col-start-1">
            <label
              htmlFor="city"
              className="block text-sm font-medium leading-6 text-gray-900">
              City
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="city"
                id="city"
                autoComplete="address-level2"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="region"
              className="block text-sm font-medium leading-6 text-gray-900">
              State / Province
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="region"
                id="region"
                autoComplete="address-level1"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="postal-code"
              className="block text-sm font-medium leading-6 text-gray-900">
              ZIP / Postal code
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="postal-code"
                id="postal-code"
                autoComplete="postal-code"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div> */}
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
    
    </div>
  );
}
