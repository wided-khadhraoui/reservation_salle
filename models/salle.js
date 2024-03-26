const mongoose = require('mongoose');

const salleSchema = new mongoose.Schema({

    Id: { type: String, required: true },
    Nom: { type: String, required: true },
    Capacite: { type: Number, required: true },
    Equipments: [{ type: String }],
    Disponibilites: [{ type: Date , required : true }],
    Tarif: { type: Number, required: true }
});

const Salle = mongoose.model('Salle', salleSchema);

module.exports = Salle;