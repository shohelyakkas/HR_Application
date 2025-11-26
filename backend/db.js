const oracledb = require('oracledb');
require('dotenv').config();

// DB config - prefer environment variables for credentials
const dbConfig = {
    user: process.env.DB_USER || 'COMP214_F25_ers_21',
    password: process.env.DB_PASSWORD || 'password',
    connectString: process.env.DB_CONNECT || '199.212.26.208:1521/SQLD'
};

async function init() {
    // optional: pool for better performance
    if (!oracledb.pool) {
        await oracledb.createPool(dbConfig);
    }
}

async function execute(sql, binds = {}, options = {}) {
    let connection;
    try {
        connection = await oracledb.getConnection();
        const result = await connection.execute(sql, binds, options);
        return result;
    } finally {
        if (connection) await connection.close();
    }
}

module.exports = { init, execute };
