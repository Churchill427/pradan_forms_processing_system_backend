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

const updatepf_plantationformData_sql = `  
  UPDATE plantation_details
  LEFT JOIN forms ON plantation_details.form_id = forms.id
  LEFT JOIN files ON forms.id = files.form_id
  SET 
    plantation_details.p_contribution = ?,
    plantation_details.f_contribution = ?,
    plantation_details.total_est = ?,
    plantation_details.plantaions = ?,
    plantation_details.nos = ?,
    plantation_details.price = ?,
    plantation_details.other_exp = ?,
    plantation_details.tot_nos = ?,
    plantation_details.tot_price = ?,
    plantation_details.measured_by = ?,
    plantation_details.total_area = ?,
    files.passbook_postfunding = ?
  WHERE 
    plantation_details.form_id = ?
    AND forms.form_type = 3`;

exports.updatepf_plantationformData = asyncHandler(async (req, res) => {
  const connection = await db.getConnection();
  // const form_id = req.query.form_id;
  const pf_plantationformData = req.body;
  try {
      //console.log(pf_plantationformData);
      // console.log(pf_plantationformData.landDevelopment.pradanContribution);
      // console.log(pf_plantationformData.landDevelopment.farmerContribution);
      // console.log(pf_plantationformData.landDevelopment.totalEstimate);
      // console.log(pf_plantationformData.plantations.plantationTypes);
      // console.log(pf_plantationformData.plantations.plantationNumbers);
      // console.log(pf_plantationformData.plantations.plantationPrices);
      // console.log(pf_plantationformData.plantations.otherExpenses);
      // console.log(pf_plantationformData.plantations.total_nos);
      // console.log(pf_plantationformData.plantations.totalExpenses);
      // console.log(pf_plantationformData.basicDetails.measuredBy);
      // console.log(pf_plantationformData.landOwnership.totalArea);
      // console.log(pf_plantationformData.bankDetails.pf_passbook.name2);
      // console.log(pf_plantationformData.form_id); 
      const [results] = await connection.execute(updatepf_plantationformData_sql, [
          pf_plantationformData.landDevelopment.pradanContribution,
          pf_plantationformData.landDevelopment.farmerContribution,
          pf_plantationformData.landDevelopment.totalEstimate,
          pf_plantationformData.plantations.plantationTypes,
          pf_plantationformData.plantations.plantationNumbers,
          pf_plantationformData.plantations.plantationPrices,
          pf_plantationformData.plantations.otherExpenses,
          pf_plantationformData.plantations.total_nos,
          pf_plantationformData.plantations.totalExpenses,
          pf_plantationformData.basicDetails.measuredBy,
          pf_plantationformData.landOwnership.totalArea,
          pf_plantationformData.bankDetails.pf_passbook.name2,
          pf_plantationformData.form_id
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