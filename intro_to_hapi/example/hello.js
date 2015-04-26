module.exports = function(req, reply) {
  reply.view("hello", { name: req.params.name });
};