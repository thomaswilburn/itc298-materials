Directed Lab - Hapi Server
==========================

We're going to start writing real web apps this week, starting with the server. Using Hapi, we'll create a simple RESTful app that uses Handlebars for its templates and maintains state apart from its routing.

Create a Hapi server that listens on port 8000, and load the following excerpt from the Plan 9 ``fortune`` file::

    Never buy a case of wine with eleven bottles.
    Never call a man a fool.  Borrow from him.
    Never eat anything bigger than your head.
    Never eat in a restaurant that rotates or is above the 10th floor.
    Never eat rutabaga on any day of the week that has a "y" in it.
    Never give a inch!
    Never hatchet your Counts before they chicken.
    Never lick a gift horse in the mouth.
    Never put off till tomorrow what you can avoid altogether.
    Never speak ill of yourself; your friends will always say enough on that subject.
    Never stow away on a kamikaze plane.
    Never worry the boss unnecessarily.  Don't tell him.

Create routes that service the following URLs, with appropriate actions in response:

* ``localhost:8000`` - show a "get fortune" link that goes to the ``/fortune`` page.
* ``localhost:8000/fortune`` - show a random entry from the fortunes list.
* ``localhost:8000/fortune/X`` - show a specific fortune from the list, where X is the numerical index of that fortune

Required modules
----------------

* ``hapi``
* ``async``
* ``handlebars``

Steps
-----

* First get a server running, including the Handlebars templating engine. Refer to what we did on Tuesday, but do not simply copy it.
* Start with the landing page template. It should be pretty easy: there's no Handlebars on this page, just HTML.
* After that, it's probably easier to get the individual fortune route running first, because there's no math involved.
* Finally, use ``Math.round()`` and ``Math.random()`` to pick a random fortune, and get that page running.