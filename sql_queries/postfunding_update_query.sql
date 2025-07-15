//form_lands



const updateQuery = `
  UPDATE form_lands
  LEFT JOIN forms ON form_lands.form_id = forms.id
  LEFT JOIN files ON forms.id = files.form_id
  SET 
    form_lands.p_contribution = ?,
    form_lands.f_contribution = ?,
    form_lands.total_est = ?,
    form_lands.measured_by = ?,
    form_lands.total_area = ?,
    files.passbook_postfunding = ?
  WHERE 
    form_lands.form_id = ?
    AND forms.form_type = 1
`;

//farm_pond_details

const updateQuery = `
  UPDATE farm_pond_details
  LEFT JOIN forms ON farm_pond_details.form_id = forms.id
  LEFT JOIN files ON forms.id = files.form_id
  SET 
    farm_pond_details.p_contribution = ?,
    farm_pond_details.f_contribution = ?,
    farm_pond_details.total_est = ?,
    farm_pond_details.measured_by = ?,
    farm_pond_details.len_pf = ?,
    farm_pond_details.bre_pf = ?,
    farm_pond_details.dep_pf = ?,
    farm_pond_details.vol_pf = ?,
    files.passbook_postfunding = ?
  WHERE 
    farm_pond_details.form_id = ?
    AND forms.form_type = 2
`;


//plantation_form


const updateQuery = `
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
    AND forms.form_type = 3
`;