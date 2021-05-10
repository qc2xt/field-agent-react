import { useState } from 'react';
import Agent from './Agent';
import UpdateAgent from './UpdateAgent';

function AgentList({ agents = [], removeAgent, updateAgents }) {
    let newAgent = {
        agentId: 0,
        firstName: '',
        middleName: '',
        lastName: '',
        dob: Date.now(),
        height: 0
      };
    
      const [agent, setAgent] = useState(newAgent);
    
      const update = (newFirst, newMiddle, newLast, newDob, newHeight) => {
          newAgent.firstName = newFirst;
          newAgent.middleName = newMiddle;
          newAgent.lastName = newLast;
          newAgent.dob = newDob;
          newAgent.height = newHeight;
    
          setAgent(newAgent);
        };


    return (
        <div className="card">
            <UpdateAgent agent={agent} updateView={updateAgents}/>
            <h2 className="card-title ml-3">Field Agents</h2>
            <ul className="list-group list-group-flush">
                {agents.map(a => <Agent key={a.agentId} agentId={a.agentId} firstName={a.firstName} middleName={a.middleName} lastName={a.lastName} removeAgent={removeAgent} updateAgent={update} />)}
            </ul>
        </div>   
    );
}

export default AgentList;