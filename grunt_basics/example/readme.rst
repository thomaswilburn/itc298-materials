Example code - Integrating Grunt with Hapi
==========================================

This sample applications uses Grunt to perform the following automated tasks:

* Uses ``grunt-autoprefixer`` to transform CSS for cross-browser compatibility.
* Monitors and restarts the Hapi server when JS files change, using ``grunt-nodemon``
* Provides live reload via ``grunt-contrib-watch`` for CSS and HTML files

Inputs for the public files are read from the ``src`` folder and written to the ``build`` 
folder. As a result, the ``build`` folder is never checked in, because its contents are 
generated from the Grunt process.

Remember, you must have the ``grunt-cli`` package installed globally before you can run it 
in a directory like this one. If you have not installed it on the machine you're using, 
remember to run ``npm install grunt-cli -g`` to create the global command.
