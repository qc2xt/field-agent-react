import Agent from './Agent';
import {useEffect, useState } from "react";

function AgentList({ removeAgent }) {

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
                        {agents.map(a => <Agent key={a.agentId} agentId={a.agentId} firstName={a.firstName} middleName={a.middleName} lastName={a.lastName} dob={a.dob} height={a.height} removeAgent={removeAgent}/>)}
                    </ul>
                </div>
            </div>
        </div>   
        
    );
}

export default AgentList;