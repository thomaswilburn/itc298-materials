Project specifications: Setec Astronomy
=======================================

Difficulty
----------

2 out of 5

Abstract
--------

Do you believe there's no such thing as "too many secrets?" In that case, you may enjoy this service, in which the server hosts messages for sharing between users, but can't actually *read* them (in other words, it's a re-implementation of `0bin <https://github.com/sametmax/0bin>`__.

Must-haves
----------

* Users should be able to create "pads" for sharing text, which are then encrypted via client-side JavaScript using a key stored in the URL hash.
* The server should not at any point have access to the cleartext version of the pad contents.
* Other users should be able to visit the pad URL, with the correct hash, and view the decrypted text.

Nice-to-haves
-------------

* Provide an expiration date, at which point messages are delete from the server.
* Allow the server owner to press a "panic" button and clear all stored messages
* Give users the ability to convert a pad from encrypted to cleartext