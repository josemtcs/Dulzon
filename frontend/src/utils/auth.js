export function getUserFromToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica el token
    return payload;
  } catch {
    return null;
  }
}

export function isAdmin() {
  const user = getUserFromToken();
  return user?.esAdmin === true;
}