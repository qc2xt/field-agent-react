//not yet implemented
function DeleteAgent({agentId, firstName, middleName, lastName, dob, height, removeAgent}) {

    const defaultAgent = {
        agentId: 0,
        firstName: "",
        middleName: "",
        lastName: "",
        dob: null,
        height: 0
      }
    
      const [firstName, setFirstName] = useState('');
      const [middleName, setMiddleName] = useState('');
      const [lastName, setLastName] = useState('');
      const [dob, setDob] = useState();
      const [height, setHeight] = useState();
    
      const [agent, setAgent] = useState(defaultAgent);
    
      const { id } = useParams();
      const history = useHistory();
    
      useEffect(() => {
        fetch(`http://localhost:8080/api/agent/${id}`)
        .then(response => response.json())
        .then(data => setAgent(data))
        .catch(error => console.log(error))
      }, [id]);

      const deleteAgent = (event) => {
        event.preventDefault(); 

        fetch(`http://localhost:8080/api/agent/${id}`, {method: "DELETE" })
            .then (response => {
                if (response.status === 204 || response.status === 404) {
                removeAgent(agentId);
            } else {
                return Promise.reject(`delete found with status ${response.status}`)
            }
        });
    }

    return (
        <form onSubmit={deleteAgent}>
            <div className="form-group">
                <label htmlFor="agentIdTextBox">Agent Id:</label>
                <input type="text" id="agentIdTextBox"className="form-control" readOnly value={agent.agentId}/>
            </div>
            <div className="form-group">
                <label htmlFor="firstNameTextBox">First Name:</label>
                <input type="text" id="firstNameTextBox" className="form-control" readOnly value={agent.firstName}/>
            </div>
            <div className="form-group">
                <label htmlFor="middleNameTextBox">Middle Name:</label>
                <input type="text" id="middleNameTextBox" className="form-control" readOnly value={agent.middleName}/>
            </div>
            <div className="form-group">
                <label htmlFor="firstLastTextBox">Last Name:</label>
                <input type="text" id="lastNameTextBox" className="form-control" readOnly value={agent.lastName}/>
            </div>
            <div className="form-group">
                <label htmlFor="DOB">Date of Birth:</label>
                <input type="date" id="DOBbox" className="form-control" readOnly value={agent.dob}/>
            </div>
            <div className="form-group">
                <label htmlFor="height">Height (inches):</label>
                <input type="number" id="DOBbox" className="form-control" readOnly value={agent.height}/>
            </div>
            <Link className="btn btn-warning ml-2" to="/">Cancel</Link>
            <button type="submit" className="btn btn-primary mt-2">Delete</button>
        </form>

    );
}

export default DeleteAgent