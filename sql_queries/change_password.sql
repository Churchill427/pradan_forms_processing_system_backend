const query = `
  UPDATE users 
  SET password = ? 
  WHERE email = ? AND password = ?
`;