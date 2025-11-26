import { Link } from 'react-router-dom';
import '../styles/Navigation.css';

function Navigation() {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <h1 className="nav-title">HR Application</h1>
        <div className="nav-links">
          <div className="nav-section">
            <h3>Employee Menu</h3>
            <Link to="/employee/hire" className="nav-link">Hire Employee</Link>
            <Link to="/employee/list" className="nav-link">Employee List</Link>
          </div>
          <div className="nav-section">
            <h3>Jobs Menu</h3>
            <Link to="/jobs/identify" className="nav-link">Identify Job</Link>
            <Link to="/jobs/update" className="nav-link">Update Job</Link>
            <Link to="/jobs/create" className="nav-link">Create Job</Link>
          </div>
          <div className="nav-section">
            <h3>Departments Menu</h3>
            <Link to="/departments" className="nav-link">View Departments</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
