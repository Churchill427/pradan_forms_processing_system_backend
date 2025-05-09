const [rows] = await connection.execute(
    `SELECT 
        forms.id, 
        forms.form_type, 
        forms.farmer_name, 
        forms.created_at, 
        forms.status,
        forms.gender,
        forms.block,
        forms.hamlet,
        forms.panchayat
     FROM 
        forms
     WHERE 
        forms.user_id = ?`,
    [userId]
  );