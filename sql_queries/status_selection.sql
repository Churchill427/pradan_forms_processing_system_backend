const query = `
  SELECT status, COUNT(*) AS total
  FROM forms
  GROUP BY status
  ORDER BY status ASC
`;
