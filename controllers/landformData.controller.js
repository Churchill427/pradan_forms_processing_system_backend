//const mysql = require("mysql2/promise");
const db = require("../configs/mysql_config");
const asyncHandler = require("../middlewares/asyncHandler");

const postLandformData_basicdetails_sql = `INSERT INTO forms (
  farmer_name, age, mobile, district, block, panchayat, hamlet,
  id_type, id_number, gender, spouse, type_of_households, h_members,
  hh_occupation, special_catog, caste, house_owner, type_of_house,
  drinking_water, potability, domestic_water, toilet_avail, toilet_cond,
  household_education, user_id, created_at, lat, lon, status, form_type
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

const postLandformData_landdetails_sql = `INSERT INTO form_lands (
  form_id, ownership, well_irrigation, area_irrigated, irrigated_lands,
  patta, total_area, taluk, firka, revenue, crop_season, livestocks,
  sf_number, soil_type, land_to_benefit, area_benefited,
  type_of_work, any_other_works, p_contribution, f_contribution,
  total_est, date_of_app, date_of_ins
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;

const postLandformData_bankdetails_sql = `INSERT INTO bank_details (
  form_id, account_holder_name, account_number, bank_name,
  branch, ifsc_code, farmer_ack
) VALUES (?, ?, ?, ?, ?, ?, ?)`;

const postLandformData_files_sql = `INSERT INTO files (
  form_id, identity, geotag, patta, fmb, photo, passbook
) VALUES (?, ?, ?, ?, ?, ?, ?)`;

exports.postLandformData = asyncHandler(async (req, res) => {
  const connection = await db.getConnection();
  await connection.beginTransaction(); // 🚀 Start transaction

  try {
    const landformData = req.body;
    const date = new Date();
    const today = new Date(date.getFullYear(), date.getMonth(), date.getDate()).toLocaleDateString('en-CA');
   // console.log("Received landform data:", landformData);

    const safe = (value) => value === undefined ? null : value;

    // Insert basic details
    const [formResult] = await connection.execute(postLandformData_basicdetails_sql, [
      safe(landformData.basicDetails.name),
      safe(landformData.basicDetails.age),
      safe(landformData.basicDetails.mobile),
      safe(landformData.basicDetails.district),
      safe(landformData.basicDetails.block),
      safe(landformData.basicDetails.panchayat),
      safe(landformData.basicDetails.hamlet),
      safe(landformData.basicDetails.idCardType),
      safe(landformData.basicDetails.idCardNumber),
      safe(landformData.basicDetails.gender),
      safe(landformData.basicDetails.fatherSpouse),
      safe(landformData.basicDetails.householdType),
      safe(landformData.basicDetails.hhcombined),
      safe(landformData.basicDetails.occupationCombined),
      safe(landformData.basicDetails.specialCategoryNumber),
      safe(landformData.basicDetails.caste),
      safe(landformData.basicDetails.houseOwnership),
      safe(landformData.basicDetails.houseType),
      safe(landformData.basicDetails.drinkingWaterCombined),
      safe(landformData.basicDetails.potabilityCombined),
      safe(landformData.basicDetails.domesticWaterCombined),
      safe(landformData.basicDetails.toiletAvailability),
      safe(landformData.basicDetails.toiletCondition),
      safe(landformData.basicDetails.education),
      safe(landformData.id),
      safe(today),
      safe(landformData.landDevelopment.latitude),
      safe(landformData.landDevelopment.longitude),
      1,
      1
    ]);

    const form_id = formResult.insertId;
    console.log("Form ID:", form_id);

    // Insert land details
    await connection.execute(postLandformData_landdetails_sql, [
      safe(form_id),
      safe(landformData.landOwnership.landOwnershipType),
      safe(landformData.landOwnership.hasWell),
      safe(landformData.landOwnership.areaIrrigated),
      safe(landformData.landOwnership.irrigatedLandCombined),
      safe(landformData.landOwnership.pattaNumber),
      safe(landformData.landOwnership.totalArea),
      safe(landformData.landOwnership.taluk),
      safe(landformData.landOwnership.firka),
      safe(landformData.landOwnership.revenueVillage),
      safe(landformData.landOwnership.cropSeasonCombined),
      safe(landformData.landOwnership.livestockCombined),
      safe(landformData.landDevelopment.sfNumber),
      safe(landformData.landDevelopment.soilTypeCombined),
      safe(landformData.landDevelopment.landBenefit),
      safe(landformData.landDevelopment.proposalArea),
      safe(landformData.landDevelopment.workTypeCombined),
      safe(landformData.landDevelopment.otherWorks),
      safe(landformData.landDevelopment.pradanContribution),
      safe(landformData.landDevelopment.farmerContribution),
      safe(landformData.landDevelopment.totalEstimate),
      safe(today),
      safe(today)
    ]);

    console.log("form id:", form_id);

    // Insert bank details
    await connection.execute(postLandformData_bankdetails_sql, [
      safe(form_id),
      safe(landformData.bankDetails.accountHolderName),
      safe(landformData.bankDetails.accountNumber),
      safe(landformData.bankDetails.bankName),
      safe(landformData.bankDetails.branch),
      safe(landformData.bankDetails.ifscCode),
      safe(landformData.bankDetails.farmerAgreed),
    ]);

    // Optional: Insert files if present
    // if (landformData.files) {
    //   await connection.execute(postLandformData_files_sql, [
    //     safe(form_id),
    //     safe(landformData.files.identity),
    //     safe(landformData.files.geotag),
    //     safe(landformData.files.patta),
    //     safe(landformData.files.fmb),
    //     safe(landformData.files.photo),
    //     safe(landformData.files.passbook),
    //   ]);
    // }

    // Commit transaction
    await connection.commit();
    res.status(201).json({ message: "Form data submitted successfully", form_id });

  } catch (error) {
    await connection.rollback();
    console.error("Error during transaction:", error);
    res.status(500).json({ error: "Failed to submit form data" });
  } finally {
    connection.release(); // Always release
  }
});

