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
  const connection = await db.getConnection();

  try {
    const [results] = await connection.execute(authUser_sql, [username, password]);
    const login_success = results[0].login_success;

    if (login_success === '1') {
      res.json(1);
    } else {
      res.json(0);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    connection.release();
  }
});

const changePassword_sql = `
  UPDATE users 
  SET password = ? 
  WHERE email = ? AND password = ?
`;

exports.changePassword = asyncHandler(async (req, res) => {
  const { username, oldPassword, newPassword } = req.body;
  const connection = await db.getConnection();

  try {
    const [results] = await connection.execute(changePassword_sql, [newPassword, username, oldPassword]);
    if (results.affectedRows > 0) {
      res.json(1);
    } else {
      res.json(0);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    connection.release();
  }
});

  