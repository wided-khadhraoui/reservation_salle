const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (utilisateurId) => {
    return jwt.sign({ utilisateurId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const verifyToken = (token) => {
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        return decodedToken;
    } catch (error) {
        return null;
    }
};

module.exports = { generateToken, verifyToken };

