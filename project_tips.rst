Final project tips
==================

Structure
---------

How you structure your project is up to you, and will depend heavily on what your application does and your own personal preferences. It is a good chance to be creative, or to try out different approaches. However, I would propose the following folder structure, as inspired by the `NPM web site <https://github.com/npm/newww>`__, as a decent starting place:

* ``routes`` - contains an array of route definitions in an array, exported via ``module.exports``. You can then directly pass this to your server (e.g., ``server.route(require("./routes/routes"));``).
* ``handlers`` - contains all the handlers for your various routes, thus gluing models and views together. These should be required into your route definition via ``require()`` (e.g., ``handler: require("../handlers/moduleName")``).
* ``views`` - contains all the default layout template, as well as two subfolders...
* ``views/templates`` - for main view templates
* ``views/partials`` - for shared template fragments
* ``models`` - the most free-form folder, containing modules that load data and run business logic.
* ``src`` - contains pre-Grunt JS, CSS, and image assets.
* ``build`` - the directory folder containing Grunt output, and served from your static resource route.