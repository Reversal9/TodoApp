import pg from "pg";
const { Pool } = pg;
import debug from "debug";

const logger = debug("db");

export const pool = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGDBPORT,
    database: process.env.PGDATABASE,
});

logger("Connecting to database...");

pool.on("error", (err) => {
    console.error("Unexpected error on idle client", err);
    process.exit(-1);
});

// For simple queries, use pooling
export const query = async (text, params) => {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    logger("Executed query", { text, params, duration, rows: res.rowCount });
    return res;
};

// For complicated queries, including transactions
// Route is responsible for releasing the client
export const getClient = () => {
    return pool.connect();
};
