Project specifications: Chat client
===================================

Abstract
--------

This application is a simple, browser-based chatroom, similar to IRC or Slack. It lets users exchange text messages in realtime, and also indicates user status (entering the room, typing, leaving the room).

Must-haves
----------

* The user should be able to see new chat messages come in without refreshing the page, in realtime.
* Users can type messages, and have them immediately sent to all other connected users.
* In addition to the chat window, a secondary panel lists all the current members of the room.
* In this panel, user presence should be shown: when someone enters, when they leave, and when they're typing.
* The server should retain at least several hundred lines of history, and allow users to scroll back into the history even before they were connected.

Nice-to-haves
-------------

* Use websockets instead of AJAX to create instant chat communication
* Allow users to upload or insert images and other media into the chatroom
* Authenticate users and allow access only via administered accounts
* Store timestamped logs as long as the server is running