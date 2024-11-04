import "dotenv/config";
import pkg from 'pg';
const { Pool } = pkg;

const { PSQL_USERNAME, PSQL_PASSWORD, PSQL_DATABASE, POSTGRES_PORT } = process.env;

const pool = new Pool({
    user: PSQL_USERNAME,
    password: PSQL_PASSWORD,
    host: 'localhost',
    port: POSTGRES_PORT,
    database: PSQL_DATABASE
});

export default { query: (text, params) => pool.query(text, params) }