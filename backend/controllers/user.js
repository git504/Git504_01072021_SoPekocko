// Plugin Npm Node.js (avec bcryp pour hasher le mdp, jwt pour le token d'authentification et Crypto afin de chiffrer l'email)

const passwordValidator = require("password-validator");

// Create a schema
const passValidSchema = new passwordValidator();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//const crypto = require('crypto');
// Import du modèle User
const User = require("../models/User");
//const { exit } = require('process');

let authErrorExist = false;
let authErrorsList = [];
let passErrMessages = "";

// Add properties to it
passValidSchema
  .is()
  .min(6) // Minimum length 8
  .is()
  .max(10) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  //.has().lowercase()                              // Must have lowercase letters
  .has()
  .digits(1); // Must have digits
//.has().not().spaces()                           // Should not have spaces

// Création d'un nouvel utilisateur
exports.signup = (req, res, next) => {
  authErrorExist = false;
  authErrorsList = [];
  passErrMessages = "";
  // Validate against a password string
  console.log(
    " ispasswd pass ? : ",
    passValidSchema.validate(req.body.password)
  );
  // => true
  //console.log(passValidSchema.validate('invalidPASS'));
  // => false

  // Get a full list of rules which failed
  console.log(
    " Rules wich failed :  ",
    passValidSchema.validate(req.body.password, { list: true })
  );
  // => [ 'min', 'uppercase', 'digits' ]

  authErrorExist = !passValidSchema.validate(req.body.password);
  let passErrorsList = passValidSchema.validate(req.body.password, {
    list: true,
  });

  //https://www.npmjs.com/package/password-validator
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        console.log("Cet email existe déjà");
        authError = true;
        res.status(401).json({ errmsg: "Cet email existe déjà !" });
      } else if (authErrorExist) {
        // console.log("BIZARRE");
        // authError = true;
        console.log(authErrorsList);

        if (passErrorsList.includes("min")) {
          authErrorsList.push(
            "Le mot de passe doit avoir au moins 6 caractères"
          );
        }

        if (passErrorsList.includes("uppercase")) {
          authErrorsList.push(" au moins une lettre majuscule");
        }

        if (passErrorsList.includes("digits")) {
          authErrorsList.push(" au moins un chiffre");
        }

        passErrMessages = authErrorsList.join(" , ");

        res.status(401).json({ errmsg: passErrMessages });
      }
    })
    .then(() => {
      if (!authErrorExist) {
        //   console.log("AUTHERROR : ", authError);
        bcrypt
          .hash(req.body.password, 10)
          .then((hash) => {
            const user = new User({
              email: req.body.email,
              password: hash,
            });
            //   console.log("Enregistre quand même");

            user
              .save()
              .then(() => res.status(201).json({ message: "Utilisateur créé" }))
              .catch((error) => res.status(401).json({ error }));
          })
          .catch((error) => res.status(500).json({ error }));
      }
    });

  //  next();
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
