const [rows] = await connection.execute(`
    SELECT 
      ownership AS landOwnershipType,
      well_irrigation AS hasWell,
      area_irrigated AS areaIrrigated,
      irrigated_lands AS irrigatedLandCombined,
      patta AS pattaNumber,
      total_area AS totalArea,
      taluk,
      firka,
      revenue AS revenueVillage,
      crop_season AS cropSeasonCombined,
      livestocks AS livestockCombined
    FROM farm_pond_details
    WHERE id = ?
  `, [2]);





  const [rows] = await connection.execute(`
    SELECT 
      ownership AS landOwnershipType,
      well_irrigation AS hasWell,
      area_irrigated AS areaIrrigated,
      irrigated_lands AS irrigatedLandCombined,
      patta AS pattaNumber,
      total_area AS totalArea,
      taluk,
      firka,
      revenue AS revenueVillage,
      crop_season AS cropSeasonCombined,
      livestocks AS livestockCombined
    FROM plantation_details
    WHERE id = ?
  `, [3]);