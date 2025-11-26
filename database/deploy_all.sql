-- deploy_all.sql
-- Runs all database scripts in correct order. Run from SQL*Plus or SQLcl:
-- sqlplus username/password@connectString @deploy_all.sql

@employee_hire_sp.sql
@get_job.sql
@new_job_sp.sql
@update_job_sp.sql
@check_salary_range.sql
@salary_range_trigger.sql
@update_employee_info.sql

PROMPT All scripts executed. Check compile errors.
