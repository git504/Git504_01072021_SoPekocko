// Importations
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const path = require("path");
const multer = require("multer");
// parse form-data
const sauceRoutes = require("./routes/sauce");
const userRoutes = require("./routes/user");

require("dotenv").config();

// Connexion de l'API à la bdd mongoDB que l'on a créée
mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// Création de l'app
const app = express();

// Helmet
app.use(helmet());

// middleware général 1 pour définir les headers de toutes les requetes
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// middleware général 2 qui transforme le corps des requetes en JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// middleware qui permet l'accès statique à des images _dirname= nom du dossier ou ns ns trouvons
app.use("/images", express.static(path.join(__dirname, "images")));

// Utilisation des routes
app.use("/api/sauces", sauceRoutes);
app.use("/api/auth", userRoutes);

// Exportation de l'app pour utilisation par d'autres fichiers, nottament le serveur Node.
module.exports = app;
