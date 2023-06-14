const joi = require("joi");
const models = require("../models");

const validate = (data, forCreation = true) => {
  const presence = forCreation ? "required" : "optional";
  return joi
    .object({
      name: joi.string().max(45).presence(presence),
      theme: joi.string().max(45).presence(presence),

      typeId: joi.number().integer().presence(presence),
      description: joi.string().max(2000).presence(presence),
    })
    .validate(data, { abortEarly: false }).error;
};

const add = async (req, res) => {
  const project = req.body;
  const userId = req.payload.sub.id;

  // TODO validations (length, format...)
  const validationError = validate(req.body);
  if (validationError) {
    // Si les données ne sont pas valides, renvoyer une erreur 400
    return res.status(422).json({ error: validationError.message }); // Utiliser validationError.message pour obtenir le message d'erreur
  }

  models.project
    .insert(project, userId)
    .then(([result]) => {
      res.location(`/user/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
  return null;
};

const updateProject = (req, res) => {
  const updatedValues = req.body;

  const idProject = req.params.id;

  const idUser = req.payload.sub.id;

  const errors = validate(updatedValues, false);
  if (errors) {
    console.error(errors);
    return res.status(422).json({ error: errors.message });
  }
  models.project
    .update(updatedValues, idUser, idProject)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(200);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
  return null;
};

const browse = (req, res) => {
  const userId = req.payload.sub.id;
  models.project
    .findAll(userId)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const browseVisit = (req, res) => {
  const userId = req.params.id;
  models.project
    .findAll(userId)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  const userId = req.payload.sub.id;
  const projectId = req.params.id;
  models.project
    .find(userId, projectId)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const readVisit = (req, res) => {
  const userId = req.params.id;
  const { projectId } = req.params;
  models.project
    .find(userId, projectId)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  add,
  updateProject,
  read,
  browse,
  browseVisit,
  readVisit,
};
