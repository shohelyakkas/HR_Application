-- Procedure: employee_hire_sp
-- Purpose: Insert a new employee into HR_EMPLOYEES using EMPLOYEES_SEQ

CREATE OR REPLACE PROCEDURE employee_hire_sp (
    p_first_name     IN  VARCHAR2,
    p_last_name      IN  VARCHAR2,
    p_email          IN  VARCHAR2,
    p_salary         IN  NUMBER,
    p_hire_date      IN  DATE,
    p_phone          IN  VARCHAR2,
    p_job_id         IN  VARCHAR2,
    p_manager_id     IN  NUMBER,
    p_department_id  IN  NUMBER
) AS
BEGIN
    INSERT INTO hr_employees (
        employee_id,
        first_name,
        last_name,
        email,
        salary,
        hire_date,
        phone_number,
        job_id,
        manager_id,
        department_id
    )
    VALUES (
        employees_seq.NEXTVAL,  -- auto employee_id from sequence
        p_first_name,
        p_last_name,
        p_email,
        p_salary,
        p_hire_date,
        p_phone,
        p_job_id,
        p_manager_id,
        p_department_id
    );

    COMMIT;  -- mandatory for our project
END employee_hire_sp;
/
