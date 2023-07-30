// export default Stepper;
import Joi from "joi";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import HorizontalStepper from "./horizontalStepper";
import { useSelector } from "react-redux";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  appReset,
  checkIsHolyday,
  getApplicantInfo,
  updateAppointment
} from "../app/applicantSlice";
import {
  fetchData,
  getAvailableDates,
  getDistrictInfo,
  getDistrictWorkingHours,
  getSingleDistrict,
  getUnavailableDates,
  useAppDispatch
} from "../app/districtSlice";

function UpdateAppointment() {
  const navigate = useNavigate("/");
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
  const [districtName, setDistrictName] = useState("");
  const [stateName, setStateName] = useState("");
  const [step, setStep] = useState(1);
  let [amount, setAmount] = useState("150");
  let [appointmentNumber, setAppointmentNumber] = useState("");
  let [officeName, setOfficeName] = useState("");
  let [location, setLocation] = useState("");
  let [officeNumber, setOfficeNumber] = useState("");
  let [districtId, setDistrictId] = useState("");
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
  };
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
    isError,
    isSuccess,
    isLoading,
  } = useSelector((state) => state.district);
  const appMessage = useSelector((state) => state.applicant.message);
  const applicantInfo = useSelector((state) => state.applicant.applicantInfo);
  const appStatus = useSelector((state) => state.applicant.status);
  const errorMessage = useSelector((state) => state.applicant.error);
  const isAppError = useSelector((state) => state.applicant.isError);
  const isAppSuccess = useSelector((state) => state.applicant.isSuccess);
  const isAppLoading = useSelector((state) => state.applicant.isLoading);
  const [minDate, setMinDate] = useState("");

  // Get the current date in the format required by the input element
  const now = new Date();
  let tom = new Date(now.getTime() + 24 * 60 * 60 * 1000); // Add 1 day in milliseconds
  const currentDate = tom.toISOString().split("T")[0];

  // Set the minimum date of the input element to the current date
  if (!minDate) {
    setMinDate(currentDate);
  }
  useEffect(() => {
    if (status == "idle") {
      dispatch(fetchData());
    }
    // if(isError){
    //   toast.error(error?.message)
    // }
    // if(isAppError) {
    //   toast.error(errorMessage?.message);

    // }
    if (isAppError) {
      toast.error(errorMessage?.message);
        // dispatch(appReset());
    }
    if (isAppSuccess) {
      toast.success(appMessage?.message);
        // dispatch(appReset());
    }
    return () => {
      // dispatch(reset());
      dispatch(appReset());
    };
  }, [
    
    dispatch,
    isAppError,
    isAppSuccess,
    appMessage,
    errorMessage
  ]);
  // console.log(districts)

  // handle the previous step
  const handlePrevious = () => {
    setStep(step - 1);
    setIsChecked(false);
  };

  // handle changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setId(e.target.value);
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
    setStateName(selected.label);
    setSelectedOptions2([]);
  };
  const handleChange2 = (selected) => {
    setSelectedOptions2(selected);

    dispatch(getDistrictInfo(selected.value));
    setSelectedState(selected.value);
    setDistrictName(selected?.label);
    dispatch(getDistrictWorkingHours(selected.value));

    dispatch(getUnavailableDates(selected.value));
  };
  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const dateHandleChange = (e) => {
    let id = applicantInfo?.districtId;
    const appointmentDate = e.target.value;
    setAppointmentDate(appointmentDate); //
    // setSelectedTime(e.target.value);
    dispatch(checkIsHolyday({ appointmentDate, id }));
    // console.log(applicantInfo?.districtId);
    dispatch(getAvailableDates({ id, appointmentDate }));
    dispatch(getDistrictWorkingHours(applicantInfo?.districtId));
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
  const handleIsCheck = () => {
    setIsChecked(!isChecked);
  };

  // handle click or get national id information
  const handleClick = async () => {
    dispatch(getApplicantInfo(appointmentNumber));
    if (error?.status === "fail" || error?.status == "fail") {
      toast.error(error.message);
      console.log(error);
      return;
    }
    setDistrictId(applicantInfo?.districtId);

    // dispatch(checkIsHolyday({appointmentDate,id}));
    // console.log(selectedState1)

    // const data = {
    //   id,
    //   appointmentDate
    // }
    // console.log(data)
    // dispatch(getAvailableDates(data));
    // console.log(applicantInfo)
    // setSelectedState();
    // const defaultSex = (await nationalID?.sex) === "Male" ? "Male" : "Female";
    // setSelectedSex(defaultSex);
    // const apiDate = new Date(nationalID?.DOB); // convert date string to date object
    // setDob(apiDate?.toISOString()?.substr(0, 10));
    // setSelectedDate(apiDate?.toISOString()?.substr(0, 10));
    // setMFname(mFirstName);
    // setMLname(mLastName);
    // setFname(firstName);
    // setLName(lastName);
    // setDob(apiDate?.toISOString()?.substr(0, 10));
  };

  // handle submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // console.log(data);
    if (
      !appointmentDate
    ) {
      toast.error("please provide all required fields.");
      return;
    }
    if (
      errorMessage?.status == "fail" || isAppError
    ) {
      toast.error(appMessage.message);
      return;
    }
    const data ={
      appointmentDate,
      appointmentTime:selectedTime,
      id:applicantInfo?._id,
      districtId: districtId ? districtId : applicantInfo?.districtId
    }
    console.log(isAppSuccess,isAppError,errorMessage,appMessage)
    dispatch(updateAppointment(data))
  };

  // console.log(applicantInfo)
  return (
    <>
      {/* <HorizontalStepper isOpen={isOpen} /> */}
      <div className="bg-cyan-900 w-100 h-100 py-10 text-white lg:px-12 ">
        <ToastContainer />
          <form className=" shadow-2xl px-4 " onSubmit={handleSubmit}>
          <div className="border-b border-gray-900/10 pb-6">

            <h2 className="text-base font-extrabold leading-9 text-white">
              APPOINTMENT UPDATE
            </h2>
            <p className="mt-1 text-sm leading-6 text-white">
             UPDATING AN APPOINTMENT IS VALID ONLY WHEN YOU HAVE AN APPOINTMENT
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
                  name="appointmentNumber"
                  placeholder="Enter Your appointment Number"
                  value={appointmentNumber}
                  onChange={(e) => setAppointmentNumber(e.target.value)}
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {/* {validationErrors.nID && (
        <span className="text-danger">{validationErrors.nID}</span>
      )} */}
              </div>

              <div className="sm:col-span-2">
                <button
                  type="button"
                  onClick={handleClick}
                  className="w-full sm:w-auto rounded-md bg-sky-500 w-100 py-2   text-sm font-semibold text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700">
                  GET
                </button>
              </div>
              
              {applicantInfo && applicantInfo?.districtId && (

                <>
             
              <div className="sm:col-span-3">
                <Select
                  className="block w-full rounded-md 3order-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  options={options}
                  value={selectedOptions}
                  onChange={handleChange1}
                />
              </div>
              <div className="sm:col-span-3">
                <Select
                  className="block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  options={options2}
                  value={selectedOptions2}
                  onChange={handleChange2}
                />
              </div>

              {/* 1502440 */}

              {/* <hr /> */}

              <div className="sm:col-span-3">
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
                          className="block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      <div className="form-group my-2">
                        <label htmlFor="office">Office Name</label>
                        <input
                          type="text"
                          name="office"
                          disabled
                          value={item.officeName}
                          // onChange={(e)=>setOfficeName(e.target.value)}
                          className="block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <textarea
                          type="text"
                          name="location"
                          disabled
                          value={item.location}
                          // onChange={(e)=>setLocation(e.target.value)}
                          className="block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                          // onChange={(e)=>setOfficeNumber(e.target.value)}
                          className="block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  ))}
              </div>
              <div className="sm:col-span-3">
                <div className="form-group">
                  <label htmlFor="date">Appointment Date</label>
                  <input
                    type="date"
                    name="appointmentDate"
                    onChange={dateHandleChange}
                    min={minDate}
                    className="block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {/* {validationErrors.appointmentDate && (
        <span className="text-danger">{validationErrors.appointmentDate}</span>
      )} */}
                </div>
               {errorMessage?.status !== "success" && 
               <div className="mt-2 form-control disabled">
                  {availableDates?.length === 0
                    ? workingHours &&
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
                              {/* {item.startTime} ------- {item.endTime} Available */}
                              {item.startTime} -------  Available
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
                          {info.time} ==== {" "}
                          {/* {availableDates[i + 1]
                            ? availableDates[i + 1].time
                            : "Next Hour"}
                          ={" "} */}
                          <span>
                            {info.availableNumber == 0
                              ? "FULL"
                              : `${info.availableNumber} available slots`}
                            {/* { info.availableNumber == 0 ? "Full" : ""} */}
                          </span>
                        </p>
                      ))}
                </div>}
              
            </div>
                </>
              )}
             {
              applicantInfo && applicantInfo?.districtId  &&  <div className="sm:col-span-2 mt-4" >
                <button
                  type="submit"
                  
                  className="w-full sm:w-auto rounded-md bg-sky-500 w-100 py-2   text-sm font-semibold text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700">
                  UPDATE
                </button>
              </div>
             }
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdateAppointment;
