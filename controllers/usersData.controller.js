// controllers/userController.js
const db = require("../configs/mysql_config");
const asyncHandler = require("../middlewares/asyncHandler");

exports.getUserData = asyncHandler(async (req, res) => {
  const connection = await db.getConnection();
  const username = req.params.username;

  try {
    const [results] = await connection.execute(
      "SELECT * FROM users WHERE email = ?",
      [username]
    );

    if (results.length > 0) {
      return res.json(results[0]);
    } else {
      return res.json(0);
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  } finally {
    connection.release(); // Always release the connection
  }
});
