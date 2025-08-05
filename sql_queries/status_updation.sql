const updateQuery = `
  UPDATE forms
  SET status = ?
  WHERE id = ?
`;