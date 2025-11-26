# HR Application - PowerPoint Presentation Outline
## COMP214 - Advanced Database (PL/SQL) Final Project

---

## SLIDE 1: TITLE SLIDE
**HR Application Management System**
- Course: COMP214 - Advanced Database (PL/SQL)
- Instructor: Ersan Cam
- Team Members: [Names]
- Date: [Presentation Date]

---

## SLIDE 2: TEAM & RESPONSIBILITIES
**Our Team**
- **[Member 1]**: Database Design & PL/SQL
  - Stored Procedures & Functions
  - Triggers & Validation Logic

- **[Member 2]**: Frontend Development
  - React Application
  - User Interface Design

- **[Member 3]**: Backend API
  - Node.js/Express Server
  - Database Integration

---

## SLIDE 3: TECHNOLOGY STACK
**Tools & Technologies**

**Database Tier**
- Oracle Database
- SQL Developer
- PL/SQL Procedures & Triggers

**Backend Tier**
- Node.js & Express.js
- oracledb Driver
- RESTful API Design

**Frontend Tier**
- React 18
- React Router
- Axios for API calls

---

## SLIDE 4: APPLICATION STRUCTURE
**Main Menu Features**

🧍‍♂️ **Employee Management**
- Hire New Employees
- View Employee List
- Update Employee Information

🧑‍💼 **Job Management**
- Identify Job by ID
- Update Job Details
- Create New Jobs

🏢 **Department View**
- View All Departments

---

## SLIDE 5: DATABASE SCHEMA
**Tables**
- HR_EMPLOYEES
- HR_JOBS
- HR_DEPARTMENTS

**Stored Procedures**
- `employee_hire_sp` - Insert new employee
- `new_job_sp` - Create new job
- `check_salary` - Validate salary range
- `update_employee_info` - Update employee data

**Functions**
- `get_job` - Get job title by ID

**Triggers**
- `check_salary_trg` - Salary validation trigger

---

## SLIDE 6: EMPLOYEE HIRING - FORM
**Hire Employee Feature**

**Input Fields:**
- First Name, Last Name
- Email, Phone Number
- Salary, Hire Date

**Dynamic Dropdowns:**
- Job ID → from HR_JOBS
- Manager → from HR_EMPLOYEES
- Department → from HR_DEPARTMENTS

**Backend Process:**
- API: POST /hire-employee
- Calls: `employee_hire_sp`
- Action: INSERT into HR_EMPLOYEES

---

## SLIDE 7: EMPLOYEE HIRING - VALIDATION
**Salary Range Validation**

**Business Rule:**
- Salary must be within job's min/max range

**Implementation:**
- `check_salary_trg` BEFORE INSERT/UPDATE
- Calls `check_salary` procedure
- Raises ORA-20001 if invalid

**Example:**
- Job: SA_REP (min: 6000, max: 12000)
- Invalid: Salary = 2000 ❌
- Valid: Salary = 8000 ✅

---

## SLIDE 8: EMPLOYEE HIRING - DEMO FLOW
**Demonstration Steps**

1. **Positive Test**
   - Fill form with valid data
   - Click "Hire Employee"
   - Verify in SQL Developer

2. **Negative Test**
   - Enter salary below minimum
   - System blocks insertion
   - Error message displayed

3. **SQL Verification**
   ```sql
   SELECT * FROM HR_EMPLOYEES
   ORDER BY EMPLOYEE_ID DESC;
   ```

---

## SLIDE 9: EMPLOYEE UPDATE
**Update Employee Information**

**Editable Fields (ONLY):**
- ✅ Email
- ✅ Phone Number
- ✅ Salary

**Process:**
- Click Edit button on row
- Modify allowed fields
- Click Save
- API: PUT /employee/:id
- Calls: `update_employee_info`

**Verification:**
```sql
SELECT * FROM HR_EMPLOYEES
WHERE EMPLOYEE_ID = [ID];
```

---

## SLIDE 10: JOB IDENTIFICATION
**Identify Job Feature**

**Purpose:**
- Look up job title by Job ID

**Implementation:**
- Uses PL/SQL function: `get_job(job_id)`
- Returns: Job Title

**Example:**
- Input: SA_REP
- Output: "Sales Representative"

**SQL:**
```sql
SELECT get_job('SA_REP') FROM dual;
```

---

## SLIDE 11: JOB UPDATE & CREATE
**Update Job Information**
- Select job from dropdown
- Modify Title, Min/Max Salary
- UPDATE HR_JOBS table
- Verify changes in database

**Create New Job**
- Enter Job ID, Title
- Set Min/Max Salary range
- Calls: `new_job_sp`
- INSERT into HR_JOBS

**Verification:**
```sql
SELECT * FROM HR_JOBS
WHERE JOB_ID = 'NEW_ID';
```

---

## SLIDE 12: TRIGGER & PROCEDURE LOGIC
**Salary Validation Architecture**

**check_salary_trg (Trigger)**
- Event: BEFORE INSERT OR UPDATE
- Table: HR_EMPLOYEES
- Scope: FOR EACH ROW
- Action: Calls check_salary procedure

**check_salary (Procedure)**
- Parameters: p_job_id, p_salary
- Logic: Query min/max from HR_JOBS
- Validation: Salary in range?
- Error: RAISE_APPLICATION_ERROR(-20001)

---

## SLIDE 13: VALIDATION TEST CASES
**Test Case 1: Low Salary**
- Job: SA_REP (min: 6000)
- Salary: 2000
- Result: ❌ Blocked

**Test Case 2: High Salary**
- Job: ST_CLERK (max: 5000)
- Salary: 10000
- Result: ❌ Blocked

**Test Case 3: Valid Salary**
- Job: SA_REP (6000-12000)
- Salary: 8000
- Result: ✅ Accepted

---

## SLIDE 14: API ENDPOINTS
**Backend RESTful API**

**Employee Endpoints**
- POST /hire-employee
- GET /employees
- PUT /employee/:id

**Job Endpoints**
- GET /job/:jobId
- GET /jobs
- POST /create-job
- PUT /job/:jobId

**Lookup Endpoints**
- GET /departments
- GET /managers

---

## SLIDE 15: FRONTEND ARCHITECTURE
**React Component Structure**

**Components:**
- Navigation (Sidebar Menu)
- Home (Landing Page)
- EmployeeHire (Hire Form)
- EmployeeList (Grid with Edit)
- JobIdentify (Search Form)
- JobUpdate (Update Form)
- JobCreate (Create Form)
- Departments (View Table)

**Services:**
- api.js (Axios API Client)

---

## SLIDE 16: UI FEATURES
**Professional User Interface**

✅ **Validation**
- Email format checking
- Required field validation
- Number input constraints

✅ **Feedback**
- Success messages (green)
- Error messages (red)
- Loading states

✅ **Design**
- Gradient theme (purple/blue)
- Responsive layout
- Smooth transitions

---

## SLIDE 17: ERROR HANDLING
**Comprehensive Error Management**

**Database Errors:**
- ORA-20001: Salary validation
- ORA-00001: Unique constraint violation
- ORA-02291: Foreign key violation

**Frontend Handling:**
- Catch all API errors
- Display user-friendly messages
- Maintain application state

**Backend Handling:**
- Try-catch blocks
- Specific error messages
- Proper HTTP status codes

---

## SLIDE 18: DEMO VERIFICATION
**SQL Developer Verification**

**For Every Operation, Show:**
1. Frontend action
2. Expected result
3. SQL query verification
4. Database state confirmation

**Example:**
```sql
-- After hiring employee
SELECT * FROM HR_EMPLOYEES
WHERE EMAIL = 'new.employee@company.com';

-- After updating job
SELECT * FROM HR_JOBS
WHERE JOB_ID = 'SA_REP';
```

---

## SLIDE 19: PROJECT HIGHLIGHTS
**Key Achievements**

✅ **Complete CRUD Operations**
- Create, Read, Update for Employees & Jobs
- All operations validated

✅ **Business Logic Enforcement**
- Database-level validation
- Trigger-based constraints
- Data integrity maintained

✅ **Professional Full-Stack App**
- Modern React UI
- RESTful API design
- Oracle integration

✅ **Code Quality**
- Error handling
- Clean architecture
- Documented code

---

## SLIDE 20: CHALLENGES & LEARNING

**Technical Challenges:**
- Oracle database connectivity from Node.js
- Trigger and procedure interaction
- State management in React
- Error propagation from DB to UI

**Key Learnings:**
- Advanced PL/SQL programming
- Full-stack development
- Database-first design
- Team collaboration
- Professional development practices

---

## SLIDE 21: REFLECTION - DATABASE
**[Member 1] - Database & PL/SQL**

**Challenge:**
Implementing complex trigger-procedure interactions for salary validation

**Learning:**
- PL/SQL exception handling
- Trigger timing and scope
- Database-level business rules
- Data integrity enforcement

**Takeaway:**
Understanding how to design robust database logic that ensures data quality regardless of application layer

---

## SLIDE 22: REFLECTION - FRONTEND
**[Member 2] - Frontend Development**

**Challenge:**
Managing asynchronous state and creating professional UI

**Learning:**
- React component architecture
- API integration with Axios
- Form validation patterns
- Responsive design techniques

**Takeaway:**
Building user-friendly interfaces that provide clear feedback and handle errors gracefully

---

## SLIDE 23: REFLECTION - BACKEND
**[Member 3] - Backend API**

**Challenge:**
Connecting Node.js with Oracle and handling database-specific errors

**Learning:**
- Oracle Node.js driver (oracledb)
- RESTful API design patterns
- Connection pooling
- Error code mapping

**Takeaway:**
Creating a robust middleware layer that bridges frontend and database effectively

---

## SLIDE 24: SYSTEM ARCHITECTURE
**Three-Tier Architecture**

```
┌─────────────────┐
│  FRONTEND       │  React (Port 5173)
│  React + Axios  │  - User Interface
└────────┬────────┘  - API Calls
         │
         ▼
┌─────────────────┐
│  BACKEND        │  Node.js (Port 3001)
│  Express + API  │  - REST Endpoints
└────────┬────────┘  - Business Logic
         │
         ▼
┌─────────────────┐
│  DATABASE       │  Oracle Database
│  Oracle + SQL   │  - Data Storage
└─────────────────┘  - PL/SQL Logic
```

---

## SLIDE 25: TESTING SUMMARY
**Comprehensive Testing Completed**

**Positive Tests:**
- ✅ Hire employee with valid data
- ✅ Update employee information
- ✅ Create new job
- ✅ Update existing job
- ✅ View all departments

**Negative Tests:**
- ✅ Invalid salary (too low)
- ✅ Invalid salary (too high)
- ✅ Duplicate email/employee ID
- ✅ Invalid foreign keys

**All Tests Verified in SQL Developer**

---

## SLIDE 26: CODE REPOSITORY
**GitHub Repository**

**Repository:** https://github.com/shohelyakkas/HR_Application

**Structure:**
```
HR_Application/
├── database/          # PL/SQL scripts
├── backend/           # Node.js server
└── frontend/          # React app
```

**Branches:**
- `main` - Production code
- `frontend-added-need-more-work` - Development

**Documentation:**
- README files in each directory
- Inline code comments
- Setup instructions

---

## SLIDE 27: FUTURE ENHANCEMENTS
**Potential Improvements**

🔮 **Features:**
- User authentication & authorization
- Employee search & filtering
- Department management (CRUD)
- Salary history tracking
- Performance reviews module

🔮 **Technical:**
- Unit testing (Jest/Mocha)
- Integration testing
- CI/CD pipeline
- Docker containerization
- Cloud deployment (AWS/Azure)

---

## SLIDE 28: CONCLUSION
**Project Summary**

✅ **Objectives Met:**
- 70% Backend (PL/SQL) - Complete
- 20% Frontend (GUI) - Complete
- 10% Presentation - In Progress

✅ **Skills Demonstrated:**
- Advanced PL/SQL programming
- Full-stack web development
- Database design & integration
- Team collaboration
- Professional presentation

**Thank you for watching our demo!**

---

## SLIDE 29: Q&A
**Questions & Answers**

**Ready to demonstrate:**
- Any feature in detail
- Database queries
- Code walkthrough
- Design decisions
- Troubleshooting approach

**Contact Information:**
- [Team Member 1]: [Email]
- [Team Member 2]: [Email]
- [Team Member 3]: [Email]

**Repository:** https://github.com/shohelyakkas/HR_Application

---

## SLIDE 30: THANK YOU
**HR Application Management System**

**Team:** [Your Team Name]

**Course:** COMP214 - Advanced Database

**Instructor:** Ersan Cam

**Semester:** [Current Semester]

---

## APPENDIX: DEMO CHECKLIST

**Before Starting:**
- [ ] Backend server running
- [ ] Frontend dev server running
- [ ] SQL Developer open
- [ ] Sample data ready
- [ ] Browser cache cleared

**During Demo:**
- [ ] Explain each action
- [ ] Show dropdown sources
- [ ] Verify in SQL Developer
- [ ] Test validation rules
- [ ] Show error handling

**After Each Feature:**
- [ ] Confirm database changes
- [ ] Show relevant queries
- [ ] Explain backend process

---

## APPENDIX: KEY SQL QUERIES

**Verify New Employee:**
```sql
SELECT * FROM HR_EMPLOYEES
ORDER BY EMPLOYEE_ID DESC;
```

**Check Salary Range:**
```sql
SELECT job_id, min_salary, max_salary
FROM HR_JOBS
WHERE job_id = 'SA_REP';
```

**View Trigger:**
```sql
SELECT text FROM user_source
WHERE name = 'CHECK_SALARY_TRG'
ORDER BY line;
```

**View Procedure:**
```sql
SELECT text FROM user_source
WHERE name = 'CHECK_SALARY'
ORDER BY line;
```

**Test Function:**
```sql
SELECT get_job('SA_REP') FROM dual;
```
