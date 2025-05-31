const jwt = require('jsonwebtoken');

function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  
  // Extraer el token, manejando tanto "Bearer token" como solo "token"
  const token = authHeader && authHeader.startsWith('Bearer ') 
    ? authHeader.substring(7) // Remover "Bearer " 
    : authHeader;
  
  if (!token) {
    return res.status(403).json({ message: 'Token requerido' });
  }

  jwt.verify(token, 'secreto_super_seguro', (err, usuario) => {
    if (err) {
      console.log('Error de verificación JWT:', err.message);
      return res.status(403).json({ message: 'Token inválido' });
    }
    req.usuario = usuario;
    next();
  });
}

function soloAdmin(req, res, next) {
  if (req.usuario.rol !== 1) {
    return res.status(403).json({ message: 'Acceso solo para administradores' });
  }
  next();
}

module.exports = { autenticarToken, soloAdmin };