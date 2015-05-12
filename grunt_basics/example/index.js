var hapi = require("hapi");
var server = new hapi.Server();
server.connection({ port: 8080 });
server.start();
