const mysql = require("mysql2");
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    database: "",
    password:"",
});
module.exports = db;