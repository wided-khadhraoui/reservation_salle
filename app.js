require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const salleRoutes = require('./routes/salleRoutes');
const authenticate= require('./middleware/auth');
const authRoutes = require('./routes/authRoutes');
const path = require('path');

const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const bcrypt = require('bcryptjs');
const flash = require('connect-flash');


const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));


// Configuration de mongoose et connexion à la base de données
mongoose.connect(process.env.DB_URI);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to the database!"));


// Configuration du moteur de template EJS
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
// Middleware pour gérer les sessions
app.use(session({
    secret: 'my secret key',
    saveUninitialized: true,
    resave: false,
}));

// Middleware pour parser le body des requêtes
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Middleware pour les messages flash
app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

app.use(flash());

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Erreur lors de la déconnexion:', err);
            res.redirect('/');
        } else {
            res.redirect('/login');
        }
    });
});


// Routes


app.use("/",salleRoutes);
app.use("/", authRoutes);






// Lancement du serveur
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
