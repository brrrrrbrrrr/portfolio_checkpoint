const AbstractManager = require("./AbstractManager");

class TechManager extends AbstractManager {
  constructor() {
    super({ table: "tech" });
  }

  findAllTech(projectId, userProjectId) {
    return this.database.query(
      `SELECT * FROM projecthastech WHERE projectId = ? AND projectUserId = ?`,
      [projectId, userProjectId]
    );
  }
}

module.exports = TechManager;
