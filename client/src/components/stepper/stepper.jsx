// export default Stepper;
import React, { useEffect, useState } from "react";
import Joi from "joi";
import HorizontalStepper from "./horizontalStepper";
import { ToastContainer, toast } from "react-toastify";
import Modal from "./Modal"
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import {
  getNationalId,
  fetchData,
  getSingleDistrict,
  getDistrictWorkingHours,
  getUnavailableDates,
  getDistrictInfo,
  useAppDispatch,
  getAvailableDates,
} from "../../app/districtSlice";
function MultiStepForm() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOptions2, setSelectedOptions2] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [nID, setNID] = useState("");
  const [fName, setFname] = useState("");
  const [lName, setLName] = useState("");
  const [mFname, setMFname] = useState("");
  const [mLname, setMLname] = useState("");
  const [dob, setDob] = useState("");
  const [status1, setStatus] = useState("");
  const [pob, setPob] = useState("");
  const [occupation, setOccupation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactNumber, setEmergencyContactNumber] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [selectedState1, setSelectedState] = useState("");
  const [step, setStep] = useState(1);
  let [amount, setAmount] = useState("150");
  let [type, setType] = useState("");
  let [isChecked, setIsChecked] = useState(false);
  
  const [validationErrors, setValidationErrors] = useState({});
  const [formData, setFormData] = useState({
    nID: "",
    fName: "",
    lName: "",
    mFname: "",
    mLname: "",
    dob: "",
    pob: "",
    status: "",
    occupation: "",
    sex: "",
    status: "",
    status: "",
    phoneNumber: "",
    email: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    amount: "",
    type: "",
    districtId: "",
    appointmentDate: "",
    appointmentTime: "",
  });

  const [isOpen, setIsOpen] = useState(true);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    
    setIsOpen(false);
  }
  const schema = Joi.object({
    nID: Joi.string().required("National Identity can be empty"),
    phoneNumber: Joi.string().min(9).max(10).required(),
    // pob: Joi.string().required("Place of birth can not be empty"),
    emergencyContactName: Joi.string().required(
      "emergency Contact Name can not be empty"
    ),
    emergencyContactNumber: Joi.string().min(9).max(10).required(),
    appointmentDate: Joi.date().required("Appointment Date can not be empty"),
  });

  const dispatch = useAppDispatch();
  const [nId, setId] = useState();
  const [selectedSex, setSelectedSex] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const {
    status,
    error,
    message,
    nationalID,
    districts,
    selectedState,
    unavailableDates,
    availableDates,
    districtData,
    workingHours,
  } = useSelector((state) => state.district);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchData());
    }
  }, [status, dispatch, availableDates, availableDates, selectedState]);
  // console.log(districts)

  // handle the previous step
  const handlePrevious = () => {
    setStep(step - 1);
  };

  // handle changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setId(e.target.value);
    // setFormData({
    //   ...formData,
    //   [name]: value,
    // });
    // const { error } = schema.validate(formData, { abortEarly: false });
    // if (error) {
    //   const errors = {};
    //   error.details.forEach((err) => {
    //     errors[err.path[0]] = err.message;
    //   });
    //   setValidationErrors(errors);
    // } else {
    //   setValidationErrors({});
    // }

    // setType(e.target.value);
    // if (e.target.value == "Ordinary") {
    //   setAmount("150")
    // }if(e.target.value == "deg-deg"){
    //   setAmount("300")
    // }
  };

  const options = districts?.map((item) => ({
    value: item?.districtInfo[0]?._id,
    label: item?.stateName,
  }));
  const options2 =
    districtData?.length > 0 &&
    districtData?.map((item) => ({
      value: item?._id,
      label: item?.districtName,
    }));
  const handleChange1 = (selected) => {
    setSelectedOptions(selected);
    // setSelectedId(selected.value);

    dispatch(getSingleDistrict(selected.value));
    setSelectedOptions2([]);
  };
  const handleChange2 = (selected) => {
    setSelectedOptions2(selected);
    dispatch(getDistrictInfo(selected.value));
    setSelectedState(selected.value);
    dispatch(getDistrictWorkingHours(selected.value));
    dispatch(getUnavailableDates(selected.value));
  };
  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const dateHandleChange = (e) => {
    const id = selectedState1;
    const appointmentDate = e.target.value;
    setSelectedTime(e.target.value);
    dispatch(getAvailableDates({ id, appointmentDate }));

    // console.log(workingHours)
  };

  // assign  variables
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


  // handle check for agreement
  const handleIsCheck = () =>{
    setIsChecked(!isChecked);
  }

  // handle click or get national id information
  const handleClick = async () => {
    dispatch(getNationalId(nID));
    const defaultSex = (await nationalID?.sex) === "Male" ? "Male" : "Female";
    setSelectedSex(defaultSex);
    const apiDate = new Date(nationalID?.DOB); // convert date string to date object
    setSelectedDate(apiDate?.toISOString()?.substr(0, 10));
    setMFname(mFirstName);
    setMLname(mLastName);
    setFname(firstName);
    setLName(mLastName);
    setDob(apiDate?.toISOString()?.substr(0, 10));
    setOccupation(nationalID?.occupation);
    setFormData({
      ...formData,
      fName: firstName,
      lName: lastName,
      mFname: mFirstName,
      mLname: mLastName,
      sex: defaultSex,
      nID: nId,
      dob: apiDate?.toISOString()?.substr(0, 10),
    });

    console.log(message);
  };

  // handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData); // You can access form data here
  };

  // handle the next step
  const handleNext = (e) => {
    e.preventDefault();
    if (
      mFname == "" ||
      lName == "" ||
      fName == "" ||
      nID == "" ||
      mLname == "" ||
      selectedDate == "" ||
      pob == ""
    ) {
      console.log(mFname, lName, fName, nID, selectedDate, pob);
      toast.error("please fill the required fields");
      return;
    } else {
      // console.log("here",formData.mFname)
      if (
        step == 2 &&
        (emergencyContactName == "" ||
          emergencyContactNumber == "" ||
          phoneNumber == "")
      ) {
        console.log(emergencyContactName, emergencyContactNumber, phoneNumber);
        toast.error("please fill the required fields");
        return;
      }
      else if (
        step === 4 && isChecked == false
      ) {
        console.log(isChecked);
        toast.error("please fill the required fields");
        return;
      }

      setStep(step + 1);
    }
  };

  return (
    <>
    <Modal isOpen={isOpen} handleClose={handleClose} />
    
      <div style={{display:isOpen == true ? "none":""}}>
      <ToastContainer />
      <HorizontalStepper />
      {step === 1 && (
        // personal information form
        <form onSubmit={handleNext} className=" shadow-2xl px-5 ">
          <div className="border-b border-gray-900/10 pb-6">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Personal Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Use a permanent address where you can receive mail.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-6 m-0">
          
                <div className="sm:col-span-4">
                {/* <label
                  htmlFor="nID"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  NATIONAL ID
                </label> */}
                  <input
                    type="text"
                    name="nID"
                    placeholder="Enter Your National ID"
                    value={nID}
                    onChange={(e) => setNID(e.target.value)}
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {/* {validationErrors.nID && (
        <span className="text-danger">{validationErrors.nID}</span>
      )} */}
                </div>
              

              <div className="sm:col-span-2">
                <button
                  type="button"
                  onClick={handleClick}
                  className="w-full sm:w-auto rounded-md bg-slate-950 w-100 py-2   text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  NEXT
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
                    value={fName}
                    onChange={(e) => setFname(e.target.value)}
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
                    value={lName}
                    onChange={(e) => setLName(e.target.value)}
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
                    value={mFname}
                    onChange={(e) => setMFname(e.target.value)}
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
                    value={mLname}
                    onChange={(e) => setMLname(e.target.value)}
                    autoComplete="family-name"
                    className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* sex */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Gender
                </label>
                <div className="">
                  <select
                    id="selectedSex"
                    name="selectedSex"
                    autoComplete=""
                    value={selectedSex}
                    onChange={(e) => setSelectedSex(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                    <option value={"Male"}>Male</option>
                    <option value={"Male"}>Male</option>
                  </select>
                </div>
              </div>

              {/* occupation */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  OCCUPATION
                </label>
                <div className="">
                  <select
                    id="occupation"
                    name="occupation"
                    autoComplete=""
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                    <option value={"Student"}>Student</option>
                    <option value={"Employee"}>Employee</option>
                    <option value={"Others"}>Others</option>
                  </select>
                </div>
              </div>

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
                    name="status1"
                    autoComplete="country-name"
                    onChange={(e) => setStatus(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                    <option value={"Single"}>Single</option>
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
                    id="selectedDate"
                    name="selectedDate"
                    value={selectedDate}
                    onChange={(event) => setSelectedDate(event.target.value)}
                    // onChange={handleChange}
                    autoComplete="date"
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
                    value={pob}
                    onChange={(e) => setPob(e.target.value)}
                    autoComplete="place of birth"
                    className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {/* {validationErrors.pob && (
        <span className="text-danger">{validationErrors.pob}</span>
      )} */}
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center align-items-center">
              <button
                type="submit"
                className="w-full sm:w-auto rounded-md bg-indigo-600 w-50 py-2 my-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                NEXT
              </button>
            </div>
          </div>
        </form>
      )}

      {step === 2 && (
        // contact information form
        <form onSubmit={handleNext} className=" shadow-2xl p-11">
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
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    autoComplete="contact number"
                    className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {validationErrors.phoneNumber && (
                    <span className="text-danger">
                      {validationErrors.phoneNumber}
                    </span>
                  )}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    name="emergencyContactName"
                    value={emergencyContactName}
                    onChange={(e) => setEmergencyContactName(e.target.value)}
                    autoComplete="given-name"
                    className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {validationErrors.emergencyContactName && (
                    <span className="text-danger">
                      {validationErrors.emergencyContactName}
                    </span>
                  )}
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
                    name="emergencyContactNumber"
                    value={emergencyContactNumber}
                    onChange={(e) => setEmergencyContactNumber(e.target.value)}
                    autoComplete="family-name"
                    className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {validationErrors.emergencyContactNumber && (
                    <span className="text-danger">
                      {validationErrors.emergencyContactNumber}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <button
              type="button"
              onClick={handlePrevious}
              className="w-full sm:w-auto rounded-md bg-slate-950 w-25 py-2 my-4 text-sm font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Previous
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto rounded-md bg-indigo-700 w-25 py-2 mx-3 my-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              NEXT
            </button>
          </div>
        </form>
      )}

      {step === 3 && (
        // passport information
        <form onSubmit={handleNext} className=" p-5 shadow-2xl">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Personal Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Use a permanent address where you can receive mail.
             <h5> NOTE: </h5>
              Please bring your proof of Philippine citizenship by election, naturalization, re-acquisition on the date of your personal appearance.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {/* type of passport  application */}
              <div className="sm:col-span-2">
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
              <div className="sm:col-span-2">
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
                    disabled
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
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <button
              type="button"
              onClick={handlePrevious}
              className="w-full sm:w-auto rounded-md bg-slate-950 w-25 py-2 my-4 text-sm font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Previous
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto rounded-md bg-indigo-700 w-25 py-2 mx-3 my-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              NEXT
            </button>
          </div>
        </form>
      )}

      {step === 4 && (
        // passport information
        <form onSubmit={handleNext} className=" p-5 shadow-2xl">
          <div className="row">
            <Select
              className="w-50"
              options={options}
              value={selectedOptions}
              onChange={handleChange1}
            />
            <Select
              className="w-50"
              options={options2}
              value={selectedOptions2}
              onChange={handleChange2}
            />
          </div>
          <hr />

          <div className="row mb-5">
            <div className="col">
              {selectedState?.length > 0 &&
                selectedState?.map((item) => (
                  <div>
                    <div className="form-group">
                      <label htmlFor="dailyApplicants">
                        Daily Applicants Can Service
                      </label>
                      <input
                        type="Number"
                        name="office"
                        disabled
                        value={item.dailySlots}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group my-2">
                      <label htmlFor="office">Office Name</label>
                      <input
                        type="text"
                        name="office"
                        disabled
                        value={item.officeName}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="location">Location</label>
                      <textarea
                        type="text"
                        name="location"
                        disabled
                        value={item.location}
                        className="form-control"
                      />
                    </div>

                    <div className="form-group my-2">
                      <label htmlFor="contactNumber">
                        Office Contact Number
                      </label>
                      <input
                        type="Number"
                        name="contactNumber"
                        disabled
                        value={item.contactNumber}
                        className="form-control"
                      />
                    </div>
                  </div>
                ))}
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="date">Appointment Date</label>
                <input
                  type="date"
                  name="appointmentDate"
                  onChange={dateHandleChange}
                  id=""
                  className="form-control"
                />
                {/* {validationErrors.appointmentDate && (
        <span className="text-danger">{validationErrors.appointmentDate}</span>
      )} */}
              </div>
              <div className="mt-2 form-control disabled">
                {availableDates?.length === 0
                  ? workingHours?.map((item) => (
                      <div key={item.startTime} className="">
                        <div className="form-group">
                          <input
                            type="radio"
                            name="time"
                            value={item.startTime}
                            id={item.startTime}
                            className="mx-2"
                            checked={selectedTime === item.startTime}
                            onChange={handleTimeChange}
                          />
                          <label htmlFor={item.startTime}>
                            {item.startTime} ------- {item.endTime} Available
                          </label>
                        </div>
                      </div>
                    ))
                  : availableDates?.map((info, i) => (
                      <p key={info.time}>
                        <input
                          type="radio"
                          name="time"
                          value={info.time}
                          id={info.time}
                          className="mx-2"
                          disabled={info.availableNumber === 0}
                          // checked={selectedTime === i.startTime}
                          onChange={handleTimeChange}
                        />{" "}
                        {info.time} --{" "}
                        {availableDates[i + 1]
                          ? availableDates[i + 1].time
                          : "Next Hour"}{" "}
                        ={" "}
                        <span>
                          {info.availableNumber} available slots{" "}
                          {info.availableNumber == 0 ? "" : ""}
                        </span>
                      </p>
                    ))}
              </div>
            </div>
            {/* <div className="col">
      <h5>working hours</h5>
      {workingHours.length > 0 &&
        workingHours?.map((item) => (
          <div key={item.startTime} className="">
            <div className="form-group">
              <input
                type="radio"
                name="time"
                value={item.startTime}
                id={item.startTime}
                className="mx-2"
                checked={selectedTime === item.startTime}
                onChange={handleTimeChange}
              />
              <label htmlFor={item.startTime}>
                {item.startTime} ------- {item.endTime}{" "}
              </label>
            </div>
          </div>
        ))}
    </div> */}
            {/* <div className="col"> */}
            {/* <Appointment unavailableDates={unavailableDates} /> */}
            {/* </div> */}
            <div className="col-12">
              <h5 className="text-red-600">NOTICE:</h5>
              Before you proceed to booking an appointment at TOPS site, please
              read and confirm your agreement to the following :
              <p>
                1- Only new passport applications will be accepted - no renewal
                only first-time applications, no renewal which require
                change/correction of name, no renewal of lost and mutilated
                passports.
              </p>
              <p>
                2- if you miss the 24-hour payment deadline, your passport application may be canceled or put on hold you may have to start the application process again from the beginning and pay the processing fee again. This can be inconvenient and may cause delays in obtaining your passport.
              </p>
              <p>
                3-Appointment booked at this TOPS is non-transferable and cannot
                be rescheduled. If an applicant wishes to make any changes after
                obtaining their TOPS appointment, the existing TOPS appointment
                must first be cancelled. A new appointment can then be booked
                and paid.
              </p>
              <p>4-Processing time is between 12-15 working days.</p>
              <p>
                5- Applicants who booked at this TOPS Site who do not meet the
                requirements of this passport application and / or who do not
                agree to its procedures (i.e. cancellation of passport on-site)
                will not be processed. No request for refund nor change of
                passport processing site will be entertained.
              </p>
              <p>
                {" "}
                <input
                  type="checkbox"
                  id="myCheckbox"
                  class="form-checkbox h-4 w-4 text-green-500"
                  name="isChecked"
                  value={isChecked}
                  onChange={handleIsCheck}
                />{" "}
                I confirm that I have read, understood and agree to the above
                conditions.
              </p>
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <button
              type="button"
              onClick={handlePrevious}
              className="w-full sm:w-auto rounded-md bg-slate-950 w-25 py-2 my-4 text-sm font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Previous
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto rounded-md bg-indigo-700 w-25 py-2 mx-3 my-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              NEXT
            </button>
          </div>
        </form>
      )}
      {
        step === 5 && (
          <div>
          Please choose a Processing Type
            <h1 className="text-center">Payment</h1>
          </div>
        )
      }
      </div>
    </>
  );
}

export default MultiStepForm;
