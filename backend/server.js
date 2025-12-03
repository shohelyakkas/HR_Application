const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const oracledb = require('oracledb');

// allow dev mock fallback when DB is unreachable
require('dotenv').config();
// Helper to format DB errors for client-friendly messages
function sendError(res, err) {
    const raw = (err && (err.message || err.error || '')).toString();

    // Check for salary validation error (ORA-20001 from check_salary_range procedure)
    if (raw.includes('ORA-20001') || raw.toLowerCase().includes('salary outside')) {
        // Extract the application message following ORA-20001
        const m = raw.match(/ORA-20001:\s*(.*?)(\r?\n|ORA-|$)/);
        const userMsg = m ? m[1].trim() : 'Salary outside allowed range for this job';
        return res.status(400).json({ error: userMsg });
    }

    // Check for unique constraint violation (duplicate job_id, employee_id, etc.)
    if (raw.includes('ORA-00001') && raw.toLowerCase().includes('unique constraint')) {
        // Check if it's a job_id constraint
        if (raw.includes('JOB_ID_PK') || raw.includes('job_id')) {
            return res.status(400).json({ error: 'Job ID already exists' });
        }
        // Check if it's an employee email constraint
        if (raw.includes('EMAIL') || raw.includes('email')) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        // Generic unique constraint error
        return res.status(400).json({ error: 'Duplicate entry - record already exists' });
    }

    // Check for foreign key constraint violations
    if (raw.includes('ORA-02291')) {
        return res.status(400).json({ error: 'Invalid reference - related record does not exist' });
    }

    // Default error
    return res.status(500).json({ error: raw });
}

// 1) HIRE EMPLOYEE  (calls employee_hire_sp)
app.post('/hire-employee', async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            email,
            salary,
            hire_date,
            phone,
            job_id,
            manager_id,
            department_id
        } = req.body;

        //     const sql = `
        //   BEGIN
        //     employee_hire_sp(
        //       :p_first_name,
        //       :p_last_name,
        //       :p_email,
        //       :p_salary,
        //       :p_hire_date,
        //       :p_phone,
        //       :p_job_id,
        //       :p_manager_id,
        //       :p_department_id
        //     );
        //   END;`;

        const sql = `
BEGIN
  employee_hire_sp(
    :p_first_name,
    :p_last_name,
    :p_email,
    :p_salary,
    TO_DATE(:p_hire_date, 'YYYY-MM-DD'), 
    :p_phone,
    :p_job_id,
    :p_manager_id,
    :p_department_id
  );
END;`;

        await db.execute(
            sql,
            {
                p_first_name: first_name,
                p_last_name: last_name,
                p_email: email,
                p_salary: salary,
                p_hire_date: hire_date,    // or new Date()
                p_phone: phone,
                p_job_id: job_id,
                p_manager_id: manager_id,
                p_department_id: department_id
            },
            { autoCommit: true }
        );

        res.json({ message: 'Employee hired successfully' });

    } catch (err) {
        console.error(err);
        return sendError(res, err); //How did I get this error?
    }

});

// 2) UPDATE EMPLOYEE (salary/phone/email)
app.put('/employee/:id', async (req, res) => {
    try {
        const empId = req.params.id;
        const { salary, phone, email, job_id } = req.body;

        // use your procedure update_employee_info OR plain UPDATE
        const sql = `
      BEGIN
        update_employee_info(
          :p_emp_id,
          :p_salary,
          :p_phone,
          :p_email,
          :p_job_id
        );
      END;`;

        await db.execute(
            sql,
            {
                p_emp_id: empId,
                p_salary: salary,
                p_phone: phone,
                p_email: email,
                p_job_id: job_id
            },
            { autoCommit: true }
        );

        res.json({ message: 'Employee updated' });
    } catch (err) {
        console.error(err);
        return sendError(res, err);
    }
});

// 3) GET JOB TITLE (calls get_job function)
app.get('/job/:jobId', async (req, res) => {
    try {
        const sql = `
      BEGIN
        :result := get_job(:p_job_id);
      END;`;

        const result = await db.execute(
            sql,
            {
                p_job_id: req.params.jobId,
                result: { dir: require('oracledb').BIND_OUT, type: require('oracledb').STRING }
            }
        );

        res.json({ jobId: req.params.jobId, title: result.outBinds.result });
    } catch (err) {
        console.error(err);
        // If running locally and the DB cannot be reached, optionally return mock data
        const msg = (err && (err.message || err.error || '')).toString();
        const useMock = process.env.USE_MOCK === 'true' || msg.toLowerCase().includes('timed out') || msg.toLowerCase().includes('connection to host');
        if (useMock) {
            console.warn('Returning mock employees data due to DB error (development mode)');
            const sample = [
                { employee_id: 101, first_name: 'Alice', last_name: 'Smith', email: 'alice.smith@example.com', phone_number: '555-0101', job_id: 'DEV', salary: 60000 },
                { employee_id: 102, first_name: 'Bob', last_name: 'Johnson', email: 'bob.johnson@example.com', phone_number: '555-0102', job_id: 'QA', salary: 52000 }
            ];
            return res.json(sample);
        }
        return sendError(res, err);
    }
});

// 4) UPDATE JOB (procedure or UPDATE)
app.put('/job/:jobId', async (req, res) => {
    try {
        const { title, min_salary, max_salary } = req.body;

        const sql = `
      BEGIN
        update_job_sp(
          :p_job_id,
          :p_title,
          :p_min_salary,
          :p_max_salary
        );
      END;`;

        await db.execute(
            sql,
            {
                p_job_id: req.params.jobId,
                p_title: title,
                p_min_salary: min_salary,
                p_max_salary: max_salary
            },
            { autoCommit: true }
        );

        res.json({ message: 'Job updated' });
    } catch (err) {
        console.error(err);
        return sendError(res, err);
    }
});

// 6) GET jobs list (for dropdowns)
app.get('/jobs', async (req, res) => {
    try {
        const result = await db.execute(
            `SELECT job_id, job_title, min_salary, max_salary FROM hr_jobs ORDER BY job_id`,
            {},
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );
        // normalize keys to lowercase for frontend consistency
        const rows = (result.rows || []).map(r => {
            const o = {}
            for (const k in r) if (Object.prototype.hasOwnProperty.call(r, k)) o[k.toLowerCase()] = r[k]
            return o
        })
        res.json(rows);
    } catch (err) {
        console.error(err);
        return sendError(res, err);
    }
});

// 7) GET departments list
app.get('/departments', async (req, res) => {
    try {
        const result = await db.execute(
            `SELECT department_id, department_name FROM hr_departments ORDER BY department_id`,
            {},
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );
        const rows = (result.rows || []).map(r => {
            const o = {}
            for (const k in r) if (Object.prototype.hasOwnProperty.call(r, k)) o[k.toLowerCase()] = r[k]
            return o
        })
        res.json(rows);
    } catch (err) {
        console.error(err);
        return sendError(res, err);
    }
});

// 8) GET managers list (employees who are referenced as manager_id)
app.get('/managers', async (req, res) => {
    try {
        const result = await db.execute(
            `SELECT e.employee_id, e.first_name, e.last_name
             FROM hr_employees e
             WHERE e.employee_id IN (SELECT DISTINCT manager_id FROM hr_employees WHERE manager_id IS NOT NULL)
             ORDER BY e.employee_id`,
            {},
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );
        // If there are no explicit managers recorded in the data, fall back to returning a small list
        // of employees so the UI can still pick a manager during demos.
        let rows = result.rows || []
        if (!rows || rows.length === 0) {
            const fallback = await db.execute(
                `SELECT employee_id, first_name, last_name FROM hr_employees ORDER BY employee_id FETCH FIRST 10 ROWS ONLY`,
                {},
                { outFormat: oracledb.OUT_FORMAT_OBJECT }
            );
            rows = fallback.rows || []
        }
        const out = rows.map(r => {
            const o = {}
            for (const k in r) if (Object.prototype.hasOwnProperty.call(r, k)) o[k.toLowerCase()] = r[k]
            return o
        })
        res.json(out);
    } catch (err) {
        console.error(err);
        return sendError(res, err);
    }
});

// 9) GET employees list (for listing and editing)
app.get('/employees', async (req, res) => {
    try {
        const result = await db.execute(
            `SELECT employee_id, first_name, last_name, email, phone_number, job_id, salary, manager_id, department_id FROM hr_employees ORDER BY employee_id`,
            {},
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );
        const rows = (result.rows || []).map(r => {
            const o = {}
            for (const k in r) if (Object.prototype.hasOwnProperty.call(r, k)) o[k.toLowerCase()] = r[k]
            return o
        })
        res.json(rows);
    } catch (err) {
        console.error(err);
        return sendError(res, err);
    }
});

// 5) CREATE JOB (calls new_job_sp)
app.post('/create-job', async (req, res) => {
    try {
        const { job_id, title, min_salary, max_salary } = req.body;

        const sql = `
      BEGIN
        new_job_sp(
          :p_job_id,
          :p_title,
          :p_min_salary,
          :p_max_salary
        );
      END;`;

        await db.execute(
            sql,
            {
                p_job_id: job_id,
                p_title: title,
                p_min_salary: min_salary,
                p_max_salary: max_salary
            },
            { autoCommit: true }
        );

        res.json({ message: 'Job created' });
    } catch (err) {
        console.error(err);
        return sendError(res, err);
    }
});

(async () => {
    try {
        await db.init();
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Failed to start server:', err);
    }
})();


