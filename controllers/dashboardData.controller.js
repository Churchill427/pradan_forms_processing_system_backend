const db = require("../configs/mysql_config");
const asyncHandler = require("../middlewares/asyncHandler");

const getTotalFormsStatusCount_sql = `
  SELECT s.status, COUNT(f.status) AS count
  FROM (
    SELECT 1 AS status
    UNION ALL SELECT 2
    UNION ALL SELECT 3
    UNION ALL SELECT 4
    UNION ALL SELECT 6
    UNION ALL SELECT 7
    UNION ALL SELECT 8
    UNION ALL SELECT 9
  ) AS s
  LEFT JOIN forms f ON f.status = s.status AND f.user_id = ?
  GROUP BY s.status
  ORDER BY s.status
`;

exports.getTotalFormsStatusCount = asyncHandler(async (req, res) => {
  const connection = await db.getConnection();
  const userId = req.query.user_id;
  console.log(userId);

  try {
    const [results] = await connection.execute(getTotalFormsStatusCount_sql, [userId]);
    if (results.length > 0) {
      res.json(results);
    } else {
      res.json(0);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    connection.release();
  }
});

const getTodayFormsStatusCount_sql = `
  SELECT s.status, COUNT(f.status) AS count
  FROM (
    SELECT 1 AS status
    UNION ALL SELECT 2
    UNION ALL SELECT 3
    UNION ALL SELECT 4
    UNION ALL SELECT 6
    UNION ALL SELECT 7
    UNION ALL SELECT 8
    UNION ALL SELECT 9
  ) AS s
  LEFT JOIN forms f 
    ON f.status = s.status 
    AND f.user_id = ? 
    AND f.created_at = ?
  GROUP BY s.status
  ORDER BY s.status
`;

exports.getTodayFormsStatusCount = asyncHandler(async (req, res) => {
  const connection = await db.getConnection();
  const date = new Date();
  const user_id = req.query.user_id;
  const today =  new Date(date.getFullYear(), date.getMonth(), date.getDate()).toLocaleDateString('en-CA');// 'YYYY-MM-DD'

  try {
    const [results] = await connection.execute(getTodayFormsStatusCount_sql, [user_id, today]);
    if (results.length > 0) {
      res.json(results);
    } else {
      res.json(0);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    connection.release();
  }
});
