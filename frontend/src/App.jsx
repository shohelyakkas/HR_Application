import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import EmployeeHire from './pages/EmployeeHire';
import EmployeeList from './pages/EmployeeList';
import JobIdentify from './pages/JobIdentify';
import JobUpdate from './pages/JobUpdate';
import JobCreate from './pages/JobCreate';
import Departments from './pages/Departments';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/employee/hire" element={<EmployeeHire />} />
            <Route path="/employee/list" element={<EmployeeList />} />
            <Route path="/jobs/identify" element={<JobIdentify />} />
            <Route path="/jobs/update" element={<JobUpdate />} />
            <Route path="/jobs/create" element={<JobCreate />} />
            <Route path="/departments" element={<Departments />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
