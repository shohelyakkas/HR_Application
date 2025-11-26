-- Trigger: check_salary_trg
-- Purpose: call check_salary before insert or salary/job_id update

CREATE OR REPLACE TRIGGER check_salary_trg
BEFORE INSERT OR UPDATE OF salary, job_id
ON hr_employees
FOR EACH ROW
BEGIN
    -- Only check when job_id and salary are not null
    IF :NEW.job_id IS NOT NULL AND :NEW.salary IS NOT NULL THEN
        check_salary(:NEW.job_id, :NEW.salary);
    END IF;
END check_salary_trg;
/
