const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) throw new Error('Token manquant');

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.utilisateur = decodedToken; // Stocker les données utilisateur dans req.utilisateur
        next();
    } catch (error) {
        console.error('Échec d\'authentification :', error.message);
        return res.status(401).send('Échec d\'authentification : ' + error.message);
    }
};

module.exports = authenticate;

