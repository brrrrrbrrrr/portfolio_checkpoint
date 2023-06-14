const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
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
