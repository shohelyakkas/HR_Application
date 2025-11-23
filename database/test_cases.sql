---------------------------------------------------------
-- TEST CASES FOR: employee_hire_sp + check_salary_range
-- EXPECTATION: All 3 tests must FAIL with ORA-20001
---------------------------------------------------------

-- TEST CASE 1: Hire employee with low salary (should fail)
BEGIN
    employee_hire_sp(
        p_first_name    => 'Elenor',
        p_last_name     => 'Beh',
        p_email         => 'ELENOR.BEH@example.com',
        p_salary        => 1000,
        p_hire_date     => SYSDATE,
        p_phone         => '555-111-2222',
        p_job_id        => 'SA_REP',
        p_manager_id    => 100,
        p_department_id => 30
    );
END;
/
---------------------------------------------------------

-- TEST CASE 2: Update salary of employee 115 too low (should fail)
UPDATE hr_employees
SET salary = 2000
WHERE employee_id = 115;
/
---------------------------------------------------------

-- TEST CASE 3: Change job_id to high-salary job (should fail)
UPDATE hr_employees
SET job_id = 'AD_PRES'
WHERE employee_id = 115;
/
---------------------------------------------------------
