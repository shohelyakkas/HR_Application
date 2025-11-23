-- Function: get_job
-- Purpose: return job_title for a given job_id from HR_JOBS

CREATE OR REPLACE FUNCTION get_job (
    p_job_id IN VARCHAR2
) RETURN VARCHAR2
AS
    v_job_title hr_jobs.job_title%TYPE;
BEGIN
    SELECT job_title
    INTO v_job_title
    FROM hr_jobs
    WHERE job_id = p_job_id;

    RETURN v_job_title;
END get_job;
/

