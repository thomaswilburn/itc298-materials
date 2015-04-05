Directed lab - grep.js
======================

For this lab, we're going to search through a set of files for a given string. Create a directory, and place a number of files inside, with some text in each. In some of the files, place the word "needle." Then, using the ``async`` module and streams, look through the files for "needle," hopefully reading only as much of the file as necessary (i.e., no more than needed to find the search term).

Required modules
----------------

* ``async``

Steps
-----

As always, it is much easier to accomplish a task if we break it into smaller, simpler tasks. Try the following steps to get your search function working:

1. Get the listing of all files in the directory, using the ``fs.readdir`` function.
2. Use the ``async`` module to log the name of each file, then log "all finished" when done.
3. For each file, open a stream, and log each line to the console, preceded by the filename.
4. Check each line for "needle" and add the file to an array of matches, logged out at the end.
5. As a bonus, use ``async.filter`` to create the array of matches.