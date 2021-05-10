import { useState } from 'react';

const DeleteAgent = (agent) => {
    return (
        <form onSubmit={deleteAgent}>
            <div className="form-group">
                <label htmlFor="agentIdTextBox">Agent Id:</label>
                <input type="text" id="agentIdTextBox"className="form-control" readOnly="readOnly" value={agent.agentId}/>
            </div>
            <div className="form-group">
                <label htmlFor="firstNameTextBox">First Name:</label>
                <input type="text" id="firstNameTextBox" onChange={handleFNChange} className="form-control" readOnly="readOnly" value={agent.firstName}/>
            </div>
            <div className="form-group">
                <label htmlFor="middleNameTextBox">Middle Name:</label>
                <input type="text" id="middleNameTextBox" onChange={handleMNChange} className="form-control" readOnly="readOnly" value={agent.middleName}/>
            </div>
            <div className="form-group">
                <label htmlFor="firstLastTextBox">Last Name:</label>
                <input type="text" id="lastNameTextBox" onChange={handleLNChange} className="form-control" readOnly="readOnly" value={agent.lastName}/>
            </div>
            <div className="form-group">
                <label htmlFor="DOB">Date of Birth:</label>
                <input type="date" id="DOBbox" onChange={handleDOBChange} className="form-control" readOnly="readOnly" value={agent.dob}/>
            </div>
            <div className="form-group">
                <label htmlFor="height">Height (inches):</label>
                <input type="number" id="DOBbox" onChange={handleHeightChange} className="form-control" readOnly="readOnly" value={agent.height}/>
            </div>
            <button type="submit" className="btn btn-primary mt-2">Cancel</button>
            <button type="submit" className="btn btn-primary mt-2">Delete</button>
        </form>

    );
}

export default DeleteAgent