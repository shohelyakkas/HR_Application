-- Procedure: check_salary_range
-- Purpose: validate that p_salary is within min/max salary for p_job_id

CREATE OR REPLACE PROCEDURE check_salary_range (
    p_job_id  IN VARCHAR2,
    p_salary  IN NUMBER
) AS
    v_min_salary  hr_jobs.min_salary%TYPE;
    v_max_salary  hr_jobs.max_salary%TYPE;
BEGIN
    -- Get allowed salary range for this job
    SELECT min_salary, max_salary
    INTO v_min_salary, v_max_salary
    FROM hr_jobs
    WHERE job_id = p_job_id;

    -- If salary is out of range, raise error
    IF p_salary < v_min_salary OR p_salary > v_max_salary THEN
        RAISE_APPLICATION_ERROR(-20001, 'Salary outside allowed range');
    END IF;
END check_salary_range;
/
