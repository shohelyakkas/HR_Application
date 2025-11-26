---------------------------------------------------------
-- SAMPLE DATA FOR HR APPLICATION
-- Run this script to populate tables with test data
---------------------------------------------------------

-- First, let's check if we have sample data already
SELECT COUNT(*) as employee_count FROM hr_employees;
SELECT COUNT(*) as job_count FROM hr_jobs;
SELECT COUNT(*) as dept_count FROM hr_departments;

---------------------------------------------------------
-- INSERT SAMPLE JOBS (if not already present)
---------------------------------------------------------
BEGIN
    -- Only insert if table is empty or these don't exist
    INSERT INTO hr_jobs (job_id, job_title, min_salary, max_salary)
    SELECT 'AD_PRES', 'President', 20000, 40000 FROM DUAL
    WHERE NOT EXISTS (SELECT 1 FROM hr_jobs WHERE job_id = 'AD_PRES');

    INSERT INTO hr_jobs (job_id, job_title, min_salary, max_salary)
    SELECT 'AD_VP', 'Vice President', 15000, 30000 FROM DUAL
    WHERE NOT EXISTS (SELECT 1 FROM hr_jobs WHERE job_id = 'AD_VP');

    INSERT INTO hr_jobs (job_id, job_title, min_salary, max_salary)
    SELECT 'IT_PROG', 'Programmer', 4000, 10000 FROM DUAL
    WHERE NOT EXISTS (SELECT 1 FROM hr_jobs WHERE job_id = 'IT_PROG');

    INSERT INTO hr_jobs (job_id, job_title, min_salary, max_salary)
    SELECT 'SA_REP', 'Sales Representative', 6000, 12000 FROM DUAL
    WHERE NOT EXISTS (SELECT 1 FROM hr_jobs WHERE job_id = 'SA_REP');

    INSERT INTO hr_jobs (job_id, job_title, min_salary, max_salary)
    SELECT 'SA_MAN', 'Sales Manager', 10000, 20000 FROM DUAL
    WHERE NOT EXISTS (SELECT 1 FROM hr_jobs WHERE job_id = 'SA_MAN');

    INSERT INTO hr_jobs (job_id, job_title, min_salary, max_salary)
    SELECT 'ST_CLERK', 'Stock Clerk', 2000, 5000 FROM DUAL
    WHERE NOT EXISTS (SELECT 1 FROM hr_jobs WHERE job_id = 'ST_CLERK');

    INSERT INTO hr_jobs (job_id, job_title, min_salary, max_salary)
    SELECT 'PU_CLERK', 'Purchasing Clerk', 2500, 5500 FROM DUAL
    WHERE NOT EXISTS (SELECT 1 FROM hr_jobs WHERE job_id = 'PU_CLERK');

    INSERT INTO hr_jobs (job_id, job_title, min_salary, max_salary)
    SELECT 'AC_ACCOUNT', 'Accountant', 8200, 16000 FROM DUAL
    WHERE NOT EXISTS (SELECT 1 FROM hr_jobs WHERE job_id = 'AC_ACCOUNT');

    INSERT INTO hr_jobs (job_id, job_title, min_salary, max_salary)
    SELECT 'AC_MGR', 'Accounting Manager', 12000, 18000 FROM DUAL
    WHERE NOT EXISTS (SELECT 1 FROM hr_jobs WHERE job_id = 'AC_MGR');

    COMMIT;
END;
/

---------------------------------------------------------
-- INSERT SAMPLE DEPARTMENTS (if not already present)
---------------------------------------------------------
BEGIN
    INSERT INTO hr_departments (department_id, department_name)
    SELECT 10, 'Administration' FROM DUAL
    WHERE NOT EXISTS (SELECT 1 FROM hr_departments WHERE department_id = 10);

    INSERT INTO hr_departments (department_id, department_name)
    SELECT 20, 'Marketing' FROM DUAL
    WHERE NOT EXISTS (SELECT 1 FROM hr_departments WHERE department_id = 20);

    INSERT INTO hr_departments (department_id, department_name)
    SELECT 30, 'Purchasing' FROM DUAL
    WHERE NOT EXISTS (SELECT 1 FROM hr_departments WHERE department_id = 30);

    INSERT INTO hr_departments (department_id, department_name)
    SELECT 50, 'Shipping' FROM DUAL
    WHERE NOT EXISTS (SELECT 1 FROM hr_departments WHERE department_id = 50);

    INSERT INTO hr_departments (department_id, department_name)
    SELECT 60, 'IT' FROM DUAL
    WHERE NOT EXISTS (SELECT 1 FROM hr_departments WHERE department_id = 60);

    INSERT INTO hr_departments (department_id, department_name)
    SELECT 80, 'Sales' FROM DUAL
    WHERE NOT EXISTS (SELECT 1 FROM hr_departments WHERE department_id = 80);

    INSERT INTO hr_departments (department_id, department_name)
    SELECT 90, 'Executive' FROM DUAL
    WHERE NOT EXISTS (SELECT 1 FROM hr_departments WHERE department_id = 90);

    INSERT INTO hr_departments (department_id, department_name)
    SELECT 110, 'Accounting' FROM DUAL
    WHERE NOT EXISTS (SELECT 1 FROM hr_departments WHERE department_id = 110);

    COMMIT;
END;
/

---------------------------------------------------------
-- INSERT SAMPLE EMPLOYEES (MANAGERS FIRST)
-- Note: We insert top-level managers first (no manager_id)
-- Then insert regular employees reporting to them
---------------------------------------------------------

-- CEO (President) - No manager
INSERT INTO hr_employees (employee_id, first_name, last_name, email, phone_number, hire_date, job_id, salary, manager_id, department_id)
SELECT 100, 'Steven', 'King', 'SKING@company.com', '515-123-4567', TO_DATE('2003-06-17', 'YYYY-MM-DD'), 'AD_PRES', 24000, NULL, 90
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM hr_employees WHERE employee_id = 100);

-- Vice Presidents reporting to CEO
INSERT INTO hr_employees (employee_id, first_name, last_name, email, phone_number, hire_date, job_id, salary, manager_id, department_id)
SELECT 101, 'Neena', 'Kochhar', 'NKOCHHAR@company.com', '515-123-4568', TO_DATE('2005-09-21', 'YYYY-MM-DD'), 'AD_VP', 17000, 100, 90
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM hr_employees WHERE employee_id = 101);

INSERT INTO hr_employees (employee_id, first_name, last_name, email, phone_number, hire_date, job_id, salary, manager_id, department_id)
SELECT 102, 'Lex', 'De Haan', 'LDEHAAN@company.com', '515-123-4569', TO_DATE('2001-01-13', 'YYYY-MM-DD'), 'AD_VP', 17000, 100, 90
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM hr_employees WHERE employee_id = 102);

-- Sales Manager
INSERT INTO hr_employees (employee_id, first_name, last_name, email, phone_number, hire_date, job_id, salary, manager_id, department_id)
SELECT 145, 'John', 'Russell', 'JRUSSELL@company.com', '011-44-1344-429268', TO_DATE('2004-10-01', 'YYYY-MM-DD'), 'SA_MAN', 14000, 100, 80
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM hr_employees WHERE employee_id = 145);

INSERT INTO hr_employees (employee_id, first_name, last_name, email, phone_number, hire_date, job_id, salary, manager_id, department_id)
SELECT 146, 'Karen', 'Partners', 'KPARTNERS@company.com', '011-44-1344-467268', TO_DATE('2005-01-05', 'YYYY-MM-DD'), 'SA_MAN', 13500, 100, 80
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM hr_employees WHERE employee_id = 146);

-- Accounting Manager
INSERT INTO hr_employees (employee_id, first_name, last_name, email, phone_number, hire_date, job_id, salary, manager_id, department_id)
SELECT 108, 'Nancy', 'Greenberg', 'NGREENBE@company.com', '515-124-4569', TO_DATE('2002-08-17', 'YYYY-MM-DD'), 'AC_MGR', 12000, 101, 110
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM hr_employees WHERE employee_id = 108);

-- Regular Employees (reporting to managers above)
-- Sales Representatives
INSERT INTO hr_employees (employee_id, first_name, last_name, email, phone_number, hire_date, job_id, salary, manager_id, department_id)
SELECT 150, 'Peter', 'Tucker', 'PTUCKER@company.com', '011-44-1344-129268', TO_DATE('2005-01-30', 'YYYY-MM-DD'), 'SA_REP', 10000, 145, 80
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM hr_employees WHERE employee_id = 150);

INSERT INTO hr_employees (employee_id, first_name, last_name, email, phone_number, hire_date, job_id, salary, manager_id, department_id)
SELECT 151, 'David', 'Bernstein', 'DBERNSTE@company.com', '011-44-1344-345268', TO_DATE('2005-03-24', 'YYYY-MM-DD'), 'SA_REP', 9500, 145, 80
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM hr_employees WHERE employee_id = 151);

-- Accountants
INSERT INTO hr_employees (employee_id, first_name, last_name, email, phone_number, hire_date, job_id, salary, manager_id, department_id)
SELECT 110, 'John', 'Chen', 'JCHEN@company.com', '515-124-4269', TO_DATE('2005-09-28', 'YYYY-MM-DD'), 'AC_ACCOUNT', 8200, 108, 110
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM hr_employees WHERE employee_id = 110);

INSERT INTO hr_employees (employee_id, first_name, last_name, email, phone_number, hire_date, job_id, salary, manager_id, department_id)
SELECT 111, 'Ismael', 'Sciarra', 'ISCIARRA@company.com', '515-124-4369', TO_DATE('2005-09-30', 'YYYY-MM-DD'), 'AC_ACCOUNT', 7700, 108, 110
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM hr_employees WHERE employee_id = 111);

-- Purchasing Clerks
INSERT INTO hr_employees (employee_id, first_name, last_name, email, phone_number, hire_date, job_id, salary, manager_id, department_id)
SELECT 115, 'Alexander', 'Khoo', 'AKHOO@company.com', '515-127-4562', TO_DATE('2003-05-18', 'YYYY-MM-DD'), 'PU_CLERK', 3100, 102, 30
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM hr_employees WHERE employee_id = 115);

INSERT INTO hr_employees (employee_id, first_name, last_name, email, phone_number, hire_date, job_id, salary, manager_id, department_id)
SELECT 116, 'Shelli', 'Baida', 'SBAIDA@company.com', '515-127-4563', TO_DATE('2005-12-24', 'YYYY-MM-DD'), 'PU_CLERK', 2900, 102, 30
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM hr_employees WHERE employee_id = 116);

-- IT Programmers
INSERT INTO hr_employees (employee_id, first_name, last_name, email, phone_number, hire_date, job_id, salary, manager_id, department_id)
SELECT 103, 'Alexander', 'Hunold', 'AHUNOLD@company.com', '590-423-4567', TO_DATE('2006-01-03', 'YYYY-MM-DD'), 'IT_PROG', 9000, 102, 60
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM hr_employees WHERE employee_id = 103);

INSERT INTO hr_employees (employee_id, first_name, last_name, email, phone_number, hire_date, job_id, salary, manager_id, department_id)
SELECT 104, 'Bruce', 'Ernst', 'BERNST@company.com', '590-423-4568', TO_DATE('2007-05-21', 'YYYY-MM-DD'), 'IT_PROG', 6000, 103, 60
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM hr_employees WHERE employee_id = 104);

COMMIT;

---------------------------------------------------------
-- VERIFY DATA INSERTED
---------------------------------------------------------
PROMPT '=== JOBS ==='
SELECT job_id, job_title, min_salary, max_salary FROM hr_jobs ORDER BY job_id;

PROMPT '=== DEPARTMENTS ==='
SELECT department_id, department_name FROM hr_departments ORDER BY department_id;

PROMPT '=== EMPLOYEES ==='
SELECT employee_id, first_name, last_name, job_id, salary, manager_id, department_id
FROM hr_employees
ORDER BY employee_id;

PROMPT '=== MANAGER LIST (for dropdown) ==='
SELECT DISTINCT e.employee_id, e.first_name, e.last_name
FROM hr_employees e
WHERE e.employee_id IN (SELECT DISTINCT manager_id FROM hr_employees WHERE manager_id IS NOT NULL)
ORDER BY e.employee_id;
