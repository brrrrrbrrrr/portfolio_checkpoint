const AbstractManager = require("./AbstractManager");

class ProjectManager extends AbstractManager {
  constructor() {
    super({ table: "project" });
  }

  insert(project, userId) {
    return this.database.query(
      `insert into ${this.table} (name, theme, description, typeID, userId, link) values (?,?,?,?,?,?)`,
      [
        project.name,
        project.theme,
        project.description,
        project.typeId,
        userId,
        project.link,
      ]
    );
  }

  insertTech(userId, projectId, techId) {
    return this.database.query(
      `INSERT INTO projecthastech (projectUserId, projectId, techId) VALUES (?, ?, ?)`,
      [userId, projectId, techId]
    );
  }

  delete(userId, id) {
    return this.database.query(
      `delete from ${this.table} where userId = ? and id = ?`,
      [userId, id]
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
