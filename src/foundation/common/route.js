const express = require("express");
const fs = require("fs");
const path = require("path");
module.exports = class Router {
  static load(app, folderName) {
    fs.readdirSync(folderName).forEach((each_dir) => {
      const fullName = path.join(folderName, each_dir);
      const isDirectory = fs.lstatSync(fullName).isDirectory();
      if (isDirectory) {
        this.load(app, fullName);
      } else {
        const endpointPath = path
          .dirname(fullName)
          .split(path.sep)
          .slice(2)
          .join("/");
        const baseRoute = `/api/${endpointPath}`;
        const controllerClass = require(`../../../${fullName}`);
        console.log("Baseroute", baseRoute);
        const route = express.Router();
        new controllerClass(route);
        app.use(baseRoute, route);
      }
    });
  }
};
