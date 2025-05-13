const jwt = require('jsonwebtoken');
function autenticarToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'Token requerido' });

  jwt.verify(token, 'secreto_super_seguro', (err, usuario) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    req.usuario = usuario;
    next();
  });
}

function soloAdmin(req, res, next) {
  if (!req.usuario.esAdmin) {
    return res.status(403).json({ message: 'Acceso solo para administradores' });
  }
  next();
}

module.exports = { autenticarToken, soloAdmin };