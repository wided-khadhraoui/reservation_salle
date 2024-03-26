const jwtUtils = require('../jwtUtils');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
  if (!token) {
    return res.status(401).json({ message: 'Token non fourni.' });
  }
  const decodedToken = jwtUtils.verifyToken(token);
  if (!decodedToken) {
    return res.status(401).json({ message: 'Token invalide.' });
  }
  req.userId = decodedToken.userId;
  next();
};

module.exports = authMiddleware;
