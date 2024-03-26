const express = require('express');
const router = express.Router();
const Salle = require('../models/salle');
const { v4: uuidv4 } = require('uuid');

// Ajouter une salle dans la base de données
router.post("/ajouter-salle", async (req, res) => {
    const {Id, Nom, Capacite, Equipments, Disponibilites, Tarif } = req.body;

    try {
       
        
        
        
        const nouvelleSalle = new Salle({
            Id,
            Nom,
            Capacite,
            Equipments,
            Disponibilites,
            Tarif,
        });
        await nouvelleSalle.save();
        req.session.message = {
            type: 'success',
            message: 'Ajout avec succès'
        };
        res.redirect('/salles');
    } catch (error) {
        res.json({ message: error.message, type: 'danger' });
    }
});

router.get('/salles', async (req, res) => {
    try {
        // Récupérer toutes les salles de la base de données
        const salles = await Salle.find();

        // Passer les données à la vue pour affichage
        res.render('salles', { salles });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des salles', error: error.message });
    }
});


router.get("/modifier-salle/:Id", async (req, res) => {
    try {
        const salle = await Salle.findById(req.params.Id);
        if (!salle) {
            res.status(404).send("Salle introuvable");
            return;
        }
        res.render("modifierSalle"); 
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de la salle', error: error.message });
    }
});

// Route PUT pour modifier une salle
router.put("/modifier-salle/:Id", async (req, res) => {
    const { Id,Nom, Capacite, Equipements, Disponibilites, Tarif } = req.body;
    try {
        const salle = await Salle.findById(req.params.Id);
        if (!salle) {
            res.status(404).send("Salle introuvable");
            return;
        }
        // Mettre à jour les propriétés de la salle
        
        salle.Nom = Nom;
        salle.Capacite = Capacite;
        salle.Equipements = Equipements;
        salle.Disponibilites = Disponibilites;
        salle.Tarif = Tarif;
        await salle.save(); 
        req.session.message = {
            type: 'success',
            message: 'Modification de la salle effectuée avec succès'
        };
        res.redirect('/salles'); 
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la modification de la salle', error: error.message });
    }
});





router.get('/', (req, res) => {
    res.render('index');
});
router.get('/ajouter-salle', (req, res) => {
    res.render('ajouter-salle');
});

router.get('/salles', (req, res) => {
    res.render('salles');
});
router.get('/modifier-salle', (req, res) => {
    res.render('modifier-salle');
});

module.exports = router;

