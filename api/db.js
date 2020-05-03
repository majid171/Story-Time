const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "123456Mj11",
    host: "localhost",
    port: 5432,
    database: "storytime"
});

module.exports = pool;