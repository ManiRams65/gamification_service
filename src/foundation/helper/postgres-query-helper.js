class QueryHelper {
  buildUpdateActivityQuery(requestBody) {
    const update_string = "UPDATE activity_points SET ";
    const obj = {
      activity_name: "activity_name = CASE",
      points: "points = CASE",
      status: "status = CASE",
      activity_id: [],
    };
    if (requestBody.length) {
      requestBody.forEach((each_activity) => {
        obj.activity_name += ` WHEN id = ${each_activity.id} THEN  '${each_activity.activity_name}' `;
        obj.points += ` WHEN id = ${each_activity.id} THEN  ${each_activity.points} `;
        obj.status += ` WHEN id = ${each_activity.id} THEN  ${each_activity.status} `;
        obj.activity_id.push(each_activity.id);
      });
    }
    const where_string = ` WHERE id IN ( ${obj.activity_id.join(
      ","
    )}) RETURNING * `;

    return `${update_string}  ${obj.activity_name} END, ${obj.points} END, ${obj.status} END ${where_string};`;
  }
  builGetEmployeeActivity() {
    return `SELECT * from activity_points ORDER BY id`;
  }
  buildGetEmployeeActivityQuery(requestBody) {
    let { month_number, year_number } = requestBody.headers;
    if (!month_number || !year_number) {
      const currentDate = new Date();
      month_number = currentDate.getMonth() + 1;
      year_number = currentDate.getFullYear();
    }
    return `SELECT e.employee_name,e.id, SUM(ea.points) AS total_points FROM employee e JOIN employee_activity ea ON e.id = ea.employee_id WHERE EXTRACT(MONTH FROM ea.created_date) = ${month_number} AND EXTRACT(YEAR FROM ea.created_date) = ${year_number} GROUP BY e.id ORDER BY total_points DESC;`;
  }

  buildGetActivityByIDQuery(requestBody) {
    const { id } = requestBody.headers;
    let { month_number, year_number } = requestBody.headers;
    if (!month_number || !year_number) {
      const currentDate = new Date();
      month_number = currentDate.getMonth() + 1;
      year_number = currentDate.getFullYear();
    }
    return `SELECT ea.points, ap.activity_name, ea.created_date FROM employee_activity ea JOIN activity_points ap ON ea.activity_id = ap.id WHERE ea.employee_id = ${id} AND EXTRACT(YEAR FROM ea.created_date) = ${year_number}
          AND EXTRACT(MONTH FROM ea.created_date) = ${month_number};;`;
  }
}
module.exports = new QueryHelper();
