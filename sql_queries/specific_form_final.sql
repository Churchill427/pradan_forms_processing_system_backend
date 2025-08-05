const [rows] = await connection.execute(`
    SELECT
      forms.id AS form_id,
      forms.farmer_name as name,
      forms.age,
      forms.mobile,
      forms.district,
      forms.block,
      forms.panchayat,
      forms.hamlet,
      forms.id_type as idCardType,
      forms.id_number as IdCardNumber,
      forms.gender,
      forms.spouse as fatherSpouse,
      forms.type_of_households as householdType,
      forms.h_members as hhcombined,
      forms.hh_occupation as occupationCombined,
      forms.special_catog as specialCategoryNumber,
      forms.caste,
      forms.house_owner as houseOwnership,
      forms.type_of_house as houseType,
      forms.drinking_water as drinkingWaterCombined,
      forms.potability as potabilityCombined,
      forms.domestic_water as domesticWaterCombined,
      forms.toilet_avail as toiletAvailability,
      forms.toilet_cond as toiletCondition,
      forms.household_education as education
    FROM forms 
    WHERE id = ?
  `, [1]);




  const [rows] = await connection.execute(`
    SELECT
      form_lands.ownership AS landOwnershipType,
      form_lands.well_irrigation AS hasWell,
      form_lands.area_irrigated AS areaIrrigated,
      form_lands.irrigated_lands AS irrigatedLandCombined,
      form_lands.patta AS pattaNumber,
      form_lands.total_area AS totalArea,
      form_lands.taluk,
      form_lands.firka,
      form_lands.revenue AS revenueVillage,
      form_lands.crop_season AS cropSeasonCombined,
      form_lands.livestocks AS livestockCombined
    FROM form_lands
    WHERE id = ?
  `, [1]);




const [rows] = await connection.execute(`
          SELECT 
        bank_details.account_holder_name AS accountHolderName,
          bank_details.bank_name AS bankName,
          bank_details.branch,
          bank_details.ifsc_code AS ifscCode,
          bank_details.farmer_ack AS farmerAgreed
      FROM bank_details
      JOIN forms ON bank_details.form_id = forms.id WHERE forms.id = ?`, [1]);




 const [rows] = await connection.execute(`
    SELECT 
      forms.created_at AS date,
      forms.lat AS latitude,
      forms.lon AS longitude,
      form_lands.sf_number AS sfNumber,
      form_lands.soil_type AS soilTypeCombined,
      form_lands.land_to_benefit AS landBenefit,
      form_lands.area_benefited AS proposalArea,
      form_lands.type_of_work AS workType,
      form_lands.any_other_works AS otherWorks,
      form_lands.p_contribution AS pradanContribution,
      form_lands.f_contribution AS farmerContribution,
      form_lands.total_est AS totalEstimate
    FROM forms
    INNER JOIN form_lands ON forms.id = form_lands.form_id
    WHERE forms.id = ? AND forms.form_type = ?
  `, [1, 1]);




const [rows] = await connection.execute(`
    SELECT 
      forms.created_at AS date,
      forms.lat AS latitude,
      forms.lon AS longitude,
      farm_pond_details.sf_number AS sfNumber,
      farm_pond_details.soil_type AS soilTypeCombined,
      farm_pond_details.land_to_benefit AS landBenefit,
      farm_pond_details.area_benefited AS proposalArea,
      farm_pond_details.length,
      farm_pond_details.breadth,
      farm_pond_details.depth,
      farm_pond_details.volume,
      farm_pond_details.p_contribution AS pradanContribution,
      farm_pond_details.f_contribution AS farmerContribution,
      farm_pond_details.total_est AS totalEstimate
    FROM forms
    INNER JOIN farm_pond_details ON forms.id = farm_pond_details.form_id
    WHERE forms.id = ? AND forms.form_type = ?
  `, [2, 2]);




  
 const [rows] = await connection.execute(`
    SELECT 
      forms.created_at AS date,
      forms.lat AS latitude,
      forms.lon AS longitude,
      plantation_details.sf_number AS sfNumber,
      plantation_details.soil_type AS soilTypeCombined,
      plantation_details.land_to_benefit AS landBenefit,
      plantation_details.area_benefited_by_proposal AS proposalArea,
      plantation_details.plantaions AS workType2,
      plantation_details.any_other_works AS otherWorks,
      plantation_details.p_contribution AS pradanContribution,
      plantation_details.f_contribution AS farmerContribution,
      plantation_details.total_est AS totalEstimate
    FROM forms
    INNER JOIN plantation_details ON forms.id = plantation_details.form_id
    WHERE forms.id = ? AND forms.form_type = ?
  `, [3, 3]);  
