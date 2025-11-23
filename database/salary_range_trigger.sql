-- Trigger: salary_range_trg
-- Purpose: call check_salary_range before insert or salary/job_id update

CREATE OR REPLACE TRIGGER salary_range_trg
BEFORE INSERT OR UPDATE OF salary, job_id
ON hr_employees
FOR EACH ROW
BEGIN
    -- Only check when job_id and salary are not null
    IF :NEW.job_id IS NOT NULL AND :NEW.salary IS NOT NULL THEN
        check_salary_range(:NEW.job_id, :NEW.salary);
    END IF;
END salary_range_trg;
/
