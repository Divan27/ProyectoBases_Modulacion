const sql = require("mssql");
require("dotenv").config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT),

    options: {
        encrypt: process.env.DB_ENCRYPT === "true",
        trustServerCertificate:
            process.env.DB_TRUST_CERT === "true"
    }
};

let pool;

async function getPool() {

    if (!pool) {
        pool = await sql.connect(config);

        console.log(
            "Conectado a SQL Server -",
            process.env.DB_DATABASE
        );
    }

    return pool;
}

module.exports = {
    sql,
    getPool
};