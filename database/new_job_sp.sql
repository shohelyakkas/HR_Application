-- Procedure: new_job_sp
-- Purpose: Insert a new job into HR_JOBS

CREATE OR REPLACE PROCEDURE new_job_sp (
    p_job_id       IN VARCHAR2,
    p_job_title    IN VARCHAR2,
    p_min_salary   IN NUMBER,
    p_max_salary   IN NUMBER
) AS
BEGIN
    INSERT INTO hr_jobs (
        job_id,
        job_title,
        min_salary,
        max_salary
    )
    VALUES (
        p_job_id,
        p_job_title,
        p_min_salary,
        p_max_salary
    );

    COMMIT;  -- required by project
END new_job_sp;
/
