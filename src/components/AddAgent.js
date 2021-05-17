import React, { useEffect, useState } from "react";

function AddAgent() {
  const defaultAgent = {
    agentId: 0,
    firstName: "",
    middleName: "",
    lastName: "",
    dob: null,
    height: 0
  }

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState();
  const [height, setHeight] = useState();

  const [agents, setAgents] = useState([]);
  const [messages, setMessages] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/agent")
      .then((response) => {
        if (response.status !== 200) {
          console.log(response);
          return Promise.reject("get didn't work...");
        }
        return response.json();
      })
      .then((json) => setAgents(json))
      .catch(console.log);
  }, []);

  const addFetch = (agent) => {
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(agent),
    };

    fetch("http://localhost:8080/api/agent", init)
      .then((response) => {
        if (response.status !== 201) {
          return Promise.reject("Error.");
        }
        return response.json();
      })
      .then((json) => {
        setAgents([...agents, json]);
        setMessages("");
      })
      .catch(console.log);
  };

  const addAgent = (agent) => {
    let canSet = true;

    for (let i = 0; i < agents.length; i++) {
      if (agent.agentId === agents[i].agentId) {
        canSet = false;
      }
    }

    if (canSet) {
      addFetch(agent);
    } else {
      setMessages("Agent Already Exists");
    }
  };

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
