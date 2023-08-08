// export default Stepper;
import Joi from "joi";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addNewApplicant,
  appReset,
  checkIsHolyday,
} from "../../app/applicantSlice";
import {
  fetchData,
  getAvailableDates,
  getDistrictInfo,
  getDistrictWorkingHours,
  getNationalId,
  getSingleDistrict,
  getUnavailableDates,
  reset,
  useAppDispatch,
} from "../../app/districtSlice";
import ModalShow from "./Modal";
import HorizontalStepper from "./horizontalStepper";

function MultiStepForm() {
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
  let [payment, setPayment] = useState("EVC-PLUS");
  let [payNumber, setPayNumber] = useState(616328920);
  let [location, setLocation] = useState("");
  let [officeNumber, setOfficeNumber] = useState("");
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
    error,
  } = useSelector((state) => state.district);
  // const errorMessage = useSelector((state) => state.district.error);
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
    if (isAppError) {
      toast.error(errorMessage?.message);
      // dispatch(appReset());
    }
    if (isAppError) {
      toast.error(appMessage?.message);
      // dispatch(appReset());
    }
    if (isAppSuccess) {
      toast.success(appMessage?.message);
      // dispatch(appReset());
    }
    if (appMessage?.message == "Your Application registered successfully" || appMessage?.message === "Your Application registered successfully") {
      // toast.success(appMessage?.message);
      // dispatch(appReset());
      nationalID: {};
      dispatch(reset());
      setTimeout(() => {
        navigate("/view");
      }, 2000);
      
    }

    if (isError) {
      toast.error(error?.message);
      // dispatch(reset());
    }
    if (isSuccess) {
      toast.success(message?.message);
      // dispatch(reset());
      // dispatch(appReset());
    }
    // if(errorMessage?.status == "fail"){
    //   toast.error(errorMessage?.message);
    //     // dispatch(reset());
    //     // dispatch(appReset());
    // }
    // if(errorMessage?.status == "success"){
    //   toast.success(errorMessage?.message);
    //     // dispatch(appReset());
    // }

    if (nationalID) {
      let mFirstName = "";
      let mLastName = "";
      let firstName = "";
      let lastName = "";
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

      const defaultSex = nationalID?.sex === "Male" ? "Male" : "Female";
      setSelectedSex(defaultSex);
      if (nationalID?.DOB) {
        const apiDate = new Date(nationalID.DOB); // convert date string to date object
        // setDob(apiDate?.toISOString()?.substr(0, 10));
        console.log(apiDate);

        // Now you can proceed with formatting the date if apiDate is valid
        let time = apiDate.toISOString().substr(0, 10);
        setSelectedDate(time);
      } else {
        // If applicantInfo?.DOB is null or undefined, use the current date
        let time = moment(new Date()).format("DD-MM-YYYY");
        setSelectedDate(time);
      }
      setPob(nationalID?.POB)
      setMFname(mFirstName);
      setMLname(mLastName);
      setFname(firstName);
      setLName(lastName);
      // setDob(apiDate?.toISOString()?.substr(0, 10));
    }
    return () => {
      dispatch(reset());
      dispatch(appReset());
    };
  }, [
    isLoading,
    dispatch,
    error,
    isSuccess,
    isAppError,
    message,
    isAppSuccess,
    appMessage,
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
    const id = selectedState1;
    const appointmentDate = e.target.value;
    setAppointmentDate(appointmentDate); //
    // setSelectedTime(e.target.value);
    dispatch(checkIsHolyday({ appointmentDate, id }));
    console.log(selectedState1);
    dispatch(getAvailableDates({ id, appointmentDate }));
  };

  // assign  variables

  // handle check for agreement
  const handleIsCheck = () => {
    setIsChecked(!isChecked);
  };

  // handle click or get national id information
  const handleClick = (e) => {
    e.preventDefault();
    if (!nID) {
      toast.error("Please enter your national ID");
      return;
    }
    dispatch(getNationalId(nID));
    console.log(error);
    if (error?.status === "fail" || error?.status == false) {
      toast.error(error?.message);
      return;
    }
    console.log(nationalID)

    if (step == 1 && !nationalID) {
      toast.error(error?.message);
      return;
    }
  };

  // handle submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      nID: nID,
      phoneNumber: phoneNumber,
      emergencyContactName: emergencyContactName,
      emergencyContactNumber: emergencyContactNumber,
      fullname: fName + " " + lName,
      motherName: mFname + " " + mLname,
      POB: pob,
      DOB: selectedDate,
      amount,
      status: status1,
      email: email,
      occupation: occupation,
      appointmentTime: selectedTime,
      appointmentDate: appointmentDate,
      districtId: selectedState1,
      sex: selectedSex,
    };
    console.log(data);
    if (
      !appointmentDate ||
      appointmentDate == undefined ||
      appointmentDate == "" ||
      !selectedTime ||
      selectedTime == undefined ||
      selectedTime == "" ||
      !selectedState1 ||
      selectedState1 == undefined ||
      selectedState1 == "" ||
      !nID ||
      nID == undefined ||
      nID == "" ||
      !phoneNumber ||
      phoneNumber == undefined ||
      phoneNumber == ""
    ) {
      toast.error("please provide all required fields.");
      return;
    }

    dispatch(addNewApplicant(data));
    console.log(applicantInfo);
    console.log(errorMessage?.message);
    if (errorMessage?.status == "fail") {
      toast.error(errorMessage?.message);
    } else {
      toast.success(errorMessage?.message);
     
      // navigate("/");
    }
  };

  // handle the next step
  const handleNext = (e) => {
    e.preventDefault();
    // if (!nationalID || nationalID == undefined || nationalID == null) {
    //   toast.error(error.message);
    // }
    if (appStatus == "failed" || status == "failed") {
      console.log(isAppError);
      toast.error("Please check all the requirements");
      return;
    }
   

    if (
      step == 1 &&
      (mFname == "" ||
        lName == "" ||
        fName == "" ||
        nID == "" ||
        mLname == "" ||
        selectedDate == "" ||
        pob == "" || status1 == "" || occupation == "")
    ) {
      console.log(mFname, lName, fName, nID, selectedDate, pob);
      toast.error("please fill the required fields");
      return;
    }
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
    if (step == 2 && phoneNumber == emergencyContactNumber) {
      toast.error(
        "Your phone number and emergency contact number cannot be same."
      );
      return;
    }
    if (
      step === 4 &&
      (appointmentDate === undefined ||
        appointmentDate === "" ||
        selectedState1 === undefined ||
        selectedState1 === "")
    ) {
      toast.error("please fill the required fields");
      return;
    }
    if (step === 4 && isChecked == false) {
      toast.error("please check the checkbox if you agreed the terms");
      return;
    }
    // if(step ===)
    // // if (isChecked == true) {
    // //   dispatch(checkIsHolyday(appointmentDate));
    // //   if (errorMessage?.status === "fail" || errorMessage?.status == "fail") {
    // //     toast.error(errorMessage?.message);
    // //   }else{

    // //    dispatch(addNewApplicant(data));
    // //    if (errorMessage?.status === "fail" || errorMessage?.status == "fail") {
    // //     toast.error(errorMessage?.message);
    // //   }else{
    // //     if (errorMessage?.status === "success" || errorMessage?.status == "success") {
    // //       toast.success(errorMessage?.message);
    // //     }
    // //   }
    // //   }
    // //   return
    // // }

    setStep(step + 1);
  };

  return (
    <>
      <ModalShow isOpen={isOpen} handleClose={handleClose} />

      <HorizontalStepper isOpen={isOpen} />
      <div
        style={{ display: isOpen == true ? "none" : "" }}
        className="bg-cyan-900 w-100 h-100 py-10 text-white lg:px-12 ">
        <ToastContainer />
        {/* CONTACT INFORMATION */}
        {step === 1 && (
          // personal information form
          <form onSubmit={handleNext} className=" shadow-2xl px-4 ">
            
              <span style={{display:nationalID?.DOB ? "none":"block"}}>
                <div className="border-b border-gray-900/10 pb-6">
                  <h2 className="text-base font-extrabold leading-9 text-white">
                    NATIONAL IDENTITY AUTHENTICATION
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-white">
                    PLEASE ENTER YOUR NATIONAL ID IF YOU HAVE NATIONAL IDENTITY
                    AND GET YOUR PERSONAL INFORMATION, TO FILL AUTOMATICALLY TO
                    YOUR PERSONAL INFORMATION.
                    <br />
                    IF YOUR HAVE REGISTERED THIS NATIONAL IDENTITY ALREADY THE
                    SYSTEM WILL ALLOW YOU TO REGISTER ANOTHER TIME
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-3 m-0">
                    <div className="col-span-1">
                      <input
                        type="text"
                        name="nID"
                        placeholder="Enter Your National ID"
                        value={nID}
                        onChange={(e) => setNID(e.target.value)}
                        autoComplete="address-level2"
                        className="block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <div className="col-span-1 lg:col-span-1">
                      <button
                        type="button"
                        onClick={handleClick}
                        className="w-full sm:w-auto rounded-md bg-sky-500 w-100 py-2   text-sm font-semibold text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700">
                        CHECK NATIONAL ID
                      </button>
                    </div>
                  </div>
                </div>
              </span>
            
            {nationalID && nationalID?.fullName && (
              <div className="border-b border-gray-900/10 pb-6">
                <h2 className="text-base font-extrabold leading-9 text-white">
                  PERSONAL INFORMATION
                </h2>
                <p className="mt-1 text-sm leading-6 text-white">
                  PLEASE FILL YOUR PERSONAL INFORMATION, SOME FIELDS ARE NOT
                  EDITABLE ONLY FILL THE EDITABLE FIELDS.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-6 m-0">
                  {/* //FIRST NAME */}
                  <div className="sm:col-span-3 my-2 lg:col-span-2 lg:my-1 ">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-gray-900 d-none">
                      First name
                    </label>
                    <div className="">
                      <input
                        type="text"
                        name="fName"
                        value={fName}
                        readOnly
                        onChange={(e) => setFname(e.target.value)}
                        placeholder="First Name"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0.5 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  {/* LAST NAME */}
                  <div className="sm:col-span-3 my-2 lg:col-span-2 lg:my-1">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray-900 d-none">
                      Last name
                    </label>
                    <div className="">
                      <input
                        type="text"
                        name="lName"
                        readOnly
                        value={lName}
                        onChange={(e) => setLName(e.target.value)}
                        placeholder="Last Name"
                        autoComplete="family-name"
                        className="block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  {/* //MOTHER FIRST NAME */}
                  <div className="sm:col-span-3 my-2 lg:col-span-2  lg:my-1 ">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-gray-900 d-none">
                      MOTHER'S FIRST NAME
                    </label>
                    <div className="">
                      <input
                        type="text"
                        name="mFname"
                        value={mFname}
                        onChange={(e) => setMFname(e.target.value)}
                        readOnly
                        placeholder="Mother's First Name"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  {/*MOTHER'S LAST NAME */}
                  <div className="sm:col-span-3  lg:col-span-2 lg:my-1">
                    <label
                      htmlFor="mLname"
                      className="block text-sm font-medium leading-6 text-gray-900 d-none">
                      MOTHER'S LAST NAME
                    </label>
                    <div className="">
                      <input
                        type="text"
                        name="mLname"
                        value={mLname}
                        onChange={(e) => setMLname(e.target.value)}
                        readOnly
                        placeholder="Mother's Last Name"
                        autoComplete="family-name"
                        className="block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  {/* sex */}
                  <div className="sm:col-span-2 lg:col-span-2  my-2 lg:my-3">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium leading-6 text-gray-900 d-none">
                      Gender
                    </label>
                    <div className="">
                      <select
                        id="selectedSex"
                        name="selectedSex"
                        autoComplete=""
                        value={selectedSex}
                        onChange={(e) => setSelectedSex(e.target.value)}
                        placeholder="Select Gender"
                        className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                        <option value={""}>Select Your Gender</option>
                        <option value={"Male"}>Male</option>
                        <option value={"Female"}>Female</option>
                      </select>
                    </div>
                  </div>

                  {/* occupation */}
                  <div className="sm:col-span-2 lg:col-span-2">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium leading-6 text-gray-900 d-none">
                      OCCUPATION
                    </label>
                    <div className="">
                      <select
                        id="occupation"
                        name="occupation"
                        autoComplete=""
                        value={occupation}
                        placeholder="Select Your occupation"
                        onChange={(e) => setOccupation(e.target.value)}
                        className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                        <option value={""}>Select Your Occupation</option>
                        <option value={"Student"}>Student</option>
                        <option value={"Employee"}>Employee</option>
                        <option value={"Others"}>Others</option>
                      </select>
                    </div>
                  </div>

                  {/* MARITAL STATUS */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium leading-6 text-gray-900 d-none">
                      MARITAL STATUS
                    </label>
                    <div className="">
                      <select
                        id="status"
                        name="status1"
                        autoComplete="country-name"
                        onChange={(e) => setStatus(e.target.value)}
                        placeholder="Marital Status"
                        className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                        <option value={""}>Marital Status</option>
                        <option value={"Single"}>Single</option>
                        <option value={"Husband"}>Husband</option>
                        <option value={"Wife"}>Wife</option>
                        <option value={"Widow"}>Widow</option>
                      </select>
                    </div>
                  </div>
                  {/* date of birth */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium leading-6 text-gray-900 d-none">
                      DATE OF BIRTH
                    </label>

                    <div className="">
                      <input
                        type="date"
                        id="selectedDate"
                        name="selectedDate"
                        value={selectedDate}
                        onChange={(event) =>
                          setSelectedDate(event.target.value)
                        }
                        readOnly
                        // onChange={handleChange}
                        autoComplete="date"
                        className="block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  {/* place of birth */}
                  <div className="sm:col-span-2 mb-2 lg:my-1">
                    <label
                      htmlFor="pob"
                      className="block text-sm font-medium leading-6 text-gray-900 d-none">
                      PLACE OF BIRTH
                    </label>
                    <div className="">
                      <input
                        type="text"
                        name="pob"
                        value={pob}
                        onChange={(e) => setPob(e.target.value)}
                        placeholder="Place of Birth"
                        autoComplete="place of birth"
                        className="block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {/* {validationErrors.pob && (
        <span className="text-danger">{validationErrors.pob}</span>
      )} */}
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-center align-items-center">
                  {/* <button
                    type="button"
                    onClick={handlePrevious}
                    className="w-full sm:w-auto rounded-md bg-white w-25 py-2 my-4 text-sm font-semibold text-black shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700">
                    Previous
                  </button> */}
                  <button
                    type="submit"
                    className="w-full sm:w-auto rounded-md bg-sky-500 w-25 py-2 mx-3 my-4 text-sm font-semibold text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700">
                    NEXT
                  </button>
                </div>
              </div>
            )}
          </form>
        )}

        {step === 2 && (
          // contact information form
          <form onSubmit={handleNext} className=" shadow-2xl px-12 lg:p-11">
            <div className="border-b border-gray-900/10 pb-6">
              <h2 className="text-base font-semibold leading-7 text-white">
                CONTACT INFORMATION
              </h2>
              <p className="mt-1 text-sm leading-6 text-white">
                PLEASE USE PERMANENT CONTACT INFORMATION WHERE YOU CAN RECEIVE
                UPDATED FROM YOUR PASSPORT INFORMATION.
              </p>
              <p className="mt-1 text-sm leading-6 text-white">
                PLEASE FILL ALL THE REQUIRED FIELDS, IF YOU SEE RED STAR IT
                MEANS ITS OPTIONAL
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
                {/* CONTACT NUMBER */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-white">
                    YOUR CONTACT NUMBER
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="phoneNumber"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      autoComplete="contact number"
                      className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Enter your phone number"
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
                    className="block text-sm font-medium leading-6 text-white">
                    YOUR E-MAIL
                  </label>
                  <div className="mt-2">
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      className="block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Enter your E-mail"
                    />
                  </div>
                </div>
                {/* EMERGENCY CONTACT NAME */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-white">
                    EMERGENCY CONTACT NAME
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="emergencyContactName"
                      value={emergencyContactName}
                      onChange={(e) => setEmergencyContactName(e.target.value)}
                      // autoComplete="given-name"
                      placeholder="Enter your Emergency Contact Name"
                      className="block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    className="block text-sm font-medium leading-6 text-white">
                    EMERGENCY CONTACT NUMBER
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="emergencyContactNumber"
                      value={emergencyContactNumber}
                      onChange={(e) =>
                        setEmergencyContactNumber(e.target.value)
                      }
                      // autoComplete="family-name"
                      placeholder="Enter your Emergency Contact Number"
                      className="block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                className="w-full sm:w-auto rounded-md bg-white w-25 py-2 my-4 text-sm font-semibold text-black shadow-sm hover:bg-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">
                Previous
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto rounded-md bg-sky-500 w-25 py-2 mx-3 my-4 text-sm font-semibold text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700">
                NEXT
              </button>
            </div>
          </form>
        )}
        {/* PASSPORT INFORMATION */}
        {step === 3 && (
          // passport information
          <form
            onSubmit={handleNext}
            className=" px-4 shadow-2xl text-white"
            style={{ height: "595px" }}>
            <div className="border-b border-gray-900/10 pb-12">
              <h4 className="text-base font-semibold leading-3 text-white">
                PASSPORT INFORMATION
              </h4>
              <p className=" text-sm leading-8 text-white">
                <br />
                <b> NOTE: </b>
                <br />
                THIS STEP IS THE PASSPORT INFORMATION IT'S STATIC ITS ONLY NEW
                PASSPORTS AND THE PAYMENT IS PERMANENT.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
                {/* type of passport  application */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-white">
                    Passport Application
                  </label>
                  <div className="">
                    <select
                      id="country"
                      disabled={true}
                      name="country"
                      autoComplete="country-name"
                      className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                      <option>New Application</option>
                    </select>
                  </div>
                </div>
                {/*  */}

                {/* type of passport */}
                <div className="sm:col-span-2 my-2">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-white">
                    SELECT PASSPORT TYPE
                  </label>
                  <div className="">
                    <select
                      id="country"
                      name="type"
                      autoComplete="country-name"
                      onChange={handleChange}
                      disabled
                      className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                      <option value={"Ordinary"}>Ordinary</option>
                      <option value={"deg-deg"}>Deg Deg</option>
                    </select>
                  </div>
                </div>

                {/* Amount */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium leading-6 text-white">
                    AMOUNT
                  </label>
                  <div className="">
                    <input
                      type="text"
                      name="amount"
                      value={amount}
                      disabled={true}
                      id="postal-code"
                      autoComplete="postal-code"
                      className="block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <button
                type="button"
                onClick={handlePrevious}
                className="w-full sm:w-auto rounded-md bg-white w-25 py-2 my-4 text-sm font-semibold text-black shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700">
                Previous
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto rounded-md bg-sky-500 w-25 py-2 mx-3 my-4 text-sm font-semibold text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700">
                NEXT
              </button>
            </div>
          </form>
        )}
        {/* APPOINTMENT INFORMATION */}
        {step === 4 && (
          // passport information

          <form onSubmit={handleNext} className=" px-4 shadow-2xl">
            <h2 className="text-base font-semibold leading-4 text-white">
              APPOINTMENT INFORMATION
            </h2>
            <p className=" text-sm leading-8 text-white">
              <br />
              <b> NOTE: </b>
              <br />
              <ol>
                <li>
                  FIRSTLY PLEASE SELECT THE STATE AND THEN SELECT THE THAT YOU
                  CAN GET FROM THE PASSPORT
                </li>
              </ol>
              <ol>
                <li>
                  THEN CHOOSE YOUR APPOINTMENT DATE AND TIME, IF THE DATE YOU
                  SELECTED IS FULL IN TERMS THAT DISTRICT PLEASE SELECT ANOTHER
                  DATE AND THEN SELECT THE TIME THAT YOU CAN GO THERE.
                </li>
              </ol>
              <br />
              <b>NOTE:</b>
              <br />
              IF YOU MISS THE APPOINTMENT YOU SELECTED AT YOUR APPOINTMENT TIME,
              THEN IT WILL BE CANCELED IMMEDIATELY AND YOU WILL HAVE TO PAY
              ANOTHER FEE. PLEASE GO THERE THE TIME YOU APPOINTED TO GO THERE.
            </p>
            <p className=" text-sm leading-8 text-white">
              PLEASE CHECK THE CHECKBOX IF YOU HAVE AGREED OUR PERSONAL TERMS.
            </p>
            {/* <div className="row"> */}
            <div className=" grid grid-cols-1 gap-x-10 gap-y-2 sm:grid-cols-6 m-0">
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
                {errorMessage?.status !== "success" && (
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
                                {item.startTime} ------- Available
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
                            {info.time} ====
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
                            {/* Next Hour */}
                          </p>
                        ))}
                  </div>
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
            <div className="col-12 mt-10">
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
                2- if you miss the 24-hour payment deadline, your passport
                application may be canceled or put on hold you may have to start
                the application process again from the beginning and pay the
                processing fee again. This can be inconvenient and may cause
                delays in obtaining your passport.
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
            {/* </div> */}
            <div className="d-flex justify-content-center align-items-center">
              <button
                type="button"
                onClick={handlePrevious}
                className="w-full sm:w-auto rounded-md bg-white w-25 py-2 my-4 text-sm font-semibold text-black shadow-sm hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700">
                Previous
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto rounded-md bg-sky-500 w-25 py-2 mx-3 my-4 text-sm font-semibold text-black shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700">
                NEXT
              </button>
            </div>
          </form>
        )}
        {step === 5 && (
          <div className="shadow-2xl px-4 border-b border-gray-900/10 pb-6">
            <p className="mt-1 text-sm leading-6 text-white">
              PLEASE PREVIEW YOUR INFORMATION BEFORE SUBMITTING AND MAKE
              PAYMENT.
            </p>

            <legend>PERSONAL INFORMATION</legend>
            <div className="mt-10 grid grid-cols-3 gap-x-10 gap-y-1 lg:gap-y-3  sm:grid-cols-6 m-0">
              <div className="col-span-1 my-2 lg:col-span-1 lg:my-1">
                <label
                  htmlFor="nID"
                  className="block text-sm font-medium leading-6 text-white">
                  NATIONAL ID
                </label>
                <input
                  type="text"
                  name="nID"
                  placeholder="Enter Your National ID"
                  value={nID}
                  disabled
                  // onChange={(e) => setNID(e.target.value)}
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-1 py-1 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              {/* //FIRST NAME */}
              <div className="col-span-2 my-2 lg:col-span-2 lg:my-1">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-white">
                  First name
                </label>
                <div className="">
                  <input
                    type="text"
                    name="fName"
                    value={fName}
                    // onChange={(e) => setFname(e.target.value)}
                    disabled
                    placeholder="First Name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0.5 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* LAST NAME */}
              <div className="col-span-2 my-2 lg:col-span-1 lg:my-1">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-white">
                  Last name
                </label>
                <div className="">
                  <input
                    type="text"
                    name="lName"
                    value={lName}
                    // onChange={(e) => setLName(e.target.value)}
                    disabled
                    placeholder="Last Name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-1 py-1 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* sex */}
              <div className="col-span-1 my-2 lg:col-span-1 lg:my-1">
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium leading-6 text-white">
                  Gender
                </label>
                <div className="">
                  <input
                    type="text"
                    name="mLname"
                    value={selectedSex}
                    // onChange={(e) => setMLname(e.target.value)}
                    disabled
                    placeholder="gender"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-1 py-1 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* MARITAL STATUS */}
              <div className="col-span-1 my-2 lg:col-span-1 lg:my-1">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium leading-6 text-white">
                  MARITAL STATUS
                </label>
                <div className="">
                  <input
                    type="text"
                    name="status1"
                    value={status1}
                    // onChange={(e) => setMLname(e.target.value)}
                    disabled
                    placeholder="Marital status"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-1 py-1 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* //MOTHER FIRST NAME */}
              <div className="col-span-2 my-2 lg:col-span-2 lg:my-1">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-white">
                  MOTHER'S FIRST NAME
                </label>
                <div className="">
                  <input
                    type="text"
                    name="mFname"
                    value={mFname}
                    // onChange={(e) => setMFname(e.target.value)}
                    disabled
                    placeholder="Mother's First Name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-1 py-1 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/*MOTHER'S LAST NAME */}
              <div className="col-span-2 my-2 lg:col-span-1 lg:my-1">
                <label
                  htmlFor="mLname"
                  className="block text-sm font-medium leading-6 text-white">
                  MOTHER'S LAST NAME
                </label>
                <div className="">
                  <input
                    type="text"
                    name="mLname"
                    value={mLname}
                    // onChange={(e) => setMLname(e.target.value)}
                    disabled
                    placeholder="Mother's Last Name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-1 py-1 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/* occupation */}
              <div className="col-span-1 my-2 lg:col-span-1 lg:my-1">
                <label
                  htmlFor="occupation"
                  className="block text-sm font-medium leading-6 text-white">
                  OCCUPATION
                </label>
                <div className="">
                  <input
                    type="text"
                    name="occupation"
                    value={occupation}
                    // onChange={(e) => setMLname(e.target.value)}
                    disabled
                    placeholder="occupation"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-1 py-1 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/* date of birth */}
              <div className="col-span-3 my-2 lg:col-span-1 lg:my-1">
                <label
                  htmlFor="selectedDate"
                  className="block text-sm font-medium leading-6 text-white">
                  DATE OF BIRTH
                </label>
                <div className="">
                  <input
                    type="text"
                    name="selectedDate"
                    value={selectedDate}
                    // onChange={(e) => setMLname(e.target.value)}
                    disabled
                    placeholder="Mother's Last Name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-1 py-1 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/* place of birth */}
              <div className="col-span-3 my-2 lg:col-span-1 lg:my-1">
                <label
                  htmlFor="pob"
                  className="block text-sm font-medium leading-6 text-white">
                  PLACE OF BIRTH
                </label>
                <div className="">
                  <input
                    type="text"
                    name="pob"
                    value={pob}
                    // onChange={(e) => setPob(e.target.value)}
                    disabled
                    placeholder="Place of Birth"
                    autoComplete="place of birth"
                    className="block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {/* {validationErrors.pob && (
        <span className="text-danger">{validationErrors.pob}</span>
      )} */}
                </div>
              </div>
            </div>

            <div className=" my-3 border-b border-gray-900/10 pb-6">
              <legend>CONTACT INFORMATION</legend>
              <div className="mt-10 grid grid-cols-3 gap-x-10 gap-y-1 lg:gap-y-3 sm:grid-cols-6 m-0">
                {/* CONTACT NUMBER */}
                <div className="col-span-3  lg:col-span-2 lg:my-1">
                  <label
                    htmlFor="contactNumber"
                    className="block text-sm font-medium leading-6 text-white">
                    YOUR CONTACT NUMBER
                  </label>
                  <div className="">
                    <input
                      type="number"
                      name="phoneNumber"
                      value={phoneNumber}
                      disabled
                      // onChange={(e) => setPhoneNumber(e.target.value)}
                      autoComplete="contact number"
                      className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
                {/* EMAIL */}
                <div className="col-span-3 my-1 lg:col-span-2 lg:my-1">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-white">
                    YOUR E-MAIL
                  </label>
                  <div className="">
                    <input
                      type="email"
                      name="email"
                      value={email}
                      disabled
                      // onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      className="block w-full rounded-md border-1 py-1 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Enter your E-mail"
                    />
                  </div>
                </div>
                {/* EMERGENCY CONTACT NAME */}
                <div className="col-span-3 my-1 lg:col-span-2 lg:my-1">
                  <label
                    htmlFor="emergency-contact"
                    className="block text-sm font-medium leading-6 text-white">
                    EMERGENCY CONTACT NAME
                  </label>
                  <div className="">
                    <input
                      type="text"
                      name="emergencyContactName"
                      value={emergencyContactName}
                      disabled
                      // onChange={(e) => setEmergencyContactName(e.target.value)}
                      // autoComplete="given-name"
                      placeholder="Enter your Emergency Contact Name"
                      className="block w-full rounded-md border-1 py-1 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                {/*EMERGENCY CONTACT NUMBER */}
                <div className="col-span-3 my-1 lg:col-span-2 lg:my-1">
                  <label
                    htmlFor="mLname"
                    className="block text-sm font-medium leading-6 text-white">
                    EMERGENCY CONTACT NUMBER
                  </label>
                  <div className="">
                    <input
                      type="number"
                      name="emergencyContactNumber"
                      value={emergencyContactNumber}
                      disabled
                      // onChange={(e) =>
                      //   setEmergencyContactNumber(e.target.value)
                      // }
                      // autoComplete="family-name"
                      placeholder="Enter your Emergency Contact Number"
                      className="block w-full rounded-md border-1 py-1 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>

            <legend>APPOINTMENT INFORMATION</legend>
            <div className=" grid grid-cols-1 gap-x-10 gap-y-2 sm:grid-cols-6 m-0">
              <div className="col-span-3  lg:col-span-2 lg:my-1">
                <label
                  htmlFor="state"
                  className="block text-sm font-medium leading-6 text-white">
                  STATE NAME
                </label>
                <div className="">
                  <input
                    type="text"
                    name="stateName"
                    value={stateName}
                    disabled
                    // onChange={(e) => setPhoneNumber(e.target.value)}
                    autoComplete="stateName"
                    className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="State name"
                  />
                </div>
              </div>
              <div className="col-span-3  lg:col-span-2 lg:my-1">
                <label
                  htmlFor="district"
                  className="block text-sm font-medium leading-6 text-white">
                  District Name
                </label>
                <div className="">
                  <input
                    type="text"
                    name="districtName"
                    value={districtName}
                    disabled
                    // onChange={(e) => setPhoneNumber(e.target.value)}
                    autoComplete="districtName"
                    className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="District Name"
                  />
                </div>
              </div>

              {/* 1502440 */}

              {/* <hr /> */}
              {selectedState?.length > 0 &&
                selectedState?.map((item) => (
                  <>
                    <div className="col-span-3  lg:col-span-2 lg:my-1">
                      <div className="form-group my-2">
                        <label htmlFor="office">Office Name</label>
                        <input
                          type="text"
                          name="office"
                          disabled
                          value={item.officeName}
                          className="block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="col-span-3  lg:col-span-2 lg:my-1">
                      <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <textarea
                          type="text"
                          name="location"
                          disabled
                          value={item.location}
                          className="block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="col-span-3  lg:col-span-2 lg:my-1">
                      <div className="form-group my-2">
                        <label htmlFor="contactNumber">
                          Office Contact Number
                        </label>
                        <input
                          type="Number"
                          name="contactNumber"
                          disabled
                          value={item.contactNumber}
                          className="block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </>
                ))}
              <div className="col-span-3  lg:col-span-1 lg:my-1">
                <div className="form-group">
                  <label htmlFor="date">Appointment Date</label>
                  <input
                    type="text"
                    name="appointmentDate"
                    // onChange={dateHandleChange}
                    value={appointmentDate}
                    id=""
                    className="block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="col-span-3  lg:col-span-1 lg:my-1">
                <div className="form-group">
                  <label htmlFor="appointmentTime">Appointment Time</label>
                  <input
                    type="text"
                    name="appointmentTime"
                    // onChange={dateHandleChange}
                    value={selectedTime}
                    id=""
                    className="block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center align-items-center">
              <button
                type="button"
                onClick={handlePrevious}
                className="w-full sm:w-auto rounded-md bg-white w-25 py-2 my-4 text-sm font-semibold text-black shadow-sm hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700">
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-full sm:w-auto rounded-md bg-sky-500 w-25 py-2 mx-3 my-4 text-sm font-semibold text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700">
                Next
              </button>
            </div>
          </div>
        )}
        {step === 6 && (
          <form className="shadow-lg mx-6 px-5" style={{ height: "596px" }}>
            <div className="shadow-2xl px-4 border-b border-gray-900/10 pb-6">
              <p className="mt-1 text-sm leading-6 text-white">
                PLEASE PROCEED THE PAYMENT INFORMATION TO MAKE YOUR PASSPORT
                APPOINTMENT SUCCESSFULLY
              </p>
              <p className="leading-6 text-white">
                <b>NB:</b> WE HAVE ONLY PAYMENT METHOD THAT WE CAN GET TO
                PROCEED YOUR PAYMENT.
              </p>

              <legend>PAYMENT INFORMATION</legend>
              <div className="mt-10 grid grid-cols-3 gap-x-10 gap-y-1 lg:gap-y-3  sm:grid-cols-6 m-0">
                {/* payment type */}
                <div className="col-span-3  lg:col-span-3 lg:my-1">
                  <label
                    htmlFor="payment"
                    className="block text-sm font-medium leading-6 text-white">
                    PAYMENT TYPE
                  </label>
                  <div className="">
                    <select
                      id="payment"
                      name="payment"
                      autoComplete="payment"
                      onChange={(e) => setPayment(e.target.value)}
                      disabled
                      placeholder="Marital Status"
                      className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                      <option value={"EVC-PLUS"}>EVC-PLUS </option>
                    </select>
                  </div>
                </div>
                {/* pay number */}
                <div className="col-span-3  lg:col-span-2 ">
                  <label
                    htmlFor="pob"
                    className="block text-sm font-medium leading-6 text-white">
                    Number of payment
                  </label>
                  <div className="">
                    <input
                      type="number"
                      name="paymentNumber"
                      value={payNumber}
                      onChange={(e) => setPayNumber(e.target.value)}
                      disabled
                      placeholder="Payment Number"
                      autoComplete="payment number"
                      className="block w-full rounded-md border-1 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="w-full sm:w-auto rounded-md bg-white w-25 py-2 my-4 text-sm font-semibold text-black shadow-sm hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700">
                  Previous
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full sm:w-auto rounded-md bg-sky-500 w-25 py-2 mx-3 my-4 text-sm font-semibold text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700">
                  Proceed
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
}

export default MultiStepForm;
