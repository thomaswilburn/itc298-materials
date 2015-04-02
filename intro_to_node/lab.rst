Directed lab - My first scraper
===============================

Unsurprisingly, Node's strengths often revolve around networking and web pages. To see how powerful this can be, let's write a simple scraper for Wikipedia that will figure out who was born and died on the current day. 

Required modules
----------------

* ``request`` - A library for downloading web pages by URL
* ``cheerio`` - A jQuery implementation for the server
* ``node-inspector`` - [optional] Debugging tools for NodeJS

Steps
-----

It's important, when building software, to start with simple tasks and build up complexity, instead of trying to solve a complex task immediately (much the same way that we make a cake one layer at a time, instead of baking all of them at once, icing and all). Try approaching today's lab with the following steps, in order to build your scraper.

1. Using the default ``request()`` function, get today's Wikipedia page (e.g., http://en.wikipedia.org/wiki/April_8) and log it to the console.
2. Once you have the page HTML as text, load it into Cheerio and log that result to the console (or use Node Inspector to look at it).
3. Using that Cheerio object, locate the "births" and "deaths" sections of the page (hint: these headlines have IDs, and the next UL tag contains all the links in that section).
4. Loop through those links, and log out the following information: number of births, number of deaths, and names for each.