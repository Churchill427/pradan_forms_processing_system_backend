const authUser_sql = `
    SELECT 
      CASE 
        WHEN EXISTS (
          SELECT * FROM users WHERE email = ? AND password = ?
        )
        THEN '1'
        ELSE '0'
      END AS login_success
  `;