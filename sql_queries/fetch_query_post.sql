\\land form



const query = `
  SELECT 
    forms.farmer_name,
    forms.spouse,
    forms.mcode,
    forms.hamlet,
    forms.panchayat,
    form_lands.revenue,
    forms.district,
    forms.block,
    form_lands.p_contribution,
    form_lands.f_contribution,
    files.passbook_postfunding,
    form_lands.verified_by,
    form_lands.total_area
  FROM 
    forms
  JOIN 
    form_lands ON forms.id = form_lands.form_id
  JOIN 
    files ON forms.id = files.form_id
  WHERE 
    forms.form_type = 1
    AND forms.farmer_name = ?
`;



\\plantation_form


const query = `
  SELECT 
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
  JOIN 
    plantation_details ON forms.id = plantation_details.form_id
  JOIN 
    files ON forms.id = files.form_id
  WHERE 
    forms.form_type = 3
    AND forms.farmer_name = ?
`;


\\farm_pond

const query = `
  SELECT 
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
  JOIN 
    farm_pond_details ON forms.id = farm_pond_details.form_id
  JOIN 
    files ON forms.id = files.form_id
  WHERE 
    forms.form_type = 2
    AND forms.farmer_name = ?
`;
