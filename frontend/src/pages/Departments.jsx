import { useState, useEffect } from 'react';
import { getDepartments } from '../services/api';
import '../styles/Forms.css';

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await getDepartments();
      setDepartments(response.data);
    } catch (error) {
      setMessage({
        text: 'Error loading departments: ' + (error.response?.data?.error || error.message),
        type: 'error'
      });
    }
  };

  return (
    <div className="page-container">
      <h2>Departments</h2>
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Department ID</th>
              <th>Department Name</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept) => (
              <tr key={dept.department_id}>
                <td>{dept.department_id}</td>
                <td>{dept.department_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {departments.length === 0 && (
          <p className="no-data">No departments found</p>
        )}
      </div>
    </div>
  );
}

export default Departments;
