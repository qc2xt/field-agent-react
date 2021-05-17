import { useContext, useEffect, useState } from "react";
import AgentList from "./AgentList";
import AddAgent from "./AddAgent";
import AuthContext from './AuthContext';

function FieldAgent() {
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

  const removeAgent = (agentId) => {
    let newAgents = [];

    for (let i = 0; i < agents.length; i++) {
      if (agents[i].agentId !== agentId) {
        newAgents.push(agents[i]);
      }
    }

    if (newAgents.length !== agents.length) {
      setAgents(newAgents);
      setMessages("");
    } else {
      setMessages("Could not find that agent to remove");
    }
  };

  return (
    <div className="container">
      <div className="row">
        {messages && <p className="error"> {messages} </p>}
      </div>
      <div className="row">
        <div className="col">
          <AgentList
            agents={agents}
            removeAgent={removeAgent}
          />
        </div>
        <div className="col">
          <AddAgent addAgent={addAgent} />
        </div>
      </div>
    </div>
  );
}

export default FieldAgent;
