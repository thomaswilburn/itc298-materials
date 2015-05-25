Example application - Project tracker
=====================================

This sample application is a partially-completed project invoice tracker written in Hapi, 
with Backbone used for the model layer, and SQLite for storage. It automatically creates and 
initializes an ``invoices.db`` file, which will contain tables for both projects and project 
line items (line items are not yet implemented). It also uses a Grunt task configuration to 
run Nodemon for the server process, and build LESS files into CSS.
