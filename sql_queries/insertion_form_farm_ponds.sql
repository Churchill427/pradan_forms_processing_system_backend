const mysql = require('mysql2/promise');

async function insertAllFormData() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your_password', // Add if needed
    database: 'your_db'
  });

  try {
    await connection.beginTransaction();

    // 1. Insert into forms
    const [formResult] = await connection.execute(
      `INSERT INTO forms (
        farmer_name, age, mobile, district, block, panchayat, hamlet,
        id_type, id_number, gender, spouse, type_of_households, h_members,
        hh_occupation, special_catog, caste, house_owner, type_of_house,
        drinking_water, potability, domestic_water, toilet_avail, toilet_cond,
        household_education, user_id, created_at, lat, lon, status, form_type
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [2, 'FARMER_NAME', 'AGE', 9876543210, 'DISTRICT', 'BLOCK', 'PANCHAYAT', 'HAMLET',
       'ID_TYPE', 'ID_NUMBER', 'GENDER', 'SPOUSE', 'HOUSEHOLD_TYPE', 5,
       'OCCUPATION', 'SPECIAL_CAT', 'CASTE', 'OWNER', 'HOUSE_TYPE',
       'DRINK_WATER', 'POTABILITY', 'DOMESTIC_WATER', 'TOILET_AVAIL', 'TOILET_COND',
       'EDUCATION', 1, '2025-04-16', 'LAT', 'LON', 'MCODE', 1]
    );

    const formId = formResult.insertId;

    // 2. Insert into bank_details
    await connection.execute(
      `INSERT INTO bank_details (
        form_id, account_holder_name, account_number, bank_name,
        branch, ifsc_code, farmer_ack
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [formId, 'ACCOUNT_HOLDER', 123456789012, 'BANK_NAME',
       'BRANCH_NAME', 'IFSC00001', 'ACKNOWLEDGED']
    );

    // 3. Insert into files
    await connection.execute(
      `INSERT INTO files (
        form_id, identity, geotag, patta, fmb, photo, passbook
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [formId, 'IDENTITY_DOC', 'GEOTAG_URL', 'PATTA_DOC', 'FMB_DOC', 'PHOTO_URL', 'PASSBOOK_DOC']
    );

    // 4. Insert into farm_pond_details
    await connection.execute(
      `INSERT INTO farm_pond_details (
        form_id, ownership, well_irrigation, area_irrigated, irrigated_lands,
        patta, total_area, taluk, firka, revenue, crop_season, livestocks,
        sf_number, soil_type, land_to_benefit, date_of_ins, length, breadth,
        depth, volume, p_contribution, f_contribution, total_est, area_benefited,
        field_insp, site_app, date_of_app
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [formId, 'OWNERSHIP', 'WELL_IRR', 'AREA_IRR', 'IRRIG_LAND',
       'PATTA', 'TOT_AREA', 'TALUK', 'FIRKA', 'REVENUE', 'CROP_SEASON', 'LIVESTOCKS',
       'SF_NO', 'SOIL', 'LAND_BENEFIT', 'DATE_INS', '10', '20',
       '5', '1000', 'P_CONTRI', 'F_CONTRI', 'EST_TOTAL', 'AREA_BENEFITED',
       'INSP', 'SITE_APP', 'APP_DATE', 'LEN_PF', 'BRE_PF', 'DEP_PF', 'VOL_PF',
       'AREA_BENEFITED_PF', 'VERIFIER']
    );

    await connection.commit();
    console.log("All data inserted successfully with form_id:", formId);
  } catch (err) {
    await connection.rollback();
    console.error("Transaction failed:", err);
  } finally {
    await connection.end();
  }
}
