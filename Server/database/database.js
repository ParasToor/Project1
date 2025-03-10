const mysql = require("mysql2");

const pool = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "Mysql@2468",
    database: "project1",
  })
  .promise();

// async function fetchUsers() {
//   const result = await pool.query("SELECT * FROM users");
//   console.log(result);
// }

// fetchUsers();

module.exports = pool;