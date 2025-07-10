//const mysql = require("mysql2/promise");
const db = require("../configs/mysql_config");
const asyncHandler = require("../middlewares/asyncHandler");

//Post landform data

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
  total_est, date_of_ins, field_insp
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

const postLandformData_bankdetails_sql = `INSERT INTO bank_details (
  form_id, account_holder_name, account_number, bank_name,
  branch, ifsc_code, farmer_ack
) VALUES (?, ?, ?, ?, ?, ?, ?)`;

const postLandformData_submittedFiles_sql = `INSERT INTO files (
  form_id, identity, geotag, patta, fmb, photo, passbook
) VALUES (?, ?, ?, ?, ?, ?, ?)`;

exports.postLandformData = asyncHandler(async (req, res) => {
  const connection = await db.getConnection();
  await connection.beginTransaction(); // 🚀 Start transaction

  try {
    console.log("Inserting...");
    const landformData = req.body;
    const date = new Date();
    const today = new Date(date.getFullYear(), date.getMonth(), date.getDate()).toLocaleDateString('en-CA');
    //console.log("Received landform data:", landformData);

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
      safe(landformData.user_id),
      safe(landformData.landDevelopment.date),
      safe(landformData.landDevelopment.latitude),
      safe(landformData.landDevelopment.longitude),
      1,
      1
    ]);

    const form_id = formResult.insertId;
    //console.log("Form ID:", form_id);

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
      safe(landformData.landDevelopment.workType),
      safe(landformData.landDevelopment.otherWorks),
      safe(landformData.landDevelopment.pradanContribution),
      safe(landformData.landDevelopment.farmerContribution),
      safe(landformData.landDevelopment.totalEstimate),
      safe(landformData.landDevelopment.date),
      safe(landformData.user_id)
    ]);

    //console.log("form id:", form_id);

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
    // console.log("1",landformData);
    // console.log("2",landformData?.bankDetails);
    // console.log("3",landformData?.bankDetails?.submittedFiles);
    // console.log("4",landformData?.bankDetails?.submittedFiles?.idCard);

    // console.log(landformData?.bankDetails?.submittedFiles?.idCard?.name);
    // Optional: Insert submittedFiles if present
    // if (landformData.bankDetails.submittedFiles) {
    //   await connection.execute(postLandformData_submittedFiles_sql, [
    //     safe(form_id),
    //     safe(landformData.bankDetails.submittedFiles.idCard.name),
    //     safe(landformData.bankDetails.submittedFiles.geoTag.name),
    //     safe(landformData.bankDetails.submittedFiles.patta.name),
    //     safe(landformData.bankDetails.submittedFiles.fmb.name),
    //     safe(landformData.bankDetails.submittedFiles.farmerPhoto.name),
    //     safe(landformData.bankDetails.submittedFiles.bankPassbook.name)
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

// Update landform data (files is not included)
const updateLandformData_sql = `
 UPDATE forms
  LEFT JOIN bank_details ON forms.id = bank_details.form_id
  LEFT JOIN files ON forms.id = files.form_id
  LEFT JOIN form_lands ON forms.id = form_lands.form_id 
  SET  
    forms.farmer_name = ?, 
    forms.age = ?, 
    forms.mobile = ?, 
    forms.district = ?, 
    forms.block = ?, 
    forms.panchayat = ?, 
    forms.hamlet = ?, 
    forms.id_type = ?, 
    forms.id_number = ?, 
    forms.gender = ?, 
    forms.spouse = ?, 
    forms.type_of_households = ?, 
    forms.h_members = ?, 
    forms.hh_occupation = ?, 
    forms.special_catog = ?, 
    forms.caste = ?, 
    forms.house_owner = ?, 
    forms.type_of_house = ?, 
    forms.drinking_water = ?, 
    forms.potability = ?, 
    forms.domestic_water = ?, 
    forms.toilet_avail = ?, 
    forms.toilet_cond = ?, 
    forms.household_education = ?, 
    forms.lat = ?, 
    forms.lon = ?,

    bank_details.account_holder_name = ?, 
    bank_details.account_number = ?, 
    bank_details.bank_name = ?, 
    bank_details.branch = ?, 
    bank_details.ifsc_code = ?, 
    bank_details.farmer_ack = ?, 

    form_lands.ownership = ?, 
    form_lands.well_irrigation = ?, 
    form_lands.area_irrigated = ?, 
    form_lands.irrigated_lands = ?, 
    form_lands.patta = ?, 
    form_lands.total_area = ?, 
    form_lands.taluk = ?, 
    form_lands.firka = ?, 
    form_lands.revenue = ?, 
    form_lands.crop_season = ?, 
    form_lands.livestocks = ?, 
    form_lands.sf_number = ?, 
    form_lands.soil_type = ?, 
    form_lands.land_to_benefit = ?,
    form_lands.area_benefited = ?, 
    form_lands.type_of_work = ?, 
    form_lands.any_other_works = ?, 
    form_lands.p_contribution = ?, 
    form_lands.f_contribution = ?, 
    form_lands.total_est = ? 
  WHERE 
    forms.form_type = 1
    AND forms.id = ?;
`;
exports.updateLandformData = asyncHandler(async (req, res) => {
  const connection = await db.getConnection();
  const landformData = req.body;
  //console.log(landformData);
  const safe = (value) => value === undefined ? null : value;
      console.log("Updating....");
      // console.log(landformData.basicDetails.name);
      // console.log(landformData.basicDetails.age);
      // console.log(landformData.basicDetails.mobile);
      // console.log(landformData.basicDetails.district);
      // console.log(landformData.basicDetails.block);
      // console.log(landformData.basicDetails.panchayat);
      // console.log(landformData.basicDetails.hamlet);
      // console.log(landformData.basicDetails.idCardType);
      // console.log(landformData.basicDetails.idCardNumber);
      // console.log(landformData.basicDetails.gender);
      // console.log(landformData.basicDetails.fatherSpouse);
      // console.log(landformData.basicDetails.householdType);
      // console.log(landformData.basicDetails.hhcombined);
      // console.log(landformData.basicDetails.occupationCombined);
      // console.log(landformData.basicDetails.specialCategoryNumber);
      // console.log(landformData.basicDetails.caste);
      // console.log(landformData.basicDetails.houseOwnership);
      // console.log(landformData.basicDetails.houseType);
      // console.log(landformData.basicDetails.drinkingWaterCombined);
      // console.log(landformData.basicDetails.potabilityCombined);
      // console.log(landformData.basicDetails.domesticWaterCombined);
      // console.log(landformData.basicDetails.toiletAvailability);
      // console.log(landformData.basicDetails.toiletCondition);
      // console.log(landformData.basicDetails.education);
      // console.log(landformData.landDevelopment.latitude);
      // console.log(landformData.landDevelopment.longitude);
      // console.log(landformData.bankDetails.accountHolderName);
      // console.log(landformData.bankDetails.accountNumber);
      // console.log(landformData.bankDetails.bankName);
      // console.log(landformData.bankDetails.branch);
      // console.log(landformData.bankDetails.ifscCode);
      // console.log(landformData.bankDetails.farmerAgreed);
      // // console.log(landformData.bankDetails.submittedFiles.idCard);
      // // console.log(landformData.bankDetails.submittedFiles.geoTag);
      // // console.log(landformData.bankDetails.submittedFiles.patta);
      // // console.log(landformData.bankDetails.submittedFiles.fmb);
      // // console.log(landformData.bankDetails.submittedFiles.farmerPhoto);
      // // console.log(landformData.bankDetails.submittedFiles.bankPassbook);
      // console.log(landformData.landOwnership.landOwnershipType);
      // console.log(landformData.landOwnership.hasWell);
      // console.log(landformData.landOwnership.areaIrrigated);
      // console.log(landformData.landOwnership.irrigatedLandCombined);
      // console.log(landformData.landOwnership.pattaNumber);
      // console.log(landformData.landOwnership.totalArea);
      // console.log(landformData.landOwnership.taluk);
      // console.log(landformData.landOwnership.firka);
      // console.log(landformData.landOwnership.revenueVillage);
      // console.log(landformData.landOwnership.cropSeasonCombined);
      // console.log(landformData.landOwnership.livestockCombined);
      // console.log(landformData.landDevelopment.sfNumber);
      // console.log(landformData.landDevelopment.soilTypeCombined);
      // console.log(landformData.landDevelopment.landBenefit);
      // console.log(landformData.landDevelopment.proposalArea);
      // console.log(landformData.landDevelopment.workType);
      // console.log(landformData.landDevelopment.otherWorks);
      // console.log(landformData.landDevelopment.pradanContribution);
      // console.log(landformData.landDevelopment.farmerContribution);

  try {
    const [results] = await connection.execute(updateLandformData_sql, [
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
      safe(landformData.landDevelopment.latitude),
      safe(landformData.landDevelopment.longitude),
      safe(landformData.bankDetails.accountHolderName),
      safe(landformData.bankDetails.accountNumber),
      safe(landformData.bankDetails.bankName),
      safe(landformData.bankDetails.branch),
      safe(landformData.bankDetails.ifscCode),
      safe(landformData.bankDetails.farmerAgreed),
      // safe(landformData.bankDetails.submittedFiles.idCard),
      // safe(landformData.bankDetails.submittedFiles.geoTag),
      // safe(landformData.bankDetails.submittedFiles.patta),
      // safe(landformData.bankDetails.submittedFiles.fmb),
      // safe(landformData.bankDetails.submittedFiles.farmerPhoto),
      // safe(landformData.bankDetails.submittedFiles.bankPassbook),
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
      safe(landformData.landDevelopment.workType),
      safe(landformData.landDevelopment.otherWorks),
      safe(landformData.landDevelopment.pradanContribution),
      safe(landformData.landDevelopment.farmerContribution),
      safe(landformData.landDevelopment.totalEstimate),
      safe(landformData.basicDetails.form_id)
    ]);
    console.log("Landform Query executed");
    if (results.affectedRows > 0) {
      res.status(200).json({ message: "Form data updated successfully" });
    }
    await connection.commit();
  } catch (err) {
    res.status(500).json({ error: err.message });
     await connection.rollback();
  }finally {
    connection.release();
  }
});