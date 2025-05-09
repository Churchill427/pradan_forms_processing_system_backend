const mysql = require('mysql2');

// Create a connection to your database
const connection = mysql.createConnection({
  host: 'your_host',
  user: 'your_user',
  password: 'your_password',
  database: 'your_database'
});

// Prepare your query
const query = `
  SELECT
    -- Forms Table
    forms.id AS form_id,
    forms.user_id,
    forms.form_type,
    forms.farmer_name,
    forms.age,
    forms.mobile AS form_mobile,
    forms.district,
    forms.block,
    forms.panchayat,
    forms.hamlet,
    forms.id_type,
    forms.id_number,
    forms.gender,
    forms.spouse,
    forms.type_of_households,
    forms.h_members,
    forms.hh_occupation,
    forms.special_catog,
    forms.caste,
    forms.house_owner,
    forms.type_of_house,
    forms.drinking_water,
    forms.potability,
    forms.domestic_water,
    forms.toilet_avail,
    forms.toilet_cond,
    forms.household_education,
    forms.created_at,
    forms.lat,
    forms.lon,
    forms.mcode,
    forms.status,

    -- Users Table (Corrected alias usage)
    u.id AS user_id,
    u.name AS user_name,
    u.email AS user_email,
    u.password AS user_password,
    u.role AS user_role,
    u.mobile AS user_mobile,
    u.date_of_joining AS user_date_of_joining,
    u.location AS user_location,
    u.photo AS user_photo,

    -- Files Table
    files.id AS file_id,
    files.form_id AS file_form_id,
    files.identity,
    files.geotag,
    files.patta,
    files.fmb,
    files.photo AS file_photo,
    files.passbook,
    files.passbook_postfunding,

    -- Bank Details Table
    bank_details.id AS bank_detail_id,
    bank_details.form_id AS bank_form_id,
    bank_details.account_holder_name,
    bank_details.account_number,
    bank_details.bank_name,
    bank_details.branch,
    bank_details.ifsc_code,
    bank_details.farmer_ack,

    -- Form Lands Table (conditional fields for form_type = 1)
    CASE WHEN forms.form_type = 1 THEN form_lands.ownership END AS form_land_ownership,
    CASE WHEN forms.form_type = 1 THEN form_lands.well_irrigation END AS form_land_well_irrigation,
    CASE WHEN forms.form_type = 1 THEN form_lands.area_irrigated END AS form_land_area_irrigated,
    CASE WHEN forms.form_type = 1 THEN form_lands.irrigated_lands END AS form_land_irrigated_lands,
    CASE WHEN forms.form_type = 1 THEN form_lands.patta END AS form_land_patta,
    CASE WHEN forms.form_type = 1 THEN form_lands.total_area END AS form_land_total_area,
    CASE WHEN forms.form_type = 1 THEN form_lands.taluk END AS form_land_taluk,
    CASE WHEN forms.form_type = 1 THEN form_lands.firka END AS form_land_firka,
    CASE WHEN forms.form_type = 1 THEN form_lands.revenue END AS form_land_revenue,
    CASE WHEN forms.form_type = 1 THEN form_lands.crop_season END AS form_land_crop_season,
    CASE WHEN forms.form_type = 1 THEN form_lands.livestocks END AS form_land_livestocks,
    CASE WHEN forms.form_type = 1 THEN form_lands.sf_number END AS form_land_sf_number,
    CASE WHEN forms.form_type = 1 THEN form_lands.soil_type END AS form_land_soil_type,
    CASE WHEN forms.form_type = 1 THEN form_lands.land_to_benefit END AS form_land_land_to_benefit,
    CASE WHEN forms.form_type = 1 THEN form_lands.date_of_ins END AS form_land_date_of_ins,
    CASE WHEN forms.form_type = 1 THEN form_lands.area_benefited END AS form_land_area_benefited,
    CASE WHEN forms.form_type = 1 THEN form_lands.type_of_work END AS form_land_type_of_work,
    CASE WHEN forms.form_type = 1 THEN form_lands.any_other_works END AS form_land_any_other_works,
    CASE WHEN forms.form_type = 1 THEN form_lands.p_contribution END AS form_land_p_contribution,
    CASE WHEN forms.form_type = 1 THEN form_lands.f_contribution END AS form_land_f_contribution,
    CASE WHEN forms.form_type = 1 THEN form_lands.total_est END AS form_land_total_est,
    CASE WHEN forms.form_type = 1 THEN form_lands.field_insp END AS form_land_field_insp,
    CASE WHEN forms.form_type = 1 THEN form_lands.site_app END AS form_land_site_app,
    CASE WHEN forms.form_type = 1 THEN form_lands.date_of_app END AS form_land_date_of_app,
    CASE WHEN forms.form_type = 1 THEN form_lands.area_benefited_postfunding END AS form_land_area_benefited_postfunding,
    CASE WHEN forms.form_type = 1 THEN form_lands.verified_by END AS form_land_verified_by,

    -- Farm Pond Details Table (conditional fields for form_type = 2)
    CASE WHEN forms.form_type = 2 THEN farm_pond_details.ownership END AS farm_pond_ownership,
    CASE WHEN forms.form_type = 2 THEN farm_pond_details.well_irrigation END AS farm_pond_well_irrigation,
    CASE WHEN forms.form_type = 2 THEN farm_pond_details.area_irrigated END AS farm_pond_area_irrigated,
    CASE WHEN forms.form_type = 2 THEN farm_pond_details.irrigated_lands END AS farm_pond_irrigated_lands,
    CASE WHEN forms.form_type = 2 THEN farm_pond_details.patta END AS farm_pond_patta,
    CASE WHEN forms.form_type = 2 THEN farm_pond_details.total_area END AS farm_pond_total_area,
    CASE WHEN forms.form_type = 2 THEN farm_pond_details.taluk END AS farm_pond_taluk,
    CASE WHEN forms.form_type = 2 THEN farm_pond_details.firka END AS farm_pond_firka,
    CASE WHEN forms.form_type = 2 THEN farm_pond_details.revenue END AS farm_pond_revenue,
    CASE WHEN forms.form_type = 2 THEN farm_pond_details.crop_season END AS farm_pond_crop_season,
    CASE WHEN forms.form_type = 2 THEN farm_pond_details.livestocks END AS farm_pond_livestocks,
    CASE WHEN forms.form_type = 2 THEN farm_pond_details.sf_number END AS farm_pond_sf_number,
    CASE WHEN forms.form_type = 2 THEN farm_pond_details.soil_type END AS farm_pond_soil_type,
    CASE WHEN forms.form_type = 2 THEN farm_pond_details.land_to_benefit END AS farm_pond_land_to_benefit,
    CASE WHEN forms.form_type = 2 THEN farm_pond_details.date_of_ins END AS farm_pond_date_of_ins,
    CASE WHEN forms.form_type = 2 THEN farm_pond_details.length END AS farm_pond_length,
    CASE WHEN forms.form_type = 2 THEN farm_pond_details.breadth END AS farm_pond_breadth,
    CASE WHEN forms.form_type = 2 THEN farm_pond_details.depth END AS farm_pond_depth,
    CASE WHEN forms.form_type = 2 THEN farm_pond_details.volume END AS farm_pond_volume,
    CASE WHEN forms.form_type = 2 THEN farm_pond_details.p_contribution END AS farm_pond_p_contribution,
    CASE WHEN forms.form_type = 2 THEN farm_pond_details.f_contribution END AS farm_pond_f_contribution,
    CASE WHEN forms.form_type = 2 THEN farm_pond_details.total_est END AS farm_pond_total_est,
    CASE WHEN forms.form_type = 2 THEN farm_pond_details.area_benefited END AS farm_pond_area_benefited,
    CASE WHEN forms.form_type = 2 THEN farm_pond_details.field_insp END AS farm_pond_field_insp,
    CASE WHEN forms.form_type = 2 THEN farm_pond_details.site_app END AS farm_pond_site_app,
    CASE WHEN forms.form_type = 2 THEN farm_pond_details.date_of_app END AS farm_pond_date_of_app,
    CASE WHEN forms.form_type = 2 THEN farm_pond_details.len_pf END AS farm_pond_len_pf,
    CASE WHEN forms.form_type = 2 THEN farm_pond_details.bre_pf END AS farm_pond_bre_pf,
    CASE WHEN forms.form_type = 2 THEN farm_pond_details.dep_pf END AS farm_pond_dep_pf,
    CASE WHEN forms.form_type = 2 THEN farm_pond_details.vol_pf END AS farm_pond_vol_pf,
    CASE WHEN forms.form_type = 2 THEN farm_pond_details.area_benefited_postfunding END AS farm_pond_area_benefited_postfunding,
    CASE WHEN forms.form_type = 2 THEN farm_pond_details.verified_by END AS farm_pond_verified_by,

    CASE WHEN forms.form_type = 3 THEN plantation_details.ownership END AS plantation_ownership,
    CASE WHEN forms.form_type = 3 THEN plantation_details.well_irrigation END AS plantation_well_irrigation,
    CASE WHEN forms.form_type = 3 THEN plantation_details.area_irrigated END AS plantation_area_irrigated,
    CASE WHEN forms.form_type = 3 THEN plantation_details.irrigated_lands END AS plantation_irrigated_lands,
    CASE WHEN forms.form_type = 3 THEN plantation_details.patta END AS plantation_patta,
    CASE WHEN forms.form_type = 3 THEN plantation_details.total_area END AS plantation_total_area,
    CASE WHEN forms.form_type = 3 THEN plantation_details.taluk END AS plantation_taluk,
    CASE WHEN forms.form_type = 3 THEN plantation_details.firka END AS plantation_firka,
    CASE WHEN forms.form_type = 3 THEN plantation_details.revenue END AS plantation_revenue,
    CASE WHEN forms.form_type = 3 THEN plantation_details.crop_season END AS plantation_crop_season,
    CASE WHEN forms.form_type = 3 THEN plantation_details.livestocks END AS plantation_livestocks,
    CASE WHEN forms.form_type = 3 THEN plantation_details.sf_number END AS plantation_sf_number,
    CASE WHEN forms.form_type = 3 THEN plantation_details.soil_type END AS plantation_soil_type,
    CASE WHEN forms.form_type = 3 THEN plantation_details.land_to_benefit END AS plantation_land_to_benefit,
    CASE WHEN forms.form_type = 3 THEN plantation_details.date_of_ins END AS plantation_date_of_ins,
    CASE WHEN forms.form_type = 3 THEN plantation_details.area_benefited_by_proposal END AS plantation_area_benefited_by_proposal,
    CASE WHEN forms.form_type = 3 THEN plantation_details.any_other_works END AS plantation_any_other_works,
    CASE WHEN forms.form_type = 3 THEN plantation_details.p_contribution END AS plantation_p_contribution,
    CASE WHEN forms.form_type = 3 THEN plantation_details.f_contribution END AS plantation_f_contribution,
    CASE WHEN forms.form_type = 3 THEN plantation_details.total_est END AS plantation_total_est,
    CASE WHEN forms.form_type = 3 THEN plantation_details.field_insp END AS plantation_field_insp,
    CASE WHEN forms.form_type = 3 THEN plantation_details.site_app END AS plantation_site_app,
    CASE WHEN forms.form_type = 3 THEN plantation_details.date_of_app END AS plantation_date_of_app,
    CASE WHEN forms.form_type = 3 THEN plantation_details.plantaions END AS plantation_plantaions,
    CASE WHEN forms.form_type = 3 THEN plantation_details.nos END AS plantation_nos,
    CASE WHEN forms.form_type = 3 THEN plantation_details.price END AS plantation_price,
    CASE WHEN forms.form_type = 3 THEN plantation_details.other_exp END AS plantation_other_exp,
    CASE WHEN forms.form_type = 3 THEN plantation_details.tot_nos END AS plantation_tot_nos,
    CASE WHEN forms.form_type = 3 THEN plantation_details.tot_price END AS plantation_tot_price,
    CASE WHEN forms.form_type = 3 THEN plantation_details.verified_by END AS plantation_verified_by
  FROM forms
    LEFT JOIN users AS u ON u.id = forms.user_id
    LEFT JOIN files ON files.form_id = forms.id
    LEFT JOIN bank_details ON bank_details.form_id = forms.id
    LEFT JOIN form_lands ON form_lands.form_id = forms.id
    LEFT JOIN farm_pond_details ON farm_pond_details.form_id = forms.id
    LEFT JOIN plantation_details ON plantation_details.form_id = forms.id
    WHERE forms.user_id = ?;
    `;

// Execute the query using MySQL2's query method
connection.execute(query, [userId], (err, results) => {
if (err) {
console.error(err);
return;
}

console.log(results);
});

// Close the connection
connection.end();
