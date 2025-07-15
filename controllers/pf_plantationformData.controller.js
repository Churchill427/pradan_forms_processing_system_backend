const db = require("../configs/mysql_config");
const asyncHandler = require("../middlewares/asyncHandler");

//Fetch data from prefunding forms
const getpf_plantationformData_sql = `  SELECT 
    forms.farmer_name,
    forms.spouse,
    forms.mcode,
    forms.hamlet,
    forms.panchayat,
    plantation_details.revenue,
    forms.district,
    forms.block,
    plantation_details.p_contribution,
    plantation_details.f_contribution,
    files.passbook_postfunding,
    plantation_details.verified_by,
    plantation_details.total_area,
    plantation_details.plantaions,
    plantation_details.nos,
    plantation_details.price,
    plantation_details.other_exp,
    plantation_details.tot_nos,
    plantation_details.tot_price
  FROM 
    forms 
  LEFT JOIN 
    plantation_details ON forms.id = plantation_details.form_id
  LEFT JOIN 
    files ON forms.id = files.form_id
  WHERE 
    forms.form_type = 3
    AND forms.id = ?` ;

exports.getpf_plantationformData = asyncHandler(async (req, res) => {
  const connection = await db.getConnection();
  const form_id = req.query.form_id;

  try {
    const [results] = await connection.execute(getpf_plantationformData_sql, [form_id]);

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
