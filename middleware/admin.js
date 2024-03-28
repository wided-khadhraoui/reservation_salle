

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
  if (!req.utilisateur.isAdmin) {
    return res.status(403).send( 'Tu n\'est admin.' )
  }
  
  next();
};

