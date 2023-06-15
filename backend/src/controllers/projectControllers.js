const joi = require("joi");
const models = require("../models");

const validate = (data, forCreation = true) => {
  const presence = forCreation ? "required" : "optional";
  return joi
    .object({
      name: joi.string().max(45).presence(presence),
      theme: joi.string().max(45).presence(presence),
      link: joi.string().max(45).presence("optional"),
      techId: joi.array().items(joi.number()).presence(presence),

      typeId: joi.number().integer().presence(presence),
      description: joi.string().max(2000).presence(presence),
    })
    .validate(data, { abortEarly: false }).error;
};

const destroy = (req, res) => {
  const userId = req.payload.sub.id;
  const idProject = req.params.id;
  models.project
    .delete(userId, idProject)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const updateTech = (req, res) => {
  const { techId } = req.body; // Assurez-vous que techId est un tableau

  const idProject = req.params.id;
  const idUser = req.payload.sub.id;

  const errors = validate({ techId }, false);
  if (errors) {
    console.error(errors);
    return res.status(422).json({ error: errors.message });
  }

  const updatedTechPromises = techId.map((tech) =>
    models.tech.updateTech(idUser, idProject, tech)
  );

  Promise.all(updatedTechPromises)
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

const add = (req, res) => {
  const { name, theme, description, typeId, link, techId } = req.body;
  const userId = req.payload.sub.id;

  // TODO validations (length, format...)
  const validationError = validate(req.body);
  if (validationError) {
    return res.status(422).json({ error: validationError.message });
  }

  models.project
    .insert({ name, theme, description, typeId, link }, userId)
    .then(([projectInsertResult]) => {
      const projectId = projectInsertResult.insertId;

      // Insérer les relations projet-technologie dans la table "projecthastech"
      const insertTechPromises = techId.map((tech) =>
        models.project.insertTech(userId, projectId, tech)
      );

      Promise.all(insertTechPromises)
        .then(() => {
          res.location(`/user/${projectId}`).sendStatus(201);
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
  return null;
};

module.exports = {
  add,
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
        return res.sendStatus(404);
      }
      return res.sendStatus(204);
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
  destroy,
  updateTech,
};
