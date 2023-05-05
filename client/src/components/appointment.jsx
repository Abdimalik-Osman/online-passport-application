import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Appointment = () => {
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    // Fetch the available appointment dates from an API
    const fetchAvailableDates = async () => {
      try {
        const response = await fetch("https://example.com/available-dates");
        const data = await response.json();
        setAvailableDates(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAvailableDates();
  }, []);

  const isDateDisabled = (date) => {
    // Check if the date is disabled based on the available appointment dates
    return !availableDates.includes(date.toISOString().split("T")[0]);
  };

  const isDateHighlighted = (date) => {
    // Check if the date is highlighted based on the selected date
    return selectedDate && date.toISOString().split("T")[0] === selectedDate.toISOString().split("T")[0];
  };

  const handleDateChange = (date) => {
    // Update the selected date
    setSelectedDate(date);
  };

  return (
    <div>
      <DatePicker
        dateFormat="yyyy-MM-dd"
        minDate={new Date()}
        filterDate={isDateDisabled}
        highlightDates={availableDates.map((date) => new Date(date))}
        includeDates={availableDates.map((date) => new Date(date))}
        selected={selectedDate}
        onChange={handleDateChange}
        dayClassName={(date) => isDateHighlighted(date) ? 'highlighted' : ''}
      />
    </div>
  );
};

export default Appointment;