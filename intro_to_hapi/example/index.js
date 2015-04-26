var hapi = require("hapi");
var markdownHandler = require("./md");
var helloHandler = require("./hello");

var server = new hapi.Server();
server.connection({ port: 8080 });
server.views({
  engines: {
    hbs: require("handlebars")
  },
  path: "templates"
});

server.start();

server.route([
  { method: "GET", path: "/{file?}", handler: markdownHandler },
  { method: "GET", path: "/hello/{name}", handler: helloHandler }
]);