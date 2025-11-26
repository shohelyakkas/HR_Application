import { useState } from 'react';
import { createJob } from '../services/api';
import '../styles/Forms.css';

function JobCreate() {
  const [formData, setFormData] = useState({
    job_id: '',
    title: '',
    min_salary: '',
    max_salary: ''
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'job_id' ? value.toUpperCase() : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      await createJob(formData);
      setMessage({ text: 'Job created successfully!', type: 'success' });
      // Reset form
      setFormData({
        job_id: '',
        title: '',
        min_salary: '',
        max_salary: ''
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
      job_id: '',
      title: '',
      min_salary: '',
      max_salary: ''
    });
    setMessage({ text: '', type: '' });
  };

  return (
    <div className="page-container">
      <h2>Create New Job</h2>
      <p className="info-text">Fill in all fields to create a new job position</p>
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-grid">
          <div className="form-group">
            <label>Job ID *</label>
            <input
              type="text"
              name="job_id"
              value={formData.job_id}
              onChange={handleChange}
              required
              placeholder="e.g., AS_MAN"
              maxLength="10"
            />
          </div>

          <div className="form-group">
            <label>Job Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g., ASSISTANT MANAGER"
            />
          </div>

          <div className="form-group">
            <label>Minimum Salary *</label>
            <input
              type="number"
              name="min_salary"
              value={formData.min_salary}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              placeholder="e.g., 3500"
            />
          </div>

          <div className="form-group">
            <label>Maximum Salary *</label>
            <input
              type="number"
              name="max_salary"
              value={formData.max_salary}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              placeholder="e.g., 5500"
            />
          </div>
        </div>

        <div className="form-buttons">
          <button type="button" onClick={handleCancel} className="btn-cancel">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="btn-submit">
            {loading ? 'Creating...' : 'Create Job'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default JobCreate;
