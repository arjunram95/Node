const { Pool } = require("pg");

// Create a new pool instance
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "postgres",
  port: 5432, // Default PostgreSQL port
});

// Example query
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error executing query", err);
  } else {
    console.log(res.rows[0].now);
  }
  // Close the connection pool
  //   pool.end();
});

module.exports = pool;
