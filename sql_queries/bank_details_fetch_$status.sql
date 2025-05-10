const query = `
  SELECT
    bank_details.account_holder_name AS accountHolderName,
    bank_details.account_number AS accountNumber,
    bank_details.bank_name AS bankName,
    bank_details.branch,
    bank_details.ifsc_code AS ifscCode,
    bank_details.farmer_ack AS farmerAgreed,
    forms.status AS formStatus
  FROM bank_details
  JOIN forms ON bank_details.form_id = forms.id
  WHERE bank_details.id = ?
`;