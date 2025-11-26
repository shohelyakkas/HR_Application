import { useState } from 'react';
import { getJob } from '../services/api';
import '../styles/Forms.css';

function JobIdentify() {
  const [jobId, setJobId] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });
    setJobTitle('');

    try {
      const response = await getJob(jobId);
      setJobTitle(response.data.title);
      setMessage({ text: 'Job found successfully!', type: 'success' });
    } catch (error) {
      setMessage({
        text: 'Error: ' + (error.response?.data?.error || 'Job not found'),
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setJobId('');
    setJobTitle('');
    setMessage({ text: '', type: '' });
  };

  return (
    <div className="page-container">
      <h2>Identify Job Description</h2>
      <p className="info-text">Enter a Job ID to retrieve its description</p>
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit} className="form-container simple-form">
        <div className="form-group">
          <label>Job ID *</label>
          <input
            type="text"
            value={jobId}
            onChange={(e) => setJobId(e.target.value.toUpperCase())}
            required
            placeholder="e.g., SA_REP"
          />
        </div>

        {jobTitle && (
          <div className="result-box">
            <h3>Job Description:</h3>
            <p className="job-title">{jobTitle}</p>
          </div>
        )}

        <div className="form-buttons">
          <button type="button" onClick={handleClear} className="btn-cancel">
            Clear
          </button>
          <button type="submit" disabled={loading} className="btn-submit">
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default JobIdentify;
