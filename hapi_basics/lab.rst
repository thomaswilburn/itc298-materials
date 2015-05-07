Directed lab: Moviephone
========================

Who loves movies? I love movies. Let's build an independent movie theater website, with three films. I've provided a sample data file, called ``movies.json``. Using this data, show me the following pages:

* A home page with information about the theater and a list of all movies with showtimes
* A detail page for each movie with the poster, length, and starring actors

Thoughts to ponder
------------------

* You can ``require`` JSON files, but it'll be better practice to read and parse them asynchronously.
* It's possible to nest ``{{#section}}`` tags, if you need a loop inside a loop.
* You will absolutely want these pages to share a layout.
* Use the indexes of the array to select an individual movie.

Steps
-----

1. First, just get your routes up and running, and figure out how many views you need.
2. Next, get your data loaded, and pass it through to the home page view.
3. In your detail route, log out a single movie based on its index (which should be in the URL)
4. Finally, present that movie's details by passing it through to the template.