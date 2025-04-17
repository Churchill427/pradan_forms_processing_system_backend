const mysql = require("mysql2");
const db = require("../configs/mysql_config");
const asyncHandler = require("../middlewares/asyncHandler");


exports.getUserData = asyncHandler(async (req, res) => { 
    //console.log("Param:",req.params.username);
    const username = req.params.username;
    //console.log("username:", username);
    const getUserData_sql = `
        SELECT * FROM users WHERE email = ?
    `;
    db.query(getUserData_sql,[username],(err, results) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        if (results.length > 0) {
          //console.log("results:",results[0]);
          return res.json(results[0]);
        } else {
          return res.json(0);
        }
      });
    //return res.json("response from getUserData");
}
);