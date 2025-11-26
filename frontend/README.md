# HR Application Frontend

React-based frontend for the HR Application management system.

## Features

- **Employee Management**: Hire employees, view employee list, update employee information
- **Job Management**: Identify jobs, create new jobs, update job descriptions
- **Department Overview**: View all departments
- **Real-time Validation**: Salary validation via backend triggers

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running on `http://localhost:3001`

## Installation

```bash
cd frontend
npm install
```

## Running the Application

```bash
npm run dev
```

The application will start on `http://localhost:5173`

## Building for Production

```bash
npm run build
```

## Project Structure

```
frontend/
├── src/
│   ├── components/      # Reusable components
│   │   └── Navigation.jsx
│   ├── pages/          # Page components
│   │   ├── Home.jsx
│   │   ├── EmployeeHire.jsx
│   │   ├── EmployeeList.jsx
│   │   ├── JobIdentify.jsx
│   │   ├── JobUpdate.jsx
│   │   ├── JobCreate.jsx
│   │   └── Departments.jsx
│   ├── services/       # API service layer
│   │   └── api.js
│   ├── styles/         # CSS stylesheets
│   │   ├── Navigation.css
│   │   ├── Forms.css
│   │   └── Home.css
│   ├── App.jsx         # Main application component
│   ├── App.css         # Global styles
│   └── main.jsx        # Application entry point
└── package.json
```

## API Endpoints Used

- `POST /hire-employee` - Hire new employee
- `GET /employees` - Get all employees
- `PUT /employee/:id` - Update employee info
- `GET /job/:jobId` - Get job by ID
- `GET /jobs` - Get all jobs
- `POST /create-job` - Create new job
- `PUT /job/:jobId` - Update job
- `GET /departments` - Get all departments
- `GET /managers` - Get all managers

## Technologies

- React 18
- React Router DOM
- Axios
- Vite
- CSS3
