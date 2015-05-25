var Project = require("../models/project");

module.exports = function(req, reply) {
  var payload = req.payload;
  var model = new Project(payload);
  model.save(function(err) {
    if (err) {
      console.error(err);
    }
    //reload data
    var response = reply("Saved!");
    response.statusCode = 302;
    response.headers.Location = "/projects";
  });
};