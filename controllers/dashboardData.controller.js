const mysql = require("mysql2");
const db = require("../configs/mysql_config");
const asyncHandler = require("../middlewares/asyncHandler");


const getTotalFormsStatusCount_sql = `SELECT s.status, COUNT(f.status) AS count
  FROM (
    SELECT 1 AS status
    UNION ALL
    SELECT 2
    UNION ALL
    SELECT 3
    UNION ALL
    SELECT 4
    UNION ALL
    SELECT 6
    UNION ALL
    SELECT 7
    UNION ALL
    SELECT 8
    UNION ALL
    SELECT 9
  ) AS s
  LEFT JOIN forms f ON f.status = s.status AND f.user_id = ?
  GROUP BY s.status
  ORDER BY s.status`;

exports.getTotalFormsStatusCount = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    //console.log("userId (status count total):", userId);
    db.query(getTotalFormsStatusCount_sql, [userId], (err, results) => {
        if (err) {
        return res.status(500).json({ error: err.message });
        }
        //console.log("results:", results);
        if (results.length > 0) {
        return res.json(results);
        } else {
        return res.json(0);
        }
    });
});

const getTodayFormsStatusCount_sql = `SELECT s.status, COUNT(f.status) AS count
  FROM (
    SELECT 1 AS status UNION ALL
    SELECT 2 UNION ALL
    SELECT 3 UNION ALL
    SELECT 4 UNION ALL
    SELECT 6 UNION ALL
    SELECT 7 UNION ALL
    SELECT 8 UNION ALL
    SELECT 9
  ) AS s
  LEFT JOIN forms f ON f.status = s.status AND f.user_id = ? AND f.created_at = ?
  GROUP BY s.status
  ORDER BY s.status`;


exports.getTodayFormsStatusCount = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const date = new Date();
    const today = new Date(date.getFullYear(), date.getMonth(), date.getDate()).toLocaleDateString('en-CA');
    //const today = '17-04-2025'
    // console.log("today:", today);
    // console.log("userId (status count today):", userId);
    db.query(getTodayFormsStatusCount_sql, [userId,today], (err, results) => {
        if (err) {
        return res.status(500).json({ error: err.message });
        }
        //console.log("results (today):", results);
        if (results.length > 0) {
        return res.json(results);
        } else {
        return res.json(0);
        }
    });
});