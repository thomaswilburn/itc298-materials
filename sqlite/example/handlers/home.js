var db = require("../db");

module.exports = function(req, reply) {
  db.getAllProjects(function(err, projects) {
    console.log(projects);
    reply.view("index", {
      projects: projects,
      title: "Home"
    });
  })
};