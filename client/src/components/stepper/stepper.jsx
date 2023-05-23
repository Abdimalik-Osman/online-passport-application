// export default Stepper;
import React, { useEffect, useState } from "react";
import Joi from "joi";
import HorizontalStepper from './horizontalStepper';
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { getNationalId,  
   fetchData,
  getSingleDistrict,
  getDistrictWorkingHours,
  getUnavailableDates,
  getDistrictInfo,
  useAppDispatch,
  getAvailableDates, } from "../../app/districtSlice";
function MultiStepForm() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOptions2, setSelectedOptions2] = useState([]);
  const [selectedId, setSelectedId] = useState("");
   const [selectedTime, setSelectedTime] = useState("");
   const [selectedState1, setSelectedState] = useState("");
  const [step, setStep] = useState(1);
  let [amount,setAmount] = useState("150")
  let [type,setType] = useState("")
  const [validationErrors, setValidationErrors] = useState({});
  const [formData, setFormData] = useState({
    nID:"", fName:"", lName:"", mFname:"", mLname:"",
    dob:"", pob:"", status:"", occupation:"", sex:"", status:"", status:"",
    phoneNumber:"", email:"", emergencyContactName:"", emergencyContactNumber:'', amount:"", type:"",
    districtId:"", appointmentDate:"", appointmentTime:"", 
  });
  
  const schema = Joi.object({
    nID: Joi.string().required("National Identity can be empty"),
    phoneNumber: Joi.string().min(9).max(10).required(),
    pob: Joi.string().required("Place of birth can not be empty"),
    emergencyContactName: Joi.string().required("emergency Contact Name can not be empty"),
    emergencyContactNumber: Joi.string().min(9).max(10).required(),
    appointmentDate: Joi.date().required("Appointment Date can not be empty"),
  });
  
  const dispatch = useAppDispatch();
  const [nId, setId] = useState();
  const [selectedSex, setSelectedSex] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const {status,error,message,nationalID,districts,selectedState,unavailableDates,availableDates,districtData,workingHours} = useSelector((state) => state.district);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchData());  
    }
  }, [status, dispatch,availableDates,availableDates,selectedState]);
  // console.log(districts)

  // handle the next step
  const handleNext = () => {
    setStep(step + 1);
  };
// handle the previous step 
  const handlePrevious = () => {
    setStep(step - 1);
  };

  // handle changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setId(e.target.value);
    setFormData({
      ...formData,
      [name]: value,
    });
    const { error } = schema.validate(formData, { abortEarly: false });
    if (error) {
      const errors = {};
      error.details.forEach((err) => {
        errors[err.path[0]] = err.message;
      });
      setValidationErrors(errors);
    } else {
      setValidationErrors({});
    }
  
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
    setSelectedState(selected.value)
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
    dispatch(getAvailableDates({id, appointmentDate}));
  }

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

  // handle click or get national id information
  const handleClick = async () => {
    dispatch(getNationalId(nId));
    const defaultSex = (await nationalID?.sex) === "Male" ? "Male" : "Female";
    setSelectedSex(defaultSex);
    const apiDate = new Date(nationalID?.DOB);
; // convert date string to date object
    setSelectedDate(apiDate?.toISOString()?.substr(0, 10));
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

        console.log(message)
  };

  // handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData); // You can access form data here
  };

  return (
    <div>
     <HorizontalStepper />
      {step === 1 && (
        // personal information form
        <form onSubmit={handleNext} className="mx-5 shadow-2xl px-5 ">
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
                        {validationErrors.nID && (
        <span className="text-danger">{validationErrors.nID}</span>
      )}
                </div>
              </div>

              <div className="sm:col-span-2">
              <button
    type="button"
    onClick={handleClick}
    className="w-full sm:w-auto rounded-md bg-slate-950 w-50 py-2  mt-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
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
                    name="status"
                    autoComplete="country-name"
                    onChange={handleChange}
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
                        {validationErrors.pob && (
        <span className="text-danger">{validationErrors.pob}</span>
      )}
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center align-items-center">
            <button
    type="submit"
    
    className="w-full sm:w-auto rounded-md bg-indigo-600 w-25 py-2 my-5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
    NEXT
  </button>
</div>
          </div>
        </form>
      )}

      {step === 2 && (
        // contact information form
        <form onSubmit={handleNext} className="mx-5 shadow-2xl p-11">
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
                value={formData.phoneNumber}
                onChange={handleChange}
                autoComplete="contact number"
                className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
                 {validationErrors.phoneNumber && (
        <span className="text-danger">{validationErrors.phoneNumber}</span>
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
                value={formData.email}
                onChange={handleChange}
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
                value={formData.emergencyContactName}
                onChange={handleChange}
                autoComplete="given-name"
                className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
                    {validationErrors.emergencyContactName && (
        <span className="text-danger">{validationErrors.emergencyContactName}</span>
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
                value={formData.emergencyContactNumber}
                onChange={handleChange}
                autoComplete="family-name"
                className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
                    {validationErrors.emergencyContactNumber && (
        <span className="text-danger">{validationErrors.emergencyContactNumber}</span>
      )}
            </div>
          </div>

      
      
        </div>

      </div>
      <div className="d-flex justify-content-center align-items-center">
            <button
    type="button"
    onClick={handlePrevious}
    className="w-full sm:w-auto rounded-md bg-slate-950 w-25 py-2 my-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
   
    Previous 
  </button>
            <button
    type="submit"
    
    className="w-full sm:w-auto rounded-md bg-indigo-700 w-25 py-2 mx-3 my-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
   
    NEXT
  </button>
</div>
        </form>
      )}

      {step === 3 && (
        // passport information
        <form onSubmit={handleNext} className="mx-5 p-5 shadow-2xl">
        <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Personal Information
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Use a permanent address where you can receive mail.
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
    className="w-full sm:w-auto rounded-md bg-slate-950 w-25 py-2 my-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
   
    Previous 
  </button>
            <button
    type="submit"
    
    className="w-full sm:w-auto rounded-md bg-indigo-700 w-25 py-2 mx-3 my-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
   
    NEXT
  </button>
  </div>
        </form>
      )}

      {step === 4 && (
        // passport information
        <form onSubmit={handleSubmit} className="mx-5 p-5 shadow-2xl">
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
                <label htmlFor="dailyApplicants">Daily Applicants Can Service</label>
                <input type="Number" name="office" disabled value={item.dailySlots} className='form-control' />
              </div>
              <div className="form-group my-2">
                <label htmlFor="office">Office Name</label>
                <input type="text" name="office" disabled value={item.officeName} className='form-control' />
              </div>
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <textarea type="text" name="location"  disabled value={item.location} className='form-control' />
              </div>
             
              <div className="form-group my-2">
                <label htmlFor="contactNumber">Office Contact Number</label>
                <input type="Number" name="contactNumber" disabled value={item.contactNumber} className='form-control' />
              </div>
              </div>
            ))}
        </div>
        <div className="col">
          <div className="form-group">
            <label htmlFor="date">Appointment Date</label>
            <input type="date" name="appointmentDate" onChange={dateHandleChange} id="" className="form-control" />
            {validationErrors.appointmentDate && (
        <span className="text-danger">{validationErrors.appointmentDate}</span>
      )}
          </div>
          <div className='mt-2 form-control disabled'>
          {availableDates?.length === 0 ? (
            selectedDate =="" ? "":
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
          {item.startTime} ------- {item.endTime} Available
        </label>
      </div>
    </div>
  ))
) : (
  availableDates?.map((info, i) => (
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
      {info.time} -- {availableDates[i + 1] ? availableDates[i + 1].time : "Next Hour"} ={" "}
      <span>
        {info.availableNumber} available slots {info.availableNumber == 0? "":""}
      </span>
    </p>
  ))
)}
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
      </div>
      <div className="d-flex justify-content-center align-items-center">
            <button
    type="button"
    onClick={handlePrevious}
    className="w-full sm:w-auto rounded-md bg-slate-950 w-25 py-2 my-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
   
    Previous 
  </button>
            <button
    type="submit"
    
    className="w-full sm:w-auto rounded-md bg-indigo-700 w-25 py-2 mx-3 my-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
   
    NEXT
  </button>
  </div>
        </form>
      )}
    </div>
  );
}

export default MultiStepForm;
