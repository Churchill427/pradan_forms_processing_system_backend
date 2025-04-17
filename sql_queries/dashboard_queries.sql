 // Query 1: Grouped status counts by user_id
    'SELECT status, COUNT(*) AS count FROM forms WHERE user_id = ? GROUP BY status',
  

  // Query 2: Total count
    'SELECT COUNT(*) AS total_count FROM forms WHERE user_id = ?',
 
