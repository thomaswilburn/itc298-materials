var hapi = require("hapi");
var markdownHandler = require("./md");

var server = new hapi.Server();
server.connection({ port: 8080 });

server.start();

server.route([
  { method: "GET", path: "/{file?}", handler: markdownHandler }  
]);