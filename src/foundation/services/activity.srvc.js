const PostgresService = require("./postgress.srvc");
const QueryHelper = require("../helper/postgres-query-helper");
class ActivityService {
  async getAllActivity(req) {
    const getActivityQuery = QueryHelper.builGetEmployeeActivity();
    const res = await PostgresService.executeQuery(getActivityQuery);
    return res.result.rows;
  }
  async getEmployeeActivity(req) {
    const getEmployeeActivityQuery =
      QueryHelper.buildGetEmployeeActivityQuery(req);
    const res = await PostgresService.executeQuery(getEmployeeActivityQuery);
    return res.result.rows;
  }

  async getActivityDetailById(req) {
    const getActivityByIDQuery = QueryHelper.buildGetActivityByIDQuery(req);
    const res = await PostgresService.executeQuery(getActivityByIDQuery);
    return res.result.rows;
  }

  async editActivity(req) {
    const requestBody = req.body;
    const updateActivityQuery =
      QueryHelper.buildUpdateActivityQuery(requestBody);
    const res = await PostgresService.executeQuery(updateActivityQuery);
    return res.result.rows;
  }
}

module.exports = new ActivityService();
