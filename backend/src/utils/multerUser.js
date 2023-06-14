/* eslint-disable import/no-extraneous-dependencies */
const fs = require("fs");

const path = require("path");
const multer = require("multer");

const storageUser = multer.diskStorage({
  destination(req, file, cb) {
    // On crée un dossier avec l'id du candidat pour l'upload du resume et de la picture
    const uploadFolder = path.join(__dirname, "..", "..", "public", "uploads");
    const userFolder = path.join(uploadFolder, "user", req.body.mail);

    if (!fs.existsSync(userFolder)) {
      fs.mkdirSync(userFolder, { recursive: true });
    }
    if (file.fieldname === "picture") {
      cb(null, userFolder);
    } else {
      cb(new Error("Invalid file field"));
    }
    req.pathFolder = userFolder;
  },

  filename(req, file, cb) {
    // On génère un nom de fichier unique pour chaque fichier uploadé
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const extension = file.originalname.split(".").pop();
    const fileName = `${file.fieldname}-${uniqueSuffix}.${extension}`;

    cb(null, fileName);
  },
});

module.exports = {
  storageUser,
};
