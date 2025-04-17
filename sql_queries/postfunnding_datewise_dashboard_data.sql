const query = `
  SELECT s.status, COUNT(f.status) AS count
  FROM (
    SELECT 1 AS status UNION ALL
    SELECT 2 UNION ALL
    SELECT 3 UNION ALL
    SELECT 4 UNION ALL
    SELECT 5 UNION ALL
    SELECT 6 UNION ALL
    SELECT 7 UNION ALL
    SELECT 8
  ) AS s
  LEFT JOIN forms f ON f.status = s.status AND f.user_id = ? AND f.created_at = ?
  GROUP BY s.status
  ORDER BY s.status
`;