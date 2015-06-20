ITC 298 - Advanced JavaScript
=============================

Goals and outcomes
------------------

Although once solely a language used by front-end web developers and granted a corresponding amount of consideration (read: very little) by the wider programming community, modern JavaScript has rapidly become a major force for general-purpose and full-stack development. Client-side frameworks like Angular and Ember are enabling new and exciting applications in the browser. NodeJS means that developers can code in the same language on the server, or share tooling across platforms. And hybrid applications, like Cordova, NWjs, and React Native, make it possible for web apps to run on all platforms right alongside C++ and Java applications.

In this course, we'll cover the full range of full-stack JavaScript development. This includes tooling, client-side MVC, and server-side scripting. We'll talk about how these three parts form a powerful trio of JavaScript-based technologies in a modern development workflow. And we'll look at how techniques from all three can be combined with other languages and technologies effectively. Students will finish the quarter having built a fully-functional prototype application that can be used as an interview resource or as a reference during future JS-based projects.

Requirements
------------

Students entering this class should have a basic understanding of JavaScript, presumably via WEB 150. That means they should be able to:

* Understand the fundamental variable types in JavaScript, including ``undefined``
* Write a function, and understand how function scope operates
* Write a loop over both an object and an array
* Understand the special variables ``this`` and ``arguments``.

Students must own a computer on which they can install software, and have a working Internet connection. This course will use `Node.js <https://nodejs.org>`__ extensively, and a syntax-highlighting editor like `Atom <http://atom.io>`__ or `Sublime Text <http://sublimetext.com>`__ is highly recommended. A GitHub account is required for the class, and use of the GitHub client for `Windows <http://windows.github.com>`__ or `Mac <http://mac.github.com>`__ would be a good idea.

There is no required textbook for this course. Class materials will be posted to this repo, including links to documentation for the week's lecture and example source code. Recordings are available of each lecture `here <https://github.com/thomaswilburn/itc298-materials/tree/master/recordings.rst>`__.

Course outline
--------------

1. `Intro to Node <https://github.com/thomaswilburn/itc298-materials/tree/master/intro_to_node>`__ - modules, NPM, and callbacks
2. `Managing Node complexity <https://github.com/thomaswilburn/itc298-materials/tree/master/async>`__ - async, events, and closures
3. `Functional programming <https://github.com/thomaswilburn/itc298-materials/tree/master/functional>`__ - Array.forEach, async.each, and Function.apply
4. `Intro to HapiJS <https://github.com/thomaswilburn/itc298-materials/tree/master/intro_to_hapi>`__ - routes, responses, and configuration
5. `HapiJS site basics <https://github.com/thomaswilburn/itc298-materials/tree/master/hapi_basics>`__ - public resources, advanced Handlebars templating
6. Intro to Grunt - basic configuration, plugins, and file watchers
7. `Intro to Backbone <https://github.com/thomaswilburn/itc298-materials/tree/master/intro_to_backbone>`__ - client-side MVC and templating
8. `SQLite3 for Node <https://github.com/thomaswilburn/itc298-materials/tree/master/sqlite>`__ - Simple databases for small web apps
9. Server-side Backbone - writing models and using collections

Topics will be covered in this class at a rate of one per week. Tuesdays will be lecture, and Thursdays will be a directed lab, with students working independently or in small groups to solve a small problem based on that week's topic. Toward the end of the quarter, this may be instead spent on consulting time for the final project.

Final project
-------------

In addition to participation, all grades from this class will be determined via a final project, to be written in JavaScript and spanning both the client and server. The final project is due on Tuesday, June 16.

The goal of the final project is to provide a portfolio piece for students: something that can be taken into interviews and serve as an example of a real, working (if somewhat basic) application. It'll be written using HapiJS on the server, and Backbone on the client, with a Grunt build process running alongside for JS packaging and CSS preprocessing.

Students are welcome to choose a possible final project on their own, but it must be approved by the instructor. Project ideas will also be provided, for students who just want to get something built. A more precise description of the project requirements is available `here <https://github.com/thomaswilburn/itc298-materials/tree/master/final_project.rst>`__.
