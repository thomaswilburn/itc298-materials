Directed Lab - async.series
===========================

In class this week, we wrote our own version of ``async.each`` together. This week, we're going to take on ``async.series``, which operates in a slightly different fashion: instead of processing a list of items in parallel, ``series`` runs a list of functions one after another. Unlike ``async.waterfall``, it does not pass the result of the each function to the next, so we don't have to worry about that.

Here's the description, straight from the ``async`` manual page:

    Run the functions in the tasks array in series, each one running once the previous function has completed. If any functions in the series pass an error to its callback, no more functions are run, and callback is immediately called with the value of the error. Otherwise, callback receives an array of results when tasks have completed.
    
    Arguments:
    
    * ``tasks`` - An array or object containing functions to run, each function is passed a ``callback(err, result)`` it must call on completion with an error ``err`` (which can be null) and an optional ``result`` value.
    * ``callback(err, results)`` - An optional callback to run once all the functions have completed. This function gets a results array (or object) containing all the result arguments passed to the task callbacks.

There are no required modules for this activity, and we'll talk about any bootstrap code that you may need. Assuming that you named your function ``asyncSeries``, the following code should produce a list of numbers from 1 to 3 in order when run::

    asyncSeries([
      function(callback) {
        console.log(1);
        callback();
      }, function(callback) {
        setTimeout(function() {
          console.log(2);
          callback();
        }, 1000);
      }, console.log.bind(console, 3);
    ], function(err) {
      console.log("This should not run unless there are errors.");
    });

(No, the ``console.log.bind()`` code is not something we've done before. I'm just sneaking it in for debugging purposes. But I'd be more than happy to talk to you about it.)

Thoughts to ponder
------------------

* You're going to be passed an array of function values. Start by thinking about how you would loop through and run each function in the array.
* Clearly, you're going to need to keep track of how far you've gotten through the list of functions, so that you can run the next function when each one completes.
* A big part of the secret is in the callback function that's passed to each individual function. Think carefully about what it needs to do in order to start the next item.
* I don't recommend looking at the code to ``async``'s implementation for help: it's written in a very convoluted style. Ours will be much more straight-forward.

Steps
-----

As always, breaking down our reasoning will make our process much easier to understand:

* Start by logging out each function in turn.
* Try looping through each function synchronously, passing each one a callback function that just logs the index of the completed function.
* Now loop through each item, but add one to a counter variable each time your callback is called.
* Remove the loop: how can you use just the callback and the counter variable to call the next item as an "implied" loop?
