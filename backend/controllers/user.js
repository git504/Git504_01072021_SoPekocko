/******** Importations *********/
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/******** Middlewares d'authentification *********/

exports.signup = (req, res, next) => {
  //hasher le mdp + nbr de tour de hashage
  console.log(req.body);
  // le body est bien recu ...
  bcrypt
    .hash(req.body.password, 75)
    .then((hash) => {
      // nouvel utilisateur, enregistrement dans la bdd
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      // PW crypté
      // console.log(user);
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      // vérifier que l'utilisateur existe
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé!" });
      }
      // si oui, vérifier le mdp
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          // si comparaison fausse
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect!" });
          }
          // comparaison true
          res.status(200).json({
            userId: user._id,
            //payload....
            token: jwt.sign({ userId: user._id }, process.env.TOKEN, {
              expiresIn: "1h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
