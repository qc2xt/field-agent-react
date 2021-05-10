function Agent({ agentId, firstName, middleName, lastName, dob, height, removeAgent, updateAgent }) {

    const deleteById = () => {
        fetch(`http://localhost:8080/api/agent/${agentId}`, {method: "DELETE" })
            .then (response => {
                if (response.status === 204 || response.status === 404) {
                removeAgent(agentId);
            } else {
                return Promise.reject(`delete found with status ${response.status}`)
            }
        });
    }

    const update = () => {
        updateAgent(agentId, firstName, middleName, lastName, dob, height)
    }

    return (
        <li className="list-group-item">
            Agent {agentId}: {firstName} {middleName} {lastName} {height}
            <button onClick={update}>Update</button>
            <button onClick={deleteById}>Delete</button>
        </li>
    );
}

export default Agent;