const AbstractManager = require("./AbstractManager");

class TypeManager extends AbstractManager {
  constructor() {
    super({ table: "type" });
  }

  findAll() {
    return this.database.query(`select * from  ${this.table}`);
  }
}

module.exports = TypeManager;
