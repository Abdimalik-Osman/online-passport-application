import React, { useState } from 'react';

const StepTwo = ({ nextStep }) => {
  const [contactNumber, setContact] = useState('');
  const [cName, setCName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>CONTACT</h2>
      <label>
        Contact Number:
        <input type="text" name="contactNumber" value={contactNumber} onChange={(event) => setContact(event.target.value)} />
      </label>
      <br />
      <label>
        Contact Name:
        <input type="text" name="cName" value={cName} onChange={(event) => setCName(event.target.value)} />
      </label>
      <br />
      <button type="submit">Next</button>
    </form>
  );
};

export default StepTwo;