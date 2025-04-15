const mysql = require("mysql2");
const db = require("../configs/mysql_config");
const asyncHandler = require("../middlewares/asyncHandler");

    const authUSer_sql = `
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
    db.query(authUSer_sql,[username, password],(err, results) => {
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
    const { username, oldpassword, newpassword } = req.body;
  
    db.query(authUSer_sql, [username, oldpassword], (err, results1) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
  
      const login_success = results1[0].login_success;
      console.log("login_success:", login_success);
  
      if (parseInt(login_success) === 1) {
        db.query(changePassword_sql, [newpassword, username, oldpassword], (err, results) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          const password_changed = results.affectedRows > 0 ? 1 : 0;
          console.log("password_changed:", password_changed);
          return res.json(password_changed);
        });
      } else {
        return res.json(0); // Invalid old credentials
      }
    });
  });
  