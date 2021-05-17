import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <h1>There's nothing here...<Link to="/"> Return Home</Link></h1>
    );
}

export default NotFound;