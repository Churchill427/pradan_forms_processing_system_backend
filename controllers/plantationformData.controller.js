//const mysql = require("mysql2/promise");
const db = require("../configs/mysql_config");
const asyncHandler = require("../middlewares/asyncHandler");

const postPlantationformData_basicdetails_sql = `INSERT INTO forms (
  farmer_name, age, mobile, district, block, panchayat, hamlet,
  id_type, id_number, gender, spouse, type_of_households, h_members,
  hh_occupation, special_catog, caste, house_owner, type_of_house,
  drinking_water, potability, domestic_water, toilet_avail, toilet_cond,
  household_education, user_id, created_at, lat, lon, status, form_type
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

const postPlantationformData_plantation_details_sql = `INSERT INTO plantation_details (
  form_id, ownership, well_irrigation, area_irrigated, irrigated_lands,
  patta, total_area, taluk, firka, revenue, crop_season, livestocks,
  sf_number, soil_type, land_to_benefit, date_of_ins,
  area_benefited_by_proposal, any_other_works, p_contribution, f_contribution,
  total_est, field_insp, date_of_app, plantaions
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

const postPlantationformData_bankdetails_sql = `INSERT INTO bank_details (
  form_id, account_holder_name, account_number, bank_name,
  branch, ifsc_code, farmer_ack
) VALUES (?, ?, ?, ?, ?, ?, ?)`;

const postLandformData_files_sql = `INSERT INTO files (
  form_id, identity, geotag, patta, fmb, photo, passbook
) VALUES (?, ?, ?, ?, ?, ?, ?)`;

exports.postPlantationformData = asyncHandler(async (req, res) => {
  const connection = await db.getConnection();
  await connection.beginTransaction(); // 🚀 Start transaction

  try {
    const plantationformData = req.body;
    const date = new Date();
    const today = new Date(date.getFullYear(), date.getMonth(), date.getDate()).toLocaleDateString('en-CA');
    console.log("Received landform data:", plantationformData);

    const safe = (value) => value === undefined ? null : value;

    // Insert basic details
    const [formResult] = await connection.execute(postPlantationformData_basicdetails_sql, [
      safe(plantationformData.basicDetails.name),
      safe(plantationformData.basicDetails.age),
      safe(plantationformData.basicDetails.mobile),
      safe(plantationformData.basicDetails.district),
      safe(plantationformData.basicDetails.block),
      safe(plantationformData.basicDetails.panchayat),
      safe(plantationformData.basicDetails.hamlet),
      safe(plantationformData.basicDetails.idCardType),
      safe(plantationformData.basicDetails.idCardNumber),
      safe(plantationformData.basicDetails.gender),
      safe(plantationformData.basicDetails.fatherSpouse),
      safe(plantationformData.basicDetails.householdType),
      safe(plantationformData.basicDetails.hhcombined),
      safe(plantationformData.basicDetails.occupationCombined),
      safe(plantationformData.basicDetails.specialCategoryNumber),
      safe(plantationformData.basicDetails.caste),
      safe(plantationformData.basicDetails.houseOwnership),
      safe(plantationformData.basicDetails.houseType),
      safe(plantationformData.basicDetails.drinkingWaterCombined),
      safe(plantationformData.basicDetails.potabilityCombined),
      safe(plantationformData.basicDetails.domesticWaterCombined),
      safe(plantationformData.basicDetails.toiletAvailability),
      safe(plantationformData.basicDetails.toiletCondition),
      safe(plantationformData.basicDetails.education),
      safe(plantationformData.user_id),
      safe(today),
      safe(plantationformData.landDevelopment.latitude),
      safe(plantationformData.landDevelopment.longitude),
      1,
      3
    ]);

    const form_id = formResult.insertId;
    console.log("Form ID:", form_id);

    //console.log(plantationformData.landDevelopment.workType);

    // Insert plantation details
    await connection.execute(postPlantationformData_plantation_details_sql, [
      safe(form_id),
      safe(plantationformData.landOwnership.landOwnershipType),
      safe(plantationformData.landOwnership.hasWell),
      safe(plantationformData.landOwnership.areaIrrigated),
      safe(plantationformData.landOwnership.irrigatedLandCombined),
      safe(plantationformData.landOwnership.pattaNumber),
      safe(plantationformData.landOwnership.totalArea),
      safe(plantationformData.landOwnership.taluk),
      safe(plantationformData.landOwnership.firka),
      safe(plantationformData.landOwnership.revenueVillage),
      safe(plantationformData.landOwnership.cropSeason),
      safe(plantationformData.landOwnership.livestockCombined),
      safe(plantationformData.landDevelopment.sfNumber),
      safe(plantationformData.landDevelopment.soilTypeCombined),
      safe(plantationformData.landDevelopment.landBenefit),
      safe(today),
      safe(plantationformData.landDevelopment.proposalArea),
      safe(plantationformData.landDevelopment.otherWorks),
      safe(plantationformData.landDevelopment.pradanContribution),
      safe(plantationformData.landDevelopment.farmerContribution),
      safe(plantationformData.landDevelopment.totalEstimate),
      safe(today),
      safe(today),
      safe(plantationformData.landDevelopment.workType2)
    ]);

    //console.log("form id:", form_id);

    // Insert bank details
    await connection.execute(postPlantationformData_bankdetails_sql, [
      safe(form_id),
      safe(plantationformData.bankDetails.accountHolderName),
      safe(plantationformData.bankDetails.accountNumber),
      safe(plantationformData.bankDetails.bankName),
      safe(plantationformData.bankDetails.branch),
      safe(plantationformData.bankDetails.ifscCode),
      safe(plantationformData.bankDetails.farmerAgreed),
    ]);

    // Optional: Insert files if present
    // if (plantationformData.files) {
    //   await connection.execute(postLandformData_files_sql, [
    //     safe(form_id),
    //     safe(plantationformData.files.identity),
    //     safe(plantationformData.files.geotag),
    //     safe(plantationformData.files.patta),
    //     safe(plantationformData.files.fmb),
    //     safe(plantationformData.files.photo),
    //     safe(plantationformData.files.passbook),
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

