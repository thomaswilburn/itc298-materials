Intro to Node - example app
---------------------------

This application demonstrates how to use modules, both built-in and from NPM. In order to install its dependencies, you should open a shell in this directory and run the following command::

    npm install

You don't need to specify anything specifically: the package.json file contains all the information necessary for NPM to do its thing, because I originally installed packages using the ``--save`` flag.

Running this application (via ``node index.js``) will perform a simple task: it loads a text file, searches through that file for URLs, and then outputs them to the console with coloring provided by the Chalk module.