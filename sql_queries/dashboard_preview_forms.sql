const [rows] = await connection.execute(
    'SELECT id, form_type, farmer_name, created_at, status FROM forms WHERE user_id = ?',
    [userId]
  );