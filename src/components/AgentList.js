import Agent from './Agent';
import {useEffect, useState } from "react";

function AgentList({ removeAgent}) {

    const [agents, setAgents] = useState([]);
  

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

    return (
        <div className="row">
            <div className="col">
                <div className="card">
                    <h2 className="card-title ml-3">All Agents</h2>
                    <ul className="list-group list-group-flush">
                        {agents.map(a => <p>Agent {a.agentId}: {a.firstName} {a.middleName} {a.lastName}, </p>)}
                    </ul>
                </div>
            </div>
        </div>   
        
    );
}

export default AgentList;