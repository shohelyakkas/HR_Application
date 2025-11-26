import { useState, useEffect } from 'react';
import { getEmployees, updateEmployee } from '../services/api';
import '../styles/Forms.css';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ salary: '', phone: '', email: '' });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await getEmployees();
      setEmployees(response.data);
    } catch (error) {
      setMessage({
        text: 'Error loading employees: ' + (error.response?.data?.error || error.message),
        type: 'error'
      });
    }
  };

  const handleEdit = (employee) => {
    setEditingId(employee.employee_id);
    setEditForm({
      salary: employee.salary || '',
      phone: employee.phone_number || '',
      email: employee.email || ''
    });
    setMessage({ text: '', type: '' });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({ salary: '', phone: '', email: '' });
    setMessage({ text: '', type: '' });
  };

  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (employeeId) => {
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      await updateEmployee(employeeId, editForm);
      setMessage({ text: 'Employee updated successfully!', type: 'success' });
      setEditingId(null);
      fetchEmployees();
    } catch (error) {
      setMessage({
        text: 'Error: ' + (error.response?.data?.error || error.message),
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h2>Employee List</h2>
      <p className="info-text">You can edit Salary, Phone, or Email only</p>
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Job ID</th>
              <th>Salary</th>
              <th>Manager ID</th>
              <th>Dept ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.employee_id}>
                <td>{employee.employee_id}</td>
                <td>{employee.first_name}</td>
                <td>{employee.last_name}</td>
                <td>
                  {editingId === employee.employee_id ? (
                    <input
                      type="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleChange}
                      className="edit-input"
                    />
                  ) : (
                    employee.email
                  )}
                </td>
                <td>
                  {editingId === employee.employee_id ? (
                    <input
                      type="text"
                      name="phone"
                      value={editForm.phone}
                      onChange={handleChange}
                      className="edit-input"
                    />
                  ) : (
                    employee.phone_number
                  )}
                </td>
                <td>{employee.job_id}</td>
                <td>
                  {editingId === employee.employee_id ? (
                    <input
                      type="number"
                      name="salary"
                      value={editForm.salary}
                      onChange={handleChange}
                      className="edit-input"
                      min="0"
                      step="0.01"
                    />
                  ) : (
                    `$${employee.salary ? employee.salary.toLocaleString() : '0'}`
                  )}
                </td>
                <td>{employee.manager_id}</td>
                <td>{employee.department_id}</td>
                <td className="actions-cell">
                  {editingId === employee.employee_id ? (
                    <>
                      <button
                        onClick={() => handleUpdate(employee.employee_id)}
                        disabled={loading}
                        className="btn-save"
                      >
                        {loading ? 'Saving...' : 'Save'}
                      </button>
                      <button onClick={handleCancel} className="btn-cancel-small">
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleEdit(employee)}
                      className="btn-edit"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {employees.length === 0 && (
          <p className="no-data">No employees found</p>
        )}
      </div>
    </div>
  );
}

export default EmployeeList;
