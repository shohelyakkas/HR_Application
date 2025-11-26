import { useState, useEffect } from 'react';
import { hireEmployee, getJobs, getManagers, getDepartments } from '../services/api';
import '../styles/Forms.css';

function EmployeeHire() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    salary: '',
    hire_date: new Date().toISOString().split('T')[0],
    job_id: '',
    manager_id: '',
    department_id: ''
  });

  const [jobs, setJobs] = useState([]);
  const [managers, setManagers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDropdownData();
  }, []);

  const fetchDropdownData = async () => {
    try {
      const [jobsRes, managersRes, depsRes] = await Promise.all([
        getJobs(),
        getManagers(),
        getDepartments()
      ]);
      setJobs(jobsRes.data);
      setManagers(managersRes.data);
      setDepartments(depsRes.data);
    } catch (error) {
      setMessage({
        text: 'Error loading dropdown data: ' + (error.response?.data?.error || error.message),
        type: 'error'
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      await hireEmployee(formData);
      setMessage({ text: 'Employee hired successfully!', type: 'success' });
      // Reset form
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        salary: '',
        hire_date: new Date().toISOString().split('T')[0],
        job_id: '',
        manager_id: '',
        department_id: ''
      });
    } catch (error) {
      setMessage({
        text: 'Error: ' + (error.response?.data?.error || error.message),
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      salary: '',
      hire_date: new Date().toISOString().split('T')[0],
      job_id: '',
      manager_id: '',
      department_id: ''
    });
    setMessage({ text: '', type: '' });
  };

  return (
    <div className="page-container">
      <h2>Employee Hiring Form</h2>
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-grid">
          <div className="form-group">
            <label>First Name *</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Last Name *</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="555-0000"
            />
          </div>

          <div className="form-group">
            <label>Hire Date *</label>
            <input
              type="date"
              name="hire_date"
              value={formData.hire_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Salary *</label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
            />
          </div>

          <div className="form-group">
            <label>Job *</label>
            <select
              name="job_id"
              value={formData.job_id}
              onChange={handleChange}
              required
            >
              <option value="">Select Job</option>
              {jobs.map(job => (
                <option key={job.job_id} value={job.job_id}>
                  {job.job_id} - {job.job_title}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Manager *</label>
            <select
              name="manager_id"
              value={formData.manager_id}
              onChange={handleChange}
              required
            >
              <option value="">Select Manager</option>
              {managers.map(manager => (
                <option key={manager.employee_id} value={manager.employee_id}>
                  {manager.employee_id} - {manager.first_name} {manager.last_name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Department *</label>
            <select
              name="department_id"
              value={formData.department_id}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept.department_id} value={dept.department_id}>
                  {dept.department_id} - {dept.department_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-buttons">
          <button type="button" onClick={handleCancel} className="btn-cancel">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="btn-submit">
            {loading ? 'Hiring...' : 'Hire'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmployeeHire;
