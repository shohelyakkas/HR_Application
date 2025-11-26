-- Procedure: update_employee_info
-- Purpose: update salary, phone_number and email for an employee (only non-NULL inputs overwrite)

CREATE OR REPLACE PROCEDURE update_employee_info (
    p_emp_id IN NUMBER,
    p_salary IN NUMBER,
    p_phone  IN VARCHAR2,
    p_email  IN VARCHAR2
) AS
BEGIN
    UPDATE hr_employees
    SET salary       = NVL(p_salary, salary),
        phone_number = NVL(p_phone, phone_number),
        email        = NVL(p_email, email)
    WHERE employee_id = p_emp_id;

    COMMIT;
END update_employee_info;
/
