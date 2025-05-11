//const mysql = require("mysql2/promise");
const db = require("../configs/mysql_config");
const asyncHandler = require("../middlewares/asyncHandler");

const postPondformData_basicdetails_sql = `INSERT INTO forms (
  farmer_name, age, mobile, district, block, panchayat, hamlet,
  id_type, id_number, gender, spouse, type_of_households, h_members,
  hh_occupation, special_catog, caste, house_owner, type_of_house,
  drinking_water, potability, domestic_water, toilet_avail, toilet_cond,
  household_education, user_id, created_at, lat, lon, status, form_type
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

const postPondformData_farm_pond_details_sql = `INSERT INTO farm_pond_details (
        form_id, ownership, well_irrigation, area_irrigated, irrigated_lands,
        patta, total_area, taluk, firka, revenue, crop_season, livestocks,
        sf_number, soil_type, land_to_benefit, date_of_ins, length, breadth,
        depth, volume, p_contribution, f_contribution, total_est, area_benefited,
        field_insp
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

const postLandformData_bankdetails_sql = `INSERT INTO bank_details (
  form_id, account_holder_name, account_number, bank_name,
  branch, ifsc_code, farmer_ack
) VALUES (?, ?, ?, ?, ?, ?, ?)`;

const postLandformData_files_sql = `INSERT INTO files (
  form_id, identity, geotag, patta, fmb, photo, passbook
) VALUES (?, ?, ?, ?, ?, ?, ?)`;

exports.postPondformData = asyncHandler(async (req, res) => {
  const connection = await db.getConnection();
  await connection.beginTransaction(); // 🚀 Start transaction

  try {
    const pondformData = req.body;
    const date = new Date();
    const today = new Date(date.getFullYear(), date.getMonth(), date.getDate()).toLocaleDateString('en-CA');
   // console.log("Received landform data:", pondformData);

    const safe = (value) => value === undefined ? null : value;

    // Insert basic details
    const [formResult] = await connection.execute(postPondformData_basicdetails_sql, [
      safe(pondformData.basicDetails.name),
      safe(pondformData.basicDetails.age),
      safe(pondformData.basicDetails.mobile),
      safe(pondformData.basicDetails.district),
      safe(pondformData.basicDetails.block),
      safe(pondformData.basicDetails.panchayat),
      safe(pondformData.basicDetails.hamlet),
      safe(pondformData.basicDetails.idCardType),
      safe(pondformData.basicDetails.idCardNumber),
      safe(pondformData.basicDetails.gender),
      safe(pondformData.basicDetails.fatherSpouse),
      safe(pondformData.basicDetails.householdType),
      safe(pondformData.basicDetails.hhcombined),
      safe(pondformData.basicDetails.occupationCombined),
      safe(pondformData.basicDetails.specialCategoryNumber),
      safe(pondformData.basicDetails.caste),
      safe(pondformData.basicDetails.houseOwnership),
      safe(pondformData.basicDetails.houseType),
      safe(pondformData.basicDetails.drinkingWaterCombined),
      safe(pondformData.basicDetails.potabilityCombined),
      safe(pondformData.basicDetails.domesticWaterCombined),
      safe(pondformData.basicDetails.toiletAvailability),
      safe(pondformData.basicDetails.toiletCondition),
      safe(pondformData.basicDetails.education),
      safe(pondformData.user_id),
      safe(pondformData.landDevelopment.date),
      safe(pondformData.landDevelopment.latitude),
      safe(pondformData.landDevelopment.longitude),
      1,
      2
    ]);

    const form_id = formResult.insertId;
    console.log("Form ID:", form_id);

    // Insert farm pond details
    await connection.execute(postPondformData_farm_pond_details_sql, [
      safe(form_id),
      safe(pondformData.landOwnership.landOwnershipType),
      safe(pondformData.landOwnership.hasWell),
      safe(pondformData.landOwnership.areaIrrigated),
      safe(pondformData.landOwnership.irrigatedLandCombined),
      safe(pondformData.landOwnership.pattaNumber),
      safe(pondformData.landOwnership.totalArea),
      safe(pondformData.landOwnership.taluk),
      safe(pondformData.landOwnership.firka),
      safe(pondformData.landOwnership.revenueVillage),
      safe(pondformData.landOwnership.cropSeasonCombined),
      safe(pondformData.landOwnership.livestockCombined),
      safe(pondformData.landDevelopment.sfNumber),
      safe(pondformData.landDevelopment.soilTypeCombined),
      safe(pondformData.landDevelopment.landBenefit),
      safe(pondformData.landDevelopment.date),
      safe(pondformData.landDevelopment.length),
      safe(pondformData.landDevelopment.breadth),
      safe(pondformData.landDevelopment.depth),
      safe(pondformData.landDevelopment.volume),
      safe(pondformData.landDevelopment.pradanContribution),
      safe(pondformData.landDevelopment.farmerContribution),
      safe(pondformData.landDevelopment.totalEstimate),
      safe(pondformData.landDevelopment.landBenefit),
      safe(pondformData.user_id)
    ]);

    //console.log("form id:", form_id);

    // Insert bank details
    await connection.execute(postLandformData_bankdetails_sql, [
      safe(form_id),
      safe(pondformData.bankDetails.accountHolderName),
      safe(pondformData.bankDetails.accountNumber),
      safe(pondformData.bankDetails.bankName),
      safe(pondformData.bankDetails.branch),
      safe(pondformData.bankDetails.ifscCode),
      safe(pondformData.bankDetails.farmerAgreed),
    ]);
    console.log(pondformData.bankDetails.submittedFiles.patta.name);
    // Optional: Insert files if present
    if (pondformData.bankDetails.submittedFiles) {
      await connection.execute(postLandformData_files_sql, [
        safe(form_id),
        safe(pondformData.bankDetails.submittedFiles.idCard.name),
        safe(pondformData.bankDetails.submittedFiles.geoTag.name),
        safe(pondformData.bankDetails.submittedFiles.patta.name),
        safe(pondformData.bankDetails.submittedFiles.fmb.name),
        safe(pondformData.bankDetails.submittedFiles.farmerPhoto.name),
        safe(pondformData.bankDetails.submittedFiles.bankPassbook.name)
      ]);
    }

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

