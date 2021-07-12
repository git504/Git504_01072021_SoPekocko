/******** Importations *********/
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

/******** Création du schéma User *********/
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

/******** 1 Utilisateur = 1 email *********/

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);
