const mysql = require("mysql2");
const db = mysql.createConnection(
{
    host:"localhost",
    user:process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
},
    console.log('connected to the employee_tracker database')
);
module.exports = db;