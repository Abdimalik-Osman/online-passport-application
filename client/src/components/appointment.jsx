import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Appointment = ({unavailableDates}) => {
  
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  console.log(selectedDate)

  return (
    <div>
 <DatePicker
        startDate={new Date()}
        value={new Date()}
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
      />
    </div>
  );

};

export default Appointment;