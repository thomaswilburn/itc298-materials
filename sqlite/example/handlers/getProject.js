var Project = require("../models/project");

module.exports = function(req, reply) {
  var id = req.params.id;
  var model = new Project({
    id: id
  });
  //new projects don't need to load from the DB
  if (id == "new") {
    return reply.view("project", {
      title: "New Project",
      project: model.toJSON()
    });
  }
  //get model details and then return the page
  model.set("id", id);
  model.load(function(err) {
    var data = model.toJSON();
    reply.view("project", {
      title: data.name,
      project: data
    });
  });
};