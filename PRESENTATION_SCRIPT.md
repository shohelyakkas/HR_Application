# HR Application - Project Presentation
## COMP214 - Advanced Database (PL/SQL)
### Final Project Demo

---

## 1. PROJECT INTRODUCTION (1 min)

### Team Members & Responsibilities
- **[Member 1 Name]**: Database Design & PL/SQL Stored Procedures
  - Implemented `employee_hire_sp`, `new_job_sp`
  - Created `check_salary` procedure and `check_salary_trg` trigger

- **[Member 2 Name]**: Frontend Development
  - Built React application with all UI components
  - Integrated API service layer for backend communication

- **[Member 3 Name]**: Backend API & Integration
  - Developed Node.js/Express backend server
  - Connected Oracle database with frontend using oracledb driver

### Tools & Technologies Used
- **Database**: Oracle Database (oracle1.centennialcollege.ca)
- **Database Tool**: Oracle SQL Developer
- **Backend**: Node.js, Express.js, oracledb
- **Frontend**: React 18, React Router DOM, Axios, Vite
- **Version Control**: Git & GitHub

### Project Status
✅ All PL/SQL procedures compiled and tested successfully
✅ All triggers deployed and functional
✅ Frontend-backend integration complete
✅ Database connection established and verified

---

## 2. MAIN MENU NAVIGATION

### Application Structure
Our HR Application has three main functional areas:

1. **🧍‍♂️ Employee Main Menu**
   - Hire Employee
   - View Employee List
   - Update Employee Information

2. **🧑‍💼 Jobs Main Menu**
   - Identify Job
   - Update Job Information
   - Create New Job

3. **🏢 Departments Main Menu**
   - View All Departments

**Demo**: Navigate through the sidebar menu showing all options

---

## 3. EMPLOYEE HIRING DEMO (4-5 mins)

### a. React Form Demonstration

**Action**: Open "Hire Employee" page

**Form Fields**:
- First Name: [Enter value]
- Last Name: [Enter value]
- Email: [Enter value]
- Phone Number: [Enter value]
- Salary: [Enter value]
- Hire Date: [Select date]

**Dropdown Fields** (populated from database):
- **Job ID**: Dropdown from HR_JOBS table
- **Manager**: Dropdown from HR_EMPLOYEES table
- **Department**: Dropdown from HR_DEPARTMENTS table

### 💬 Simulated Instructor Question:
**Q**: "Where is this dropdown pulling values from?"

**A**: "These dropdowns are populated by querying the database:
- Job dropdown: `SELECT job_id, job_title FROM hr_jobs`
- Manager dropdown: `SELECT employee_id, first_name, last_name FROM hr_employees WHERE job_id LIKE '%MGR'`
- Department dropdown: `SELECT department_id, department_name FROM hr_departments`

The backend API endpoints (`/jobs`, `/managers`, `/departments`) fetch this data when the page loads."

### b. Successful Insert

**Action**: Fill form with valid data
- Example: First Name: "John", Last Name: "Smith", Email: "john.smith@company.com"
- Salary: 8000, Job: SA_REP (Sales Representative)
- Select Manager and Department

**Click "Hire Employee"**

**Explanation**:
"When we click Hire, the frontend calls our backend API endpoint `POST /hire-employee`, which executes the stored procedure `employee_hire_sp`. This procedure performs an INSERT into the HR_EMPLOYEES table."

**SQL Developer Verification**:
```sql
SELECT * FROM HR_EMPLOYEES
ORDER BY EMPLOYEE_ID DESC;
```

**Point to**: The newly inserted row showing all entered data

### c. Negative Test - Invalid Salary

**Action**: Try inserting employee with invalid salary

**Test Case**:
- Job: AC_MGR (Accounting Manager)
- Salary: 1000 (below minimum for this job)

**Click "Hire Employee"**

**Expected Result**: Error message displayed

**Explanation**:
"The `check_salary_trg` trigger fires BEFORE INSERT and calls the `check_salary` procedure. This procedure verifies that the salary falls within the min_salary and max_salary range for the selected job. Since 1000 is below the minimum for AC_MGR, the trigger raises an application error and blocks the insert."

**SQL Developer Verification**:
```sql
-- Show the job's salary range
SELECT job_id, job_title, min_salary, max_salary
FROM hr_jobs
WHERE job_id = 'AC_MGR';

-- Show the trigger code
SELECT text FROM user_source
WHERE name = 'CHECK_SALARY_TRG'
ORDER BY line;
```

---

## 4. EMPLOYEE UPDATE/DELETE DEMO (2-3 mins)

### Employee List Grid

**Action**: Navigate to "Employee List" page

**Display**: Table showing all employees with columns:
- ID, First Name, Last Name, Email, Phone, Job ID, Salary, Manager ID, Dept ID, Actions

### Update Employee Information

**Editable Fields** (ONLY):
- ✅ Email
- ✅ Phone Number
- ✅ Salary

**Action**: Click "Edit" button on an employee row

**Demo**:
1. Change Phone Number: 555-1234 → 555-9999
2. Update Email: old@email.com → new@email.com
3. Modify Salary: 8000 → 8500

**Click "Save"**

**Explanation**:
"The update is performed through our backend API endpoint `PUT /employee/:id`, which calls the stored procedure `update_employee_info` to update only the allowed fields (salary, phone, email)."

### 💬 Simulated Instructor Question:
**Q**: "Can you prove this value changed in the database?"

**A**: "Yes, let me show you in SQL Developer."

**SQL Developer Verification**:
```sql
SELECT employee_id, first_name, last_name, email, phone_number, salary
FROM hr_employees
WHERE employee_id = [Updated Employee ID];
```

**Point to**: The updated values in the result set

---

## 5. JOBS MENU TASKS (2-3 mins)

### a. Identify Job Description

**Action**: Navigate to "Identify Job" page

**Demo**:
- Enter Job ID: SA_REP
- Click "Get Job Info"
- **Result**: "Sales Representative"

**Explanation**:
"This calls the PL/SQL function `get_job(job_id)` which returns the job title for the given job ID. The backend executes:
```sql
SELECT get_job('SA_REP') FROM dual;
```

### b. Update Job Information

**Action**: Navigate to "Update Job" page

**Demo**:
1. Select a job from dropdown (e.g., SA_REP)
2. Current values populate automatically
3. Modify:
   - Job Title: "Sales Representative" → "Sales Representative - Updated"
   - Min Salary: 6000 → 6500
   - Max Salary: 12000 → 12500

**Click "Update Job"**

**Explanation**:
"This calls our backend API which executes an UPDATE statement on the HR_JOBS table to modify the job information."

**SQL Developer Verification**:
```sql
SELECT job_id, job_title, min_salary, max_salary
FROM hr_jobs
WHERE job_id = 'SA_REP';
```

**Show**: Updated values in the database

### c. Create New Job

**Action**: Navigate to "Create Job" page

**Demo**:
- Job ID: AS_MAN
- Job Title: "Assistant Manager"
- Min Salary: 5000
- Max Salary: 10000

**Click "Create Job"**

**Explanation**:
"This calls the stored procedure `new_job_sp` which inserts a new record into the HR_JOBS table."

**SQL Developer Verification**:
```sql
SELECT * FROM hr_jobs
WHERE job_id = 'AS_MAN';
```

**Show**: Newly created job record

---

## 6. TRIGGER + PROCEDURE VALIDATION (1-2 mins)

### Salary Range Validation Logic

**Explanation**:
"Our application enforces business rules through a combination of triggers and stored procedures. The `check_salary_trg` trigger fires BEFORE INSERT or UPDATE on HR_EMPLOYEES and calls the `check_salary` procedure to validate that the salary is within the allowed range for the job."

### Test Case 1: Hire with Low Salary

**Action**: Try hiring employee with salary below minimum

**Data**:
- Job: SA_REP (min: 6000, max: 12000)
- Salary: 2000

**Result**: ❌ Error message: "Salary outside allowed range"

**SQL Developer Verification**:
```sql
-- Show the job's valid salary range
SELECT job_id, min_salary, max_salary
FROM hr_jobs
WHERE job_id = 'SA_REP';
```

### Test Case 2: Update Employee with Invalid Salary

**Action**: Try updating employee ID 115's salary to 2000

**Expected Result**: ❌ Blocked by trigger

**SQL Developer Verification**:
```sql
-- Show current employee data
SELECT employee_id, first_name, last_name, job_id, salary
FROM hr_employees
WHERE employee_id = 115;

-- Show job's salary constraints
SELECT job_id, min_salary, max_salary
FROM hr_jobs
WHERE job_id = (SELECT job_id FROM hr_employees WHERE employee_id = 115);
```

### Test Case 3: Hire with High Salary

**Action**: Try hiring with salary above maximum

**Data**:
- Job: ST_CLERK (min: 2000, max: 5000)
- Salary: 10000

**Result**: ❌ Error message: "Salary outside allowed range"

### Trigger Code Review

**SQL Developer**:
```sql
-- Show trigger definition
SELECT text FROM user_source
WHERE name = 'CHECK_SALARY_TRG'
ORDER BY line;

-- Show procedure definition
SELECT text FROM user_source
WHERE name = 'CHECK_SALARY'
ORDER BY line;
```

---

## 7. BONUS FEATURES & CLEAN-UP

### Professional UI Features

✅ **Success/Error Messages**
- Clear feedback after every operation
- Color-coded messages (green for success, red for errors)

✅ **Form Validation**
- Email format validation
- Required field checking
- Number input validation for salary

✅ **Responsive Design**
- Clean gradient theme (purple/blue)
- Mobile-friendly layout
- Smooth transitions and hover effects

✅ **User-Friendly Interface**
- Intuitive navigation menu
- Organized sections for different operations
- Professional table layouts with inline editing

### Code Quality

✅ **Backend**
- Proper error handling for all database operations
- Specific error messages for different Oracle errors (ORA-20001, ORA-00001, ORA-02291)
- Connection pooling for efficient database access

✅ **Frontend**
- Component-based architecture
- Reusable API service layer
- State management with React hooks
- Loading states during operations

---

## 8. REFLECTION (30-60 seconds per member)

### [Member 1] - Database & PL/SQL

**Biggest Challenge**:
"The most challenging part was implementing the trigger and procedure interaction for salary validation. Understanding how to properly raise application errors and handle them in the frontend took some trial and error."

**What I Learned**:
"I gained deep understanding of PL/SQL stored procedures, triggers, and exception handling. I also learned how to design database schemas that enforce business rules at the database level, ensuring data integrity regardless of which application accesses it."

### [Member 2] - Frontend Development

**Biggest Challenge**:
"Managing state across multiple components and handling asynchronous API calls was challenging. Also, creating a professional UI that's both functional and visually appealing required careful CSS design."

**What I Learned**:
"I learned how to build a full-stack React application with proper component architecture, routing, and API integration. I also gained experience in error handling and user feedback mechanisms to create a smooth user experience."

### [Member 3] - Backend API

**Biggest Challenge**:
"Connecting to Oracle database from Node.js and properly handling different types of database errors was challenging. Mapping Oracle-specific error codes to user-friendly messages required careful research."

**What I Learned**:
"I learned how to build RESTful APIs with Express.js, work with Oracle's Node.js driver (oracledb), manage database connections, and handle complex error scenarios. I also learned the importance of proper API design for frontend-backend communication."

---

## TECHNICAL ARCHITECTURE SUMMARY

### Database Layer
- **Tables**: HR_EMPLOYEES, HR_JOBS, HR_DEPARTMENTS
- **Stored Procedures**:
  - `employee_hire_sp`: Insert new employee
  - `new_job_sp`: Create new job
  - `check_salary`: Validate salary range
  - `update_employee_info`: Update employee data
- **Functions**:
  - `get_job`: Retrieve job title by ID
- **Triggers**:
  - `check_salary_trg`: Enforce salary validation on INSERT/UPDATE

### Backend Layer (Node.js/Express)
- **Port**: 3001
- **Database Connection**: oracledb with connection pooling
- **API Endpoints**:
  - POST /hire-employee
  - GET /employees
  - PUT /employee/:id
  - GET /job/:jobId
  - GET /jobs
  - POST /create-job
  - PUT /job/:jobId
  - GET /departments
  - GET /managers

### Frontend Layer (React)
- **Port**: 5173 (Vite dev server)
- **Routing**: React Router DOM
- **API Client**: Axios
- **Components**:
  - Navigation (sidebar menu)
  - Home (landing page)
  - EmployeeHire, EmployeeList (employee management)
  - JobIdentify, JobUpdate, JobCreate (job management)
  - Departments (department view)

---

## DEMO FLOW CHECKLIST

- [ ] 1. Introduce team and tools (1 min)
- [ ] 2. Show main menu navigation (30 sec)
- [ ] 3. Employee Hiring Demo
  - [ ] Show form with dropdowns (1 min)
  - [ ] Explain where data comes from (1 min)
  - [ ] Successful insert + SQL verification (1 min)
  - [ ] Negative test with invalid salary (2 min)
- [ ] 4. Employee Update Demo
  - [ ] Show employee list grid (30 sec)
  - [ ] Update phone/email/salary (1 min)
  - [ ] SQL verification (1 min)
- [ ] 5. Jobs Menu Tasks
  - [ ] Identify job (1 min)
  - [ ] Update job info (1 min)
  - [ ] Create new job (1 min)
- [ ] 6. Trigger + Procedure Validation
  - [ ] Explain validation logic (30 sec)
  - [ ] Test Case 1: Low salary (30 sec)
  - [ ] Test Case 2: Update validation (30 sec)
  - [ ] Show trigger/procedure code (30 sec)
- [ ] 7. Bonus features walkthrough (1 min)
- [ ] 8. Team reflection (2 min)

**Total Time**: ~13-15 minutes

---

## PRESENTATION TIPS

### Before Recording
✅ Test all features to ensure they work
✅ Have SQL Developer open with relevant queries ready
✅ Clear browser cache and start fresh
✅ Ensure backend server is running
✅ Have sample data ready for testing

### During Recording
✅ Speak clearly and at a moderate pace
✅ Explain WHY, not just WHAT you're clicking
✅ Always verify database changes in SQL Developer
✅ Act as if instructor is asking questions
✅ Show confidence in your understanding

### After Recording
✅ Review video for audio/video quality
✅ Verify all required sections are covered
✅ Check that SQL Developer screens are readable
✅ Ensure video is 10-15 minutes (not too short/long)

---

## SUBMISSION CHECKLIST

- [ ] Video recorded (10-15 minutes)
- [ ] Uploaded to YouTube (Unlisted) or Google Drive
- [ ] Link tested and accessible
- [ ] All team members featured
- [ ] All required demos included
- [ ] SQL verification shown for all operations
- [ ] Submitted before deadline

---

**Good luck with your presentation! Remember: Don't just click – explain!**
