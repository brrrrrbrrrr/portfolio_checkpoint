const models = require("../models");

const browse = (req, res) => {
  models.tech
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const browseTech = (req, res) => {
  const idUser = req.payload.sub.id;
  const projectId = req.params.id;
  models.tech
    .findAllTech(projectId, idUser)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  browseTech,
};
