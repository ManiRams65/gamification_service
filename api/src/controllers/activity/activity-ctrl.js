const activityService = require("../../foundation/services/activity.srvc");
module.exports = class Activity {
  constructor(router) {
    router.get("/", this.getAllActivity.bind(this));
    router.get("/employee-activity", this.getEmployeeActivity.bind(this));
    router.post("/edit", this.editActivity.bind(this));
    router.get("/getActivityDetailById", this.getActivityDetailById.bind(this));
  }
  async getAllActivity(req, res) {
    const activities = await activityService.getAllActivity(req);
    res.send(activities);
  }

  async getEmployeeActivity(req, res) {
    const employeeByActivity = await activityService.getEmployeeActivity(req);
    res.send(employeeByActivity);
  }

  async getActivityDetailById(req, res) {
    const activities = await activityService.getActivityDetailById(req);
    res.send(activities);
  }

  async editActivity(req, res) {
    const editActivity = await activityService.editActivity(req);
    res.send(editActivity);
  }
};
