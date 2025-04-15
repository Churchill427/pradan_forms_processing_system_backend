const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();
const db = mysql.createConnection({
    host: process.env.DB_HOST, // Change in .env file
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3306
  });
  
db.connect((err) => {
    if (err) {
      console.error("❌ MySQL Connection Error:", err);
    } else {
      console.log("✅ Connected to MySQL Database");
    }
  });

module.exports=db;
  