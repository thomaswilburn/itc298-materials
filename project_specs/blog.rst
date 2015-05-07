Project spec: Blog/Wiki
=======================

A simple blog is always a good test of a web-based programming language. You can use any backing storage that you want for this, but the ``sqlite3`` module may be a good place to start. Think of this as your chance to write the kind of CMS that you've always wanted, free from the legacy problems of WordPress and other systems.

Must-have requirements
----------------------

* Provide a reverse-chronological stream of post content, with or without "read more" links
* Provide single-post pages, possibly with a different layout
* Allow users to create new posts from a web interface

Nice-to-have requirements
-------------------------

* Restrict post creation to authenticated users only
* Allow users to write their own page templates
* Allow users to attach tags or categories to posts, and filter the stream based on them
* Provide a search function