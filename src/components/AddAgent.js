import React, { useState } from "react";

function AddAgent({ addAgent }) {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState();
  const [height, setHeight] = useState();

  const handleAdd = (event) => {
    event.preventDefault();
    event.stopPropagation();

    let agent = {};

    agent["firstName"] = firstName;
    agent["middleName"] = middleName;
    agent["lastName"] = lastName;
    agent["dob"] = dob;
    agent["heightInInches"] = height;
    agent["agencies"] = [];

    addAgent(agent);
  };

  {
    /*const handleIdChange = (event) => {
        setAgentId(event.target.value);
    }*/
  }

  const handleFNChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleMNChange = (event) => {
    setMiddleName(event.target.value);
  };

  const handleLNChange = (event) => {
    setLastName(event.target.value);
  };

  const handleDOBChange = (event) => {
    setDob(event.target.value);
  };

  const handleHeightChange = (event) => {
    setHeight(event.target.value);
  };

  return (
    <div className="card">
      <h2 className="card-title ml-3">Add Agent</h2>
      <div className="card-body">
        <form onSubmit={handleAdd}>
          {/*<div className="form-group">
                        <label htmlFor="agentIdTextBox">Agent Id:</label>
                        <input type="text" id="agentIdTextBox" onChange={handleIdChange} className="form-control" placeholder="I'm required" required/>
                    </div>*/}
          <div className="form-group">
            <label htmlFor="firstNameTextBox">First Name:</label>
            <input
              type="text"
              id="firstNameTextBox"
              onChange={handleFNChange}
              className="form-control"
              placeholder="I'm required"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="middleNameTextBox">Middle Name:</label>
            <input
              type="text"
              id="middleNameTextBox"
              onChange={handleMNChange}
              className="form-control"
              placeholder="I'm required"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="firstLastTextBox">Last Name:</label>
            <input
              type="text"
              id="lastNameTextBox"
              onChange={handleLNChange}
              className="form-control"
              placeholder="I'm required"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="DOB">Date of Birth:</label>
            <input
              type="date"
              id="DOBbox"
              onChange={handleDOBChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="height">Height (inches):</label>
            <input
              type="number"
              id="HeightBox"
              onChange={handleHeightChange}
              className="form-control"
              placeholder="I'm required"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mt-2">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddAgent;
