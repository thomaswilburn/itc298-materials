Directed lab - Backbone
=======================

Using Backbone, we can structure our client-side code so that it's clear, readable, and easy to maintain. To practice, let's build a simple page component using models and views, taken from an actual interview question.

The page you're building today is an elevator. The view will be the control panel for that elevator and a display of what floor it's on, and the buttons for requesting that it move up and down. The model is the elevator itself and its physical state: where it is and where it's going. The degree of granularity is up to you, so feel free to model more information (weight, speed, door status, restricted floors) if you need additional challenges.

Animation and Time in JavaScript
--------------------------------

Depending on your previous instructor, you may not have talked very much about animation and time when writing client-side code. In JavaScript, the core function to know is ``window.setTimeout``, which runs a function after a delay. For example, the following code will run the function ``sayHello`` after half a second::

    var sayHello = function() {
      console.log("hi there!");
    }

    setTimeout(sayHello, 500);

``setTimeout`` takes two arguments: first the function that we want to call after a delay, and then the number of milliseconds to wait before calling that function. Mozilla has `more documentation <https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setTimeout>`__ if you're interested.

Typically, we create animations or processes over time in JavaScript by setting up a function that schedules itself at regular intervals. In this code, the ``checkElevator`` function is called every second, and then calls additional functions on the elevator model::

    var checkElevator = function() {
      elevator.addCommands();
      elevator.move();
      //schedule the next check
      setTimeout(checkElevator, 1000);
    };
    
    //start the process
    checkElevator();

Steps
-----

Starting a Backbone application can be daunting, because there's much more structure involved compared to a regular jQuery project. It's good to break it down into smaller pieces, and test them individually.

1. Create your elevator model. Think about what its defaults are, and what functions it will need at first. On the console, test it out.
2. Build a view for the model that doesn't do anything, but does correctly render its template based on the model's default information.
3. Get the view to listen to changes in the model, and re-render whenever they're updated.
4. Figure out your events, and hook those up so that they change the model via the view.