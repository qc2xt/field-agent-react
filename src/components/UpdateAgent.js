import { useState } from 'react';

function UpdateAgent( {agent, updateView} ) {
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState();
    const [height, setHeight] = useState(0);

    const handleUpdate = (event) => {
        event.preventDefault();

        const newAgent = {
            agentId: agent.agentId,
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            dob: dob,
            heightInInches: height,
            agencies: []
        }

        const init = {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
            },
            body: JSON.stringify(newAgent)
        };

        fetch(`http://localhost:8080/api/agent/${agent.agentId}`, init)
            .then(response => {
                if (response.status !== 204) {
                return Promise.reject("update failed");
                }
            })
            .then(updateView(newAgent)) 
            .catch(console.log)
    }

    const handleFNChange = (event) => {
        setFirstName(event.target.value);
    }

    const handleMNChange = (event) => {
        setMiddleName(event.target.value);
    }

    const handleLNChange = (event) => {
        setLastName(event.target.value);
    }

    const handleDOBChange = (event) => {
        setDob(event.target.value);
    }

    const handleHeightChange = (event) => {
        setHeight(event.target.value);
    }

    return (
        <form onSubmit={handleUpdate}>
            <div className="form-group">
                <label htmlFor="agentIdTextBox">Agent Id:</label>
                <input type="text" id="agentIdTextBox"className="form-control" readOnly="readOnly" value={agent.agentId}/>
            </div>
            <div className="form-group">
                <label htmlFor="firstNameTextBox">First Name:</label>
                <input type="text" id="firstNameTextBox" onChange={handleFNChange} className="form-control" placeholder="I'm required" defaultValue={agent.firstName}/>
            </div>
            <div className="form-group">
                <label htmlFor="middleNameTextBox">Middle Name:</label>
                <input type="text" id="middleNameTextBox" onChange={handleMNChange} className="form-control" placeholder="I'm required" defaultValue={agent.middleName}/>
            </div>
            <div className="form-group">
                <label htmlFor="firstLastTextBox">Last Name:</label>
                <input type="text" id="lastNameTextBox" onChange={handleLNChange} className="form-control" placeholder="I'm required" defaultValue={agent.lastName}/>
            </div>
            <div className="form-group">
                <label htmlFor="DOB">Date of Birth:</label>
                <input type="date" id="DOBbox" onChange={handleDOBChange} className="form-control" defaultValue={agent.dob}/>
            </div>
            <div className="form-group">
                <label htmlFor="height">Height (inches):</label>
                <input type="number" id="DOBbox" onChange={handleHeightChange} className="form-control" placeholder="I'm required" defaultValue={agent.height}/>
            </div>
            <button type="submit" className="btn btn-primary mt-2">Update</button>
        </form>
    );
}

export default UpdateAgent;