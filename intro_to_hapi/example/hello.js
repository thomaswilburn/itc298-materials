module.exports = function(req, reply) {
  //use reply.view to send the template back with our parameter filled in
  reply.view("hello", { name: req.params.name });
};