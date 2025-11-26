import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to HR Application</h1>
        <p className="subtitle">Manage your organization's human resources efficiently</p>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <h3>Employee Management</h3>
          <p>Hire new employees, update employee information, and view employee records</p>
          <div className="card-links">
            <Link to="/employee/hire" className="card-link">Hire Employee</Link>
            <Link to="/employee/list" className="card-link">View Employees</Link>
          </div>
        </div>

        <div className="feature-card">
          <h3>Job Management</h3>
          <p>Create new job positions, update job descriptions, and manage salary ranges</p>
          <div className="card-links">
            <Link to="/jobs/identify" className="card-link">Identify Job</Link>
            <Link to="/jobs/update" className="card-link">Update Job</Link>
            <Link to="/jobs/create" className="card-link">Create Job</Link>
          </div>
        </div>

        <div className="feature-card">
          <h3>Department Overview</h3>
          <p>View all departments in your organization</p>
          <div className="card-links">
            <Link to="/departments" className="card-link">View Departments</Link>
          </div>
        </div>
      </div>

      <div className="info-section">
        <h2>Features</h2>
        <ul className="features-list">
          <li>Employee hiring with automatic salary validation</li>
          <li>Update employee information (salary, phone, email)</li>
          <li>Job position management with salary ranges</li>
          <li>Department tracking</li>
          <li>Database triggers ensure salary constraints</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
