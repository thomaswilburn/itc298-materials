Project specifications: Scrapebot
=================================

Difficulty
----------

3 out of 5

Abstract
--------

Website monitoring is a wildly useful tool, ranging from site administration to watchdog journalism. For this project, you'll build a Node app that checks the contents of a page for changes, stores them, and sends out an alert via Twitter to let concerned parties know. The choice of site is up to you, but you may want to look at CongressEdits for inspiration.

Must-haves
----------

* Application should check the specified site for changes at a configurable interval.
* When changes occur, it should post a message to a configurable Twitter account with a short note and a link.
* The link should lead to a page with more details on the change.
* The server should also provide an interface for browsing and searching through past changes.

Nice-to-haves
-------------

* Allow users to easily write plugins for different monitored sites.
* Post screenshots/images to Twitter of the updated text.
* Allow users to configure other Twitter accounts that should be direct messaged when changes occur.
* Set categories or criteria depending on the change that occurred (major, minor, tweak)