const { Pool } = require("pg");
const { db_config } = require("../common/constants");

class PostgresService {
  InitalizeDBConnection() {
    // Create a PostgreSQL pool
    if (!this.client) {
      this.client = new Pool(db_config);
    }
  }
  async executeQuery(objQuery) {
    const dbResponse = {};
    try {
      const res = await this.client.query(objQuery);
      dbResponse.result = res;
    } catch (error) {
      console.log(error);
    }
    return dbResponse;
  }
  query(query, callback) {
    return this.client.query(query, callback);
  }
}
module.exports = new PostgresService();
