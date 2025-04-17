const mysql = require("mysql2");
const db = require("../configs/mysql_config");
const asyncHandler = require("../middlewares/asyncHandler");

    const authUser_sql = `
      SELECT 
        CASE 
          WHEN EXISTS (
            SELECT * FROM users WHERE email = ? AND password = ?
          )
          THEN '1'
          ELSE '0'
        END AS login_success
    `;

exports.authUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    db.query(authUser_sql,[username, password],(err, results) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        const login_success = results[0].login_success;
        //console.log("results:",results[0]);
        if (login_success === '1') {
          return res.json(1);
        }
        else{
            return res.json(0);
        }
       // res.json({login_success});
      });
});

const changePassword_sql = `
  UPDATE users 
  SET password = ? 
  WHERE email = ? AND password = ?
`;

exports.changePassword = asyncHandler(async (req, res) => {
    const { username, oldPassword, newPassword } = req.body;
    //console.log(req.body);
    //console.log("username:", username);
    //console.log("oldpassword:", oldPassword);
    //console.log("newPassword:", newPassword);
    db.query(changePassword_sql,[newPassword, username, oldPassword],(err, results) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows > 0) {
          return res.json(1);
        } else {
          return res.json(0);
        }
      });
  });
  