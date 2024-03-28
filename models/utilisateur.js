const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const utilisateurSchema = new mongoose.Schema({
  Email: { type: String, required: true, unique: true },
  password : { type: String, required: true },
  
});

utilisateurSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

const Utilisateur = mongoose.model('Utilisateur', utilisateurSchema);

module.exports = Utilisateur;
