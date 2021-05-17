import Agent from './Agent';
import { useContext, useEffect, useState } from 'react';
import AuthContext from './AuthContext';

function DisplayAgents() {

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

    const auth = useContext(AuthContext);

    return (
        <>
        <div className="row">
            <h2>Hello {auth.user.username}!</h2>
        </div>
        <div className="row">
            <div className="col">
                <div className="card">
                    <h2 className="card-title ml-3">All Agents</h2>
                    <ul className="list-group list-group-flush">
                        {agents.map(a => <p>Agent {a.agentId}: {a.firstName} {a.middleName} {a.lastName}, {a.dob}</p>)}
                    </ul>
                </div>
            </div>
        </div>   
        </>
    );
}

export default DisplayAgents;