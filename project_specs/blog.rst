Project specifications: Blog content management system
======================================================

Difficulty
----------

3 out of 5

Abstract
--------

Implementing a blog is always a great test of any server-side language. This will implement a simple reverse-chronological blog, including tags/categories, with a simple interface for opening and editing posts.

Must-haves
----------

* Visitors should be able to view posts on the site in reverse-chronological order, with possible filtering by tag/category.
* Authenticated users should be able to log in, author, and edit posts in a simple interface, setting the title, body, categories, and other metadata for the post.
* Unauthenticated users should be blocked from seeing the admin, or posts that are marked draft/private.
* Posts can be stored on the hard drive, in memory, or in a SQLite database.
* It should be possible to easily edit templates, and to provide alternate "flavors" such as RSS.

Nice-to-haves
-------------

* Add alternate post views, such as excerpt mode.
* Allow users to upload media files for use in posts.
* Add a visual editor or a MarkDown mode, so that users can create formatted posts without having to know HTML.
* Allow users to write plugins that can process the text of posts, for "pirate mode" or embedding external media easily (a la shortcodes)