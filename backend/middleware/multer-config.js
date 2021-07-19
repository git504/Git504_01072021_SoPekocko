// Importations
const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// Objet de configuration 3 arguments null=pas d'erreurs
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    // console.log("filename", req.file.filename);
    const name = file.originalname.split(".")[0];
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + "_" + Date.now() + "." + extension);
  },
});

//methode single = fichier unique, image uniquement
module.exports = multer({ storage: storage }).single("image");
