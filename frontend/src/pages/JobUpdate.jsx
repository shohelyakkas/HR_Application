import { useState, useEffect } from 'react';
import { getJobs, updateJob } from '../services/api';
import '../styles/Forms.css';

function JobUpdate() {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    min_salary: '',
    max_salary: ''
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await getJobs();
      setJobs(response.data);
    } catch (error) {
      setMessage({
        text: 'Error loading jobs: ' + (error.response?.data?.error || error.message),
        type: 'error'
      });
    }
  };

  const handleJobSelect = (e) => {
    const jobId = e.target.value;
    setSelectedJobId(jobId);
    const selectedJob = jobs.find(j => j.job_id === jobId);
    if (selectedJob) {
      setFormData({
        title: selectedJob.job_title,
        min_salary: selectedJob.min_salary,
        max_salary: selectedJob.max_salary
      });
    }
    setMessage({ text: '', type: '' });
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
      await updateJob(selectedJobId, formData);
      setMessage({ text: 'Job updated successfully!', type: 'success' });
      fetchJobs(); // Refresh the job list
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
    setSelectedJobId('');
    setFormData({ title: '', min_salary: '', max_salary: '' });
    setMessage({ text: '', type: '' });
  };

  return (
    <div className="page-container">
      <h2>Update Job Information</h2>
      <p className="info-text">Select a job and update its description, min salary, or max salary</p>
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label>Select Job *</label>
          <select value={selectedJobId} onChange={handleJobSelect} required>
            <option value="">Choose a job...</option>
            {jobs.map(job => (
              <option key={job.job_id} value={job.job_id}>
                {job.job_id} - {job.job_title}
              </option>
            ))}
          </select>
        </div>

        {selectedJobId && (
          <div className="form-grid">
            <div className="form-group">
              <label>Job Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
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
              />
            </div>
          </div>
        )}

        {selectedJobId && (
          <div className="form-buttons">
            <button type="button" onClick={handleCancel} className="btn-cancel">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-submit">
              {loading ? 'Updating...' : 'Update Job'}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default JobUpdate;
