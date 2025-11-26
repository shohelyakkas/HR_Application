# HR Application - Demo Quick Reference Guide
## 10-15 Minute Video Walkthrough

---

## PRE-DEMO SETUP ⚙️

### 1. Start Backend Server
```bash
cd backend
npm start
```
✅ Verify: "Server running on port 3001"

### 2. Start Frontend Server
```bash
cd frontend
npm run dev
```
✅ Verify: "Local: http://localhost:5173"

### 3. Open SQL Developer
- Connect to: oracle1.centennialcollege.ca
- User: COMP214_W25_ers_6
- Password: password

### 4. Browser Setup
- Clear cache
- Open: http://localhost:5173
- Have SQL Developer visible for screen sharing

---

## 1. INTRODUCTION (1 MIN) 👋

**Say:**
"Hello, I'm presenting the HR Application Management System for COMP214. Our team consists of [names and roles]. We used Oracle Database, Node.js, and React to build a full-stack application with advanced PL/SQL features."

**Show:**
- Homepage at http://localhost:5173
- Point to sidebar menu

---

## 2. MAIN MENU (30 SEC) 🗂️

**Navigate through:**
- Employee Menu → Hire Employee, Employee List
- Jobs Menu → Identify Job, Update Job, Create Job
- Departments Menu → View Departments

**Say:**
"Our application is organized into three main sections for managing employees, jobs, and departments."

---

## 3. EMPLOYEE HIRING (4-5 MIN) 👤

### A. Show Form (1 min)

**Navigate to:** Hire Employee

**Say:**
"This form allows hiring new employees. Notice the dropdowns are populated from the database."

**Click Job dropdown:**
**Say:**
"This dropdown pulls from HR_JOBS table via our backend API."

**In SQL Developer, run:**
```sql
SELECT job_id, job_title FROM hr_jobs;
```

**Show:** Same values in dropdown

### B. Successful Hire (1-2 min)

**Fill form:**
- First Name: Sarah
- Last Name: Johnson
- Email: sarah.johnson@company.com
- Phone: 515.555.1234
- Salary: 8000
- Job: SA_REP
- Manager: [Select any]
- Department: [Select any]
- Hire Date: [Today]

**Click "Hire Employee"**

**Say:**
"This calls the employee_hire_sp stored procedure to insert the new employee."

**In SQL Developer, run:**
```sql
SELECT * FROM HR_EMPLOYEES
ORDER BY EMPLOYEE_ID DESC;
```

**Point to:** The newly inserted Sarah Johnson record

### C. Negative Test (2 min)

**Say:**
"Now let me demonstrate our salary validation. I'll try to hire someone with a salary below the minimum for their job."

**Fill form:**
- First Name: John
- Last Name: Test
- Email: john.test@company.com
- Salary: 1000 (INVALID - too low)
- Job: SA_REP

**Click "Hire Employee"**

**Show:** Error message appears

**Say:**
"Our check_salary_trg trigger intercepted this and blocked the insert because 1000 is below the minimum salary for SA_REP."

**In SQL Developer, show:**
```sql
-- Show job's salary range
SELECT job_id, job_title, min_salary, max_salary
FROM hr_jobs
WHERE job_id = 'SA_REP';
```

**Say:**
"As you can see, SA_REP requires a minimum salary of 6000."

---

## 4. EMPLOYEE UPDATE (2-3 MIN) ✏️

### Show Employee List

**Navigate to:** Employee List

**Say:**
"This page shows all employees in a table format. We can edit salary, phone, and email only."

### Update Employee

**Click "Edit"** on any employee

**Say:**
"I'll update this employee's information."

**Modify:**
- Phone: 555.999.8888
- Email: updated.email@company.com
- Salary: [Increase by 500]

**Click "Save"**

**Say:**
"This calls our update_employee_info procedure. Let me verify the change in the database."

**In SQL Developer:**
```sql
SELECT employee_id, first_name, last_name, email, phone_number, salary
FROM hr_employees
WHERE email = 'updated.email@company.com';
```

**Point to:** Updated values

---

## 5. JOBS MENU (2-3 MIN) 💼

### A. Identify Job (1 min)

**Navigate to:** Identify Job

**Say:**
"This feature uses our get_job function to retrieve job titles."

**Enter:** SA_REP

**Click "Get Job Info"**

**Show:** "Sales Representative" appears

**In SQL Developer:**
```sql
SELECT get_job('SA_REP') FROM dual;
```

### B. Update Job (1 min)

**Navigate to:** Update Job

**Select job:** SA_REP

**Say:**
"I'll update the salary range for this position."

**Modify:**
- Min Salary: 6500 (was 6000)
- Max Salary: 12500 (was 12000)

**Click "Update Job"**

**In SQL Developer:**
```sql
SELECT job_id, job_title, min_salary, max_salary
FROM hr_jobs
WHERE job_id = 'SA_REP';
```

### C. Create New Job (1 min)

**Navigate to:** Create Job

**Fill form:**
- Job ID: TEST_JOB
- Job Title: Test Position
- Min Salary: 5000
- Max Salary: 10000

**Click "Create Job"**

**Say:**
"This calls the new_job_sp stored procedure."

**In SQL Developer:**
```sql
SELECT * FROM hr_jobs
WHERE job_id = 'TEST_JOB';
```

---

## 6. TRIGGER VALIDATION (1-2 MIN) 🔒

**Say:**
"Let me explain our salary validation architecture. The check_salary_trg trigger fires before any insert or update on HR_EMPLOYEES and calls the check_salary procedure to validate the salary is within range."

**In SQL Developer, show trigger:**
```sql
SELECT text FROM user_source
WHERE name = 'CHECK_SALARY_TRG'
ORDER BY line;
```

**In SQL Developer, show procedure:**
```sql
SELECT text FROM user_source
WHERE name = 'CHECK_SALARY'
ORDER BY line;
```

**Say:**
"This ensures data integrity at the database level, regardless of which application accesses it."

**Test again with different job:**

**Navigate to:** Hire Employee

**Fill:**
- Job: ST_CLERK (max salary: 5000)
- Salary: 10000 (TOO HIGH)

**Click Hire**

**Show:** Error blocked

**Say:**
"As expected, our trigger prevented this invalid salary from being inserted."

---

## 7. BONUS FEATURES (1 MIN) ✨

**Say:**
"Our application includes several professional features:"

**Point out:**
- ✅ Color-coded success/error messages
- ✅ Form validation (show email validation)
- ✅ Responsive design with gradient theme
- ✅ Loading states during operations
- ✅ Clean, intuitive navigation

**Navigate through:** Different pages showing UI quality

---

## 8. REFLECTION (2 MIN) 💭

### Member 1 (Database):
**Say:**
"My biggest challenge was implementing the trigger-procedure interaction for salary validation. I learned how to design database constraints that enforce business rules automatically and handle exceptions properly. This project taught me the importance of database-level validation for maintaining data integrity."

### Member 2 (Frontend):
**Say:**
"Creating a professional, user-friendly interface while managing complex state was challenging. I learned React's component architecture, how to handle asynchronous API calls, and the importance of providing clear user feedback. The experience of building a full-featured UI from scratch was invaluable."

### Member 3 (Backend):
**Say:**
"Connecting Node.js to Oracle Database and handling database-specific errors required careful research. I learned about connection pooling, error code mapping, and RESTful API design. This project gave me practical experience in building a robust middleware layer between frontend and database."

---

## CLOSING (30 SEC) 🎬

**Say:**
"Thank you for watching our demo. We successfully implemented a full-stack HR application with advanced PL/SQL features including stored procedures, functions, and triggers. All CRUD operations are working, and our database enforces business rules automatically. We're happy to answer any questions."

---

## IMPORTANT REMINDERS ⚠️

### DO:
✅ Explain WHY, not just WHAT you're doing
✅ Always verify in SQL Developer after each operation
✅ Speak clearly and at a moderate pace
✅ Act as if instructor is asking questions
✅ Show confidence in your understanding
✅ Point to specific results on screen

### DON'T:
❌ Just click through without explanation
❌ Rush through demos
❌ Skip SQL Developer verification
❌ Forget to show error cases
❌ Use vague language ("this thing", "that stuff")

---

## TIMING GUIDE ⏱️

| Section | Time | Total |
|---------|------|-------|
| Introduction | 1:00 | 1:00 |
| Main Menu | 0:30 | 1:30 |
| Employee Hiring | 4:30 | 6:00 |
| Employee Update | 2:30 | 8:30 |
| Jobs Menu | 2:30 | 11:00 |
| Trigger Validation | 1:30 | 12:30 |
| Bonus Features | 1:00 | 13:30 |
| Reflection | 1:30 | 15:00 |

**Target: 13-15 minutes**

---

## TROUBLESHOOTING 🔧

### If backend crashes:
```bash
cd backend
npm start
```

### If frontend not loading:
```bash
cd frontend
npm run dev
```

### If database connection fails:
- Check .env file has correct credentials
- Verify SQL Developer can connect
- Restart backend server

### If dropdown is empty:
- Check backend is running
- Check console for API errors
- Verify database has data

---

## SQL QUERIES READY TO COPY 📋

**Employee Queries:**
```sql
-- View all employees
SELECT * FROM HR_EMPLOYEES ORDER BY EMPLOYEE_ID DESC;

-- View specific employee
SELECT * FROM HR_EMPLOYEES WHERE employee_id = [ID];

-- Check recent hire
SELECT * FROM HR_EMPLOYEES WHERE email = 'sarah.johnson@company.com';
```

**Job Queries:**
```sql
-- View all jobs
SELECT * FROM HR_JOBS;

-- Check salary range
SELECT job_id, min_salary, max_salary FROM hr_jobs WHERE job_id = 'SA_REP';

-- Test function
SELECT get_job('SA_REP') FROM dual;
```

**Code Queries:**
```sql
-- View trigger
SELECT text FROM user_source WHERE name = 'CHECK_SALARY_TRG' ORDER BY line;

-- View procedure
SELECT text FROM user_source WHERE name = 'CHECK_SALARY' ORDER BY line;

-- View function
SELECT text FROM user_source WHERE name = 'GET_JOB' ORDER BY line;
```

**Dropdown Source Queries:**
```sql
-- Jobs dropdown
SELECT job_id, job_title FROM hr_jobs;

-- Managers dropdown
SELECT employee_id, first_name, last_name FROM hr_employees
WHERE job_id LIKE '%MGR';

-- Departments dropdown
SELECT department_id, department_name FROM hr_departments;
```

---

## SAMPLE TEST DATA 📝

**Valid Employee:**
- Name: Sarah Johnson
- Email: sarah.johnson@company.com
- Phone: 515.555.1234
- Job: SA_REP
- Salary: 8000 ✅

**Invalid Employee (Low Salary):**
- Name: John Test
- Email: john.test@company.com
- Job: SA_REP
- Salary: 1000 ❌ (min is 6000)

**Invalid Employee (High Salary):**
- Name: Jane Test
- Email: jane.test@company.com
- Job: ST_CLERK
- Salary: 10000 ❌ (max is 5000)

**New Job:**
- ID: TEST_JOB
- Title: Test Position
- Min: 5000
- Max: 10000

---

**Good luck with your demo! 🎉**
