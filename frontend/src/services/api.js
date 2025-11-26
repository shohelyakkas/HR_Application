import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Employee APIs
export const hireEmployee = (employeeData) => api.post('/hire-employee', employeeData);
export const getEmployees = () => api.get('/employees');
export const updateEmployee = (id, data) => api.put(`/employee/${id}`, data);

// Job APIs
export const getJob = (jobId) => api.get(`/job/${jobId}`);
export const getJobs = () => api.get('/jobs');
export const createJob = (jobData) => api.post('/create-job', jobData);
export const updateJob = (jobId, jobData) => api.put(`/job/${jobId}`, jobData);

// Department APIs
export const getDepartments = () => api.get('/departments');

// Manager APIs
export const getManagers = () => api.get('/managers');

export default api;
