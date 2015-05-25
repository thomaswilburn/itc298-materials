module.exports = [{
  path: "/",
  method: "GET",
  handler: require("./handlers/home")
}, {
  path: "/projects", //duplicate of the home path
  method: "GET",
  handler: require("./handlers/home")
}, {
  path: "/projects/{id}",
  method: "GET",
  handler: require("./handlers/getProject")
}, {
  path: "/projects/{id}",
  method: "POST",
  handler: require("./handlers/setProject")
}, {
  path: "/assets/{param*}",
  method: "GET",
  handler: {
    directory: {
      path: "public"
    }
  }
}];