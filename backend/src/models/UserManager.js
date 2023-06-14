const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(user) {
    return this.database.query(
      `insert into ${this.table} (name, firstname, mail, password, age, picture, description, typeId 
        ) values (?,?,?,?,?,?,?,?)`,
      [
        user.name,
        user.firstname,
        user.mail,
        user.password,
        user.age,
        user.picture,
        user.description,
        user.typeId,
      ]
    );
  }

  updatePicture(picture, userId) {
    return this.database.query(
      `update ${this.table} set  picture = ? where id = ?`,
      [picture, userId]
    );
  }
}

module.exports = UserManager;
