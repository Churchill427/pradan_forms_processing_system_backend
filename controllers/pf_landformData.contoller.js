const db = require("../configs/mysql_config");
const asyncHandler = require("../middlewares/asyncHandler");

//Fetch data from prefunding forms
const getpf_landformData_sql = `SELECT 
    forms.farmer_name,
    forms.spouse,
    forms.mcode,
    forms.hamlet,
    forms.panchayat,
    form_lands.revenue,
    forms.district,
    forms.block,
    form_lands.p_contribution,
    form_lands.f_contribution,
    files.passbook_postfunding,
    form_lands.verified_by,
    form_lands.total_area
  FROM 
    forms
  LEFT JOIN 
    form_lands ON forms.id = form_lands.form_id
  LEFT JOIN 
    files ON forms.id = files.form_id
  WHERE 
    forms.form_type = 1
    AND forms.id = ?`;

exports.getpf_landformData = asyncHandler(async (req, res) => {
  const connection = await db.getConnection();
  const form_id = req.query.form_id;

  try {
    const [results] = await connection.execute(getpf_landformData_sql, [form_id]);
    //console.log(res);
    if (results.length > 0) {
      res.status(200);
      //const res = results[0];
      //res.formid = form_id;
     // console.log(results[0]);
      const result_with_id = results[0];
      result_with_id.form_id = form_id; // Add form_id to the result
      console.log("Result with ID:", result_with_id); 
      //console.log("Result with ID:", result_with_id);
      return res.json(result_with_id).status(200);
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
const updatepf_landformData_sql = `  
  UPDATE form_lands
  LEFT JOIN forms ON form_lands.form_id = forms.id
  LEFT JOIN files ON forms.id = files.form_id
  SET 
    form_lands.p_contribution = ?,
    form_lands.f_contribution = ?,
    form_lands.total_est = ?,
    form_lands.measured_by = ?,
    form_lands.total_area = ?,
    files.passbook_postfunding = ?
  WHERE 
    form_lands.form_id = ?
    AND forms.form_type = 1`;

exports.updatepf_landformData = asyncHandler(async (req, res) => {
  const connection = await db.getConnection();
  // const form_id = req.query.form_id;
  const pf_landformData = req.body;
  try {
      console.log(pf_landformData);
      // console.log(pf_landformData.landDevelopment.pradanContribution);
      // console.log(pf_landformData.landDevelopment.farmerContribution);
      // console.log(pf_landformData.landDevelopment.totalEstimate);
      // console.log(pf_landformData.basicDetails.measuredBy);
      // console.log(pf_landformData.landOwnership.totalArea);
      // console.log(pf_landformData.bankDetails.pf_passbook.name2);
      // console.log(pf_landformData.basicDetails.form_id); 
      const [results] = await connection.execute(updatepf_landformData_sql, [
          pf_landformData.landDevelopment.pradanContribution,
          pf_landformData.landDevelopment.farmerContribution,
          pf_landformData.landDevelopment.totalEstimate,
          pf_landformData.basicDetails.measuredBy,
          pf_landformData.landOwnership.totalArea,
          pf_landformData.bankDetails.pf_passbook.name2,
          pf_landformData.form_id
    ]);
    if (results.affectedRows > 0) {
      //console.log("Update successful");
      return res.status(200).json("Received data successfully");
    } else {
      //console.log("No rows affected");
      return res.status(200).json("No rows affected");
    }
  } catch (err) {
    //console.error("Error updating data:", err);
    return res.status(500).json({ error: err.message });
  } finally {
    connection.release(); // Always release the connection
  }
});

//verficatino