import React, { useState } from 'react';

const StepOne = ({ nextStep }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>PAYMENT INFORMATION</h2>
      <label>
        type:
        <input type="text" name="name" value={name} onChange={(event) => setName(event.target.value)} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      </label>
      <br />
      <button type="submit">Next</button>
    </form>
  );
};

export default StepOne;