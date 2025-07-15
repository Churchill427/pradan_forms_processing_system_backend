const db = require("../configs/mysql_config");
const asyncHandler = require("../middlewares/asyncHandler");

//Fetch data from prefunding forms
const getpf_pondformData_sql = `SELECT 
    forms.farmer_name,
    forms.spouse,
    forms.mcode,
    forms.hamlet,
    forms.panchayat,
    farm_pond_details.revenue,
    forms.district,
    forms.block,
    farm_pond_details.p_contribution,
    farm_pond_details.f_contribution,
    files.passbook_postfunding,
    farm_pond_details.verified_by,
    farm_pond_details.length,
    farm_pond_details.breadth,
    farm_pond_details.depth,
    farm_pond_details.volume,
    farm_pond_details.total_est
  FROM 
    forms
  LEFT JOIN 
    farm_pond_details ON forms.id = farm_pond_details.form_id
  LEFT JOIN 
    files ON forms.id = files.form_id
  WHERE 
    forms.form_type = 2
    AND forms.id = ? `;

exports.getpf_pondformData = asyncHandler(async (req, res) => {
  const connection = await db.getConnection();
  const form_id = req.query.form_id;

  try {
    const [results] = await connection.execute(getpf_pondformData_sql, [form_id]);

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

//Update postfunding data
