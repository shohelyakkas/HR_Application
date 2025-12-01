-- Procedure: update_employee_info
-- Purpose: update salary, phone_number and email for an employee (only non-NULL inputs overwrite)

CREATE OR REPLACE PROCEDURE update_employee_info (
    p_emp_id  IN NUMBER,
    p_salary  IN NUMBER,
    p_phone   IN VARCHAR2,
    p_email   IN VARCHAR2,
    p_job_id  IN VARCHAR2
) AS
    v_current_job_id hr_employees.job_id%TYPE;
BEGIN
    -- Get employee's current job_id
    SELECT job_id
    INTO   v_current_job_id
    FROM   hr_employees
    WHERE  employee_id = p_emp_id;

    ------------------------------------------------------------------
    -- RULE: prefix must match
    ------------------------------------------------------------------
    IF p_job_id IS NOT NULL AND p_job_id <> v_current_job_id THEN
        IF SUBSTR(p_job_id, 1, 2) <> SUBSTR(v_current_job_id, 1, 2) THEN
            raise_application_error(
                -20002,
                'Job change not allowed: ' ||
                p_job_id || ' does not belong to the same department group as ' ||
                v_current_job_id || '.'
            );
        END IF;
    END IF;

    ------------------------------------------------------------------
    -- Perform update
    ------------------------------------------------------------------
    UPDATE hr_employees
    SET salary       = NVL(p_salary, salary),
        phone_number = NVL(p_phone, phone_number),
        email        = NVL(p_email, email),
        job_id       = NVL(p_job_id, job_id)
    WHERE employee_id = p_emp_id;

    COMMIT;
END update_employee_info;
/

