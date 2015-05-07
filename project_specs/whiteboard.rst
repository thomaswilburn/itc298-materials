Project spec: Whiteboard
========================

If you share a room or office with other people, you often need a common place to put messages so that other people can see them. This application is meant to be an internal application for just such a purpose, providing a virtual "wall" to which notes can be attached. It does not need to be persistent storage: instead, you can create a fresh wall each time the server is restarted.

Must-have requirements
----------------------

* Users should be able to view all the notes that have been posted to the board.
* A user should be able to click a button to add a new note.
* Notes should be drag-and-drop blocks that can be repositioned and given custom background colors, like virtual post-it notes

Nice-to-have requirements
-------------------------

* Update the wall in real-time for all viewers, instead of requiring a page refresh to see new changes
* Give notes a visual cue based on age, so that it's easy to see which notes are newer and which are older
* Persist notes to a database or file, so that server restarts do not wipe out all messages
* Require users to log in, and only allow authenticated users to post messages