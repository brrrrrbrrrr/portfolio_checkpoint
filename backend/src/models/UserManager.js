const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  findAll() {
    return this.database.query(
      `SELECT ${this.table}.name, ${this.table}.id,  firstname, mail, age, picture, description, typeId, city, types.name AS typeName 
      FROM ${this.table} 
      JOIN type AS types ON ${this.table}.typeId = types.id 
      `
    );
  }

  insert(user) {
    return this.database.query(
      `insert into ${this.table} (name, firstname, mail, password, age, picture, description, typeId, city 
        ) values (?,?,?,?,?,?,?,?,?)`,
      [
        user.name,
        user.firstname,
        user.mail,
        user.password,
        user.age,
        user.picture,
        user.description,
        user.typeId,
        user.city,
      ]
    );
  }

  update(user, id) {
    return this.database.query(`update ${this.table} set ? where id `, [
      user,
      id,
    ]);
  }

  // find(id) {
  //   return this.database.query(
  //     `select name, firstname, mail, age, picture, description, typeId, city from  ${this.table} where id = ?`,
  //     [id]
  //   );
  // }

  find(id) {
    return this.database.query(
      `SELECT ${this.table}.name, firstname, mail, age, picture, description, typeId, city, types.name AS typeName 
      FROM ${this.table} 
      JOIN type AS types ON ${this.table}.typeId = types.id 
      WHERE ${this.table}.id = ?`,
      [id]
    );
  }

  updatePicture(picture, userId) {
    return this.database.query(
      `update ${this.table} set  picture = ? where id = ?`,
      [picture, userId]
    );
  }

  getUserByLogin(login) {
    return this.database
      .query(
        `SELECT id, name, firstname, password from ${this.table} WHERE mail = ?`,
        [login]
      )
      .then(([result]) => result)
      .catch((err) => {
        console.warn(err);
        return false;
      });
  }
}

module.exports = UserManager;
