const AbstractManager = require("./AbstractManager");

class ProjectManager extends AbstractManager {
  constructor() {
    super({ table: "project" });
  }

  insert(project, userId) {
    return this.database.query(
      `insert into ${this.table} (name, theme, description, typeID, userId) values (?,?,?,?,?)`,
      [project.name, project.theme, project.description, project.typeId, userId]
    );
  }

  update(project, projectId, userId) {
    return this.database.query(
      `update ${this.table} set ? where id = ? and userId = ?`,
      [project, userId, projectId]
    );
  }

  find(userId, id) {
    return this.database.query(
      `select * from  ${this.table} where userId = ? and id = ?`,
      [userId, id]
    );
  }

  findAll(userId) {
    return this.database.query(
      `select * from  ${this.table} where userId = ?`,
      [userId]
    );
  }
}

module.exports = ProjectManager;
