module.exports = [
  { 
    method: "GET",
    path: "/assets/{param*}",
    handler: {
      directory: {
        path: "./public"
      }
    }
  }, {
    method: "GET",
    path: "/",
    handler: require("./handlers/home")
  }, {
    method: "GET",
    path: "/mine",
    handler: require("./handlers/mine")
  }, {
    method: "GET",
    path: "/incomplete",
    handler: require("./handlers/incomplete")
  }, {
    method: "GET",
    path: "/add",
    handler: require("./handlers/addForm")
  }, {
    method: "POST",
    path: "/add",
    handler: require("./handlers/addPost")
  }, {
    method: "POST",
    path: "/mark/{id}",
    handler: require("./handlers/markComplete")
  }
];