import React,{useState, useEffect} from 'react'
import { ToastContainer } from 'react-toastify';
import { useSelector } from "react-redux";
import {
  fetchData,
  getSingleDistrict,
  getDistrictWorkingHours,
  getUnavailableDates,
  getDistrictInfo,
  useAppDispatch,
  getAvailableDates,
} from "../../app/districtSlice";
import Select from "react-select";
const StepperFour = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedOptions2, setSelectedOptions2] = useState([]);
    const [selectedId, setSelectedId] = useState("");
     const [selectedTime, setSelectedTime] = useState("");
     const [selectedState, setSelectedState] = useState("");
  
    const dispatch = useAppDispatch();
    const items = useSelector((state) => state.district.districts);
    const status = useSelector((state) => state.district.status);
    const message = useSelector((state) => state.district.message);
    const error = useSelector((state) => state.district.error);
    const selectedDistrict = useSelector((state) => state.district.selectedState);
    const unavailableDates = useSelector((state) => state.district.unavailableDates);
    const availableDates = useSelector((state) => state.district.availableDates);
    const selectedDistrictData = useSelector(
      (state) => state.district.districtData
    );
    const workingHours = useSelector((state) => state.district.workingHours);
    useEffect(() => {
      if (status === "idle") {
        dispatch(fetchData());
     
      }

      
    }, [status, dispatch,availableDates,availableDates,selectedDistrict]);
  
    // console.log(items)
    // // const handleAddItem = async (item) => {
    // //   await dispatch(addItem(item));
    // // };
  
    // // const handleUpdateItem = async (item) => {
    // //   await dispatch(updateItem(item));
    // // };
  
    // // const handleDeleteItem = async (id) => {
    // //   await dispatch(deleteItem(id));
    // // };
  
    // if (status === 'loading') {
    //   return <div>Loading...</div>;
    // }
  
    // if (status === 'failed') {
    //   return <div>{error}</div>;
    // }
    const options = items?.map((item) => ({
      value: item?.districtInfo[0]?._id,
      label: item?.stateName,
    }));
    const options2 =
      selectedDistrictData.length > 0 &&
      selectedDistrictData?.map((item) => ({
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
      // setSelectedState("")
      // setSelectedTime("")
      // dispatch(getAvailableDates({selectedState, selectedTime}));
      // console.log(selectedOptions2)
    };
    const handleSubmit = async () => {
      dispatch(getSingleDistrict(selectedId));
      // console.log(items)
    };  const handleTimeChange = (e) => {
      setSelectedTime(e.target.value);
    };
  
    const dateHandleChange = (e) => {
      const id = selectedState;
      const appointmentDate = e.target.value;
      setSelectedTime(e.target.value);
      dispatch(getAvailableDates({id, appointmentDate}));
    }
    console.log(availableDates);
    console.log(workingHours);
  return (
      <div className="container">
      <ToastContainer />
      {/* <h1>hello </h1> */}
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
    
      {/* <button className='btn btn-sm btn-dark mt-3' onClick={handleSubmit}>GET DATA</button> */}
      {/* <DistrictDetail district={selectedDistrict}/> */}

      <div className="row mb-5">
        <div className="col">
          {selectedDistrict.length > 0 &&
            selectedDistrict?.map((item) => (
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
          </div>
          <div className='mt-2 form-control disabled'>
          {availableDates?.length === 0 ? (
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
      <span style={{ backgroundColor: info.availableNumber === 0 ? "transparent" : "" }}>
        {info.availableNumber} available slots
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
    </div>
  )
}

export default StepperFour
