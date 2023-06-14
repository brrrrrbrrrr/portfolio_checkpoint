/* eslint-disable import/no-extraneous-dependencies */
const joi = require("joi");
const path = require("path");
const fs = require("fs");
const models = require("../models");
const { hashPassword } = require("../utils/auth");

const validate = (data, forCreation = true) => {
  const presence = forCreation ? "required" : "optional";
  return joi
    .object({
      name: joi.string().max(45).presence(presence),
      firstname: joi.string().max(45).presence(presence),
      age: joi.string().max(45).presence(presence),
      mail: joi.string().email().presence(presence),
      password: joi.string().max(200).presence(presence),
      newPassword: joi.string().max(45).presence("optional"),
      city: joi.string().max(45).presence(presence),
      typeId: joi.number().integer().presence(presence),
      description: joi.string().max(2000).presence(presence),
    })
    .validate(data, { abortEarly: false }).error;
};

const add = async (req, res) => {
  // TODO validations (length, format...)
  // Valider les données avec Joi
  // Si les données sont valides, continuer le traitement
  const { name, firstname, mail, password, age, description, typeId } =
    req.body;
  const filePicture = req.file;

  const userFolderDefault = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "uploads",
    "user"
  );
  const userFolder = req.pathFolder;
  const picture = `user/${filePicture.filname}`;
  const validationError = validate(req.body);
  if (validationError) {
    // Si les données ne sont pas valides, renvoyer une erreur 400
    res.status(422).json({ error: validationError.message }); // Utiliser validationError.message pour obtenir le message d'erreur
  }
  const hashedPassword = await hashPassword(password);
  models.user
    .insert({
      name,
      firstname,
      mail,
      password: hashedPassword,
      age,
      picture,
      description,
      typeId,
    })
    .then(([result]) => {
      // Je recupere l'id de mon nouvel utilisateur
      const idNewUser = result.insertId.toString();

      const newFolder = path.join(userFolderDefault, idNewUser);
      fs.renameSync(userFolder, newFolder, (err) => {
        console.warn("rename folder :", err);
      });
      // Je recupere le nom des fichiers et j'enleve les caractères spéciaux et je rajoute l'extention

      const extension = filePicture.originalname.split(".").pop();
      const newOriginalNamePicture = `${filePicture.originalname
        .split(".")[0]
        .replace(/[^a-zA-Z0-9]/g, "")}.${extension}`;
      const originalNamePicture = path.join(newFolder, newOriginalNamePicture);
      const fileNamePicture = path.join(newFolder, filePicture.filename);
      const newFileNamePicture = `uploads/user/${idNewUser}/${newOriginalNamePicture}`;
      fs.renameSync(fileNamePicture, originalNamePicture, (err) => {
        if (err) {
          console.warn("erreur Picture :", err);
        }
      });
      models.user
        .updatePicture(newFileNamePicture, idNewUser)
        .then(() => {
          return res.location(`/user/${result.insertId}`).sendStatus(201);
        })
        .catch((error) => {
          console.error(error);
          return res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).send("Mail already exists"); // Ajouter le mot-clé 'return' avant d'appeler res.status()
      }
      return res.sendStatus(500); // Ajouter le mot-clé 'return' avant d'appeler res.sendStatus()
    });
};

const getUserByLoginToNext = async (req, res, next) => {
  const { mail } = req.body;
  if (!mail) {
    return res.sendStatus(422);
  }
  const result = await models.user.getUserByLogin(mail);
  if (result) {
    if (result[0] != null) {
      req.user = { ...result[0] };
      next();
    } else return res.sendStatus(401);
  } else return res.sendStatus(500);
  return null;
};

module.exports = {
  add,
  getUserByLoginToNext,
};
