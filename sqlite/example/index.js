var hapi = require("hapi");
var server = new hapi.Server();
var db = require("./db");
server.connection({ port: 8000 });
db.init(function(err) {
  if (err) {
    return console.error(err);
  }
  console.log("Database ready, starting server...");
  server.start(function() {
    console.log("Server ready!");
  });
});

server.views({
  path: "views/templates",
  layoutPath: "views",
  layout: "default",
  engines: {
    html: require("handlebars")
  },
  isCached: false,
  context: {
    dev: true
  }
});

server.route(require("./routes"));