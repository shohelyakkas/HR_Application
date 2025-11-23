-- Procedure: update_job_sp
-- Purpose: Update job title and salary ranges for a given job_id

CREATE OR REPLACE PROCEDURE update_job_sp (
    p_job_id       IN VARCHAR2,
    p_job_title    IN VARCHAR2,
    p_min_salary   IN NUMBER,
    p_max_salary   IN NUMBER
) AS
BEGIN
    UPDATE hr_jobs
    SET job_title  = p_job_title,
        min_salary = p_min_salary,
        max_salary = p_max_salary
    WHERE job_id = p_job_id;

    COMMIT;
END update_job_sp;
/
