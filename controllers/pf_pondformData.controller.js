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
      //console.log(results[0]);
      const result_with_id = results[0];
      result_with_id.form_id = form_id;
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
const updatepf_pondformData_sql = `  
  UPDATE farm_pond_details
  LEFT JOIN forms ON farm_pond_details.form_id = forms.id
  LEFT JOIN files ON forms.id = files.form_id
  SET 
    farm_pond_details.p_contribution = ?,
    farm_pond_details.f_contribution = ?,
    farm_pond_details.total_est = ?,
    farm_pond_details.measured_by = ?,
    farm_pond_details.len_pf = ?,
    farm_pond_details.bre_pf = ?,
    farm_pond_details.dep_pf = ?,
    farm_pond_details.vol_pf = ?,
    files.passbook_postfunding = ?
  WHERE 
    farm_pond_details.form_id = ?
    AND forms.form_type = 2`;

exports.updatepf_pondformData = asyncHandler(async (req, res) => {
  const connection = await db.getConnection();
  // const form_id = req.query.form_id;
  const pf_pondformData = req.body;
  try {
      console.log(pf_pondformData);
      // console.log(pf_pondformData.landDevelopment.pradanContribution);
      // console.log(pf_pondformData.landDevelopment.farmerContribution);
      // console.log(pf_pondformData.landDevelopment.totalEstimate);
      // console.log(pf_pondformData.basicDetails.measuredBy);
      // console.log(pf_pondformData.landDevelopment.length);
      // console.log(pf_pondformData.landDevelopment.breadth);
      // console.log(pf_pondformData.landDevelopment.depth);
      // console.log(pf_pondformData.landDevelopment.volume);
      // console.log(pf_pondformData.bankDetails.pf_passbook.name2);
      // console.log(pf_pondformData.basicDetails.form_id); 
      const [results] = await connection.execute(updatepf_pondformData_sql, [
          pf_pondformData.landDevelopment.pradanContribution,
          pf_pondformData.landDevelopment.farmerContribution,
          pf_pondformData.landDevelopment.totalEstimate,
          pf_pondformData.basicDetails.measuredBy,
          pf_pondformData.landDevelopment.length,
          pf_pondformData.landDevelopment.breadth,
          pf_pondformData.landDevelopment.depth,
          pf_pondformData.landDevelopment.volume,
          pf_pondformData.bankDetails.pf_passbook.name2,
          pf_pondformData.form_id
    ]);
    if (results.affectedRows > 0) {
      //console.log("Update successful");
      return res.status(200).json("Received data successfully");
    } else {
      //console.log("No rows affected");
      return res.status(200).json("No rows affected");
    }
    //return res.json(200);
  } catch (err) {
    //console.error("Error updating data:", err);
    return res.status(500).json({ error: err.message });
  } finally {
    connection.release(); // Always release the connection
  }
});
