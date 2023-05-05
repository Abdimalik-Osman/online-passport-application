import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  fetchData,
  getSingleDistrict,
  getDistrictData,
  getDistrictWorkingHours,
  useAppDispatch,
} from "./app/districtSlice";
import DistrictDetail from "./components/districtDetail";
import Select from "react-select";
function App() {

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOptions2, setSelectedOptions2] = useState([]);
  const [selectedId, setSelectedId] = useState("");
   const [selectedTime, setSelectedTime] = useState("");

  const dispatch = useAppDispatch();
  const items = useSelector((state) => state.district.districts);
  const status = useSelector((state) => state.district.status);
  const error = useSelector((state) => state.district.error);
  const selectedDistrict = useSelector((state) => state.district.selectedState);
  const selectedDistrictData = useSelector(
    (state) => state.district.districtData
  );
  const workingHours = useSelector((state) => state.district.workingHours);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchData());
    }
  }, [status, dispatch]);

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
    label: item.stateName,
  }));
  const options2 =
    selectedDistrictData.length > 0 &&
    selectedDistrictData?.map((item) => ({
      value: item?._id,
      label: item.districtName,
    }));
  const handleChange1 = (selected) => {
    setSelectedOptions(selected);
    // setSelectedId(selected.value);

    dispatch(getSingleDistrict(selected.value));
    setSelectedOptions2([]);
  };
  const handleChange2 = (selected) => {
    setSelectedOptions2(selected);
    dispatch(getDistrictData(selected.value));
    dispatch(getDistrictWorkingHours(selected.value));
    // console.log(selectedOptions2)
  };
  const handleSubmit = async () => {
    dispatch(getSingleDistrict(selectedId));
    // console.log(items)
  };  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  console.log(selectedTime);
  return (
    <div className="container">
      <h1>hello </h1>
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
      <br />
      {/* <button className='btn btn-sm btn-dark mt-3' onClick={handleSubmit}>GET DATA</button> */}
      {/* <DistrictDetail district={selectedDistrict}/> */}

      <div className="row">
        <div className="col">
          {selectedDistrict.length > 0 &&
            selectedDistrict?.map((item) => (
              <div className="">
                <h5>District Name: {item.districtName}</h5>
                <p>Office Name: {item.office}</p>
                <p>Location: {item.location}</p>
                <p>contact Number: {item.contactNumber}</p>
                <p>start Time: {item.startTime}</p>
                <p>End Time: {item.endTime}</p>
                <p>
                  Number of people to be worked every day: {item.dailySlots}
                </p>
                <p>Hourly Slots: {item.hourlySlots}</p>
                <p>start Time: {item.startTime}</p>
              </div>
            ))}
        </div>
        <div className="col">
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
    </div>
      </div>
    </div>
  );
}

export default App;
