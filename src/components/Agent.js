import { Link } from 'react-router-dom';

function Agent({ agentId, firstName, middleName, lastName, removeAgent}) {

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

    return (
        <li className="list-group-item">
            Agent {agentId}: {firstName} {middleName} {lastName}
            <Link className="btn btn-warning ml-2" to={`/agents/edit/${agentId}`}>Update</Link>
            <button className="btn btn-secondary" onClick={deleteById}>Delete</button>
        </li>
    );
}

export default Agent;