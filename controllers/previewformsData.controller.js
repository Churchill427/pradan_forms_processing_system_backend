const db = require("../configs/mysql_config");
const asyncHandler = require("../middlewares/asyncHandler");

const getpreviewformsData_sql = `SELECT id, form_type, farmer_name, created_at, status FROM forms WHERE user_id = ?`;

exports.getpreviewformsData = asyncHandler(async (req, res) => {
    const connection = await db.getConnection();
    const user_id = req.query.user_id;
   // console.log(user_id);
  
    try {
      const [results] = await connection.execute(getpreviewformsData_sql,[user_id]);
  
      if (results.length > 0) {
        //console.log(results);
        return res.json(results);
      } else {
        return res.json(0);
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    } finally {
      connection.release(); // Always release the connection
    }
  });

  const getpreviewspecificformData_sql = ``;

  exports.getpreviewspecificformData = asyncHandler(async (req, res) => {
    const connection = await db.getConnection();
    const form_id = req.query.form_id;
    //console.log(data.user_id);
  
    try {
      const [results] = await connection.execute(getpreviewspecificformData_sql,[form_id]);
  
      if (results.length > 0) {
        console.log(results);
       // return res.json(results);
      } else {
        return res.json(0);
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    } finally {
      connection.release(); // Always release the connection
    }
  });
