Functional programming
======================

By far, the most important concept you must master in JavaScript is the function. Especially if you're coming from other programming languages, you probably think about functions in fairly simple terms: they're effectively user-defined commands. They save us from using copy and paste, by allowing us to package up multiple lines of code and execute them easily. And all those are true of JavaScript as well, but it goes far beyond that.

Let's dig into functions a little bit, and see what makes them so special in this language. First, you should already be aware that functions are first-class values in JavaScript, just like strings, numbers, booleans, and objects. Although there are many ways to define a function, the easiest way is simply to assign them to a variable::

    var f = function() {
      console.log("Hi, I'm a function!");
    };
    
    var g = f;
    
    g(); //logs "Hi, I'm a function!"

In that code block, we can also create new variables that point to the same function, and when we execute them, the same code runs. It's the same as if we had a variable defined as ``12``, and then pointed another variable at the first, causing both of them to have the same value. Note that a function without parentheses means that we are referring to it as a value. By putting parentheses after it, with or without arguments, we are calling that function, and it will evaluate to its return value for the purposes of variable assignment or operations.

Considering that functions are simply variables, and follow the same properties as all other variables, what about function arguments? Can we pass one function into another? Of course! If you've used jQuery or other browser event frameworks, you've done this when setting up event listeners. Here's an example of creating two functions, one of which calls the other::

    var f = function() {
      return true;
    }
    
    //g calls its argument and logs the result
    var g = function(fn) {
      var result = fn();
      console.log(result);
    };
    
    //pass f to g
    g(f); //logs "true"

Functions that take other functions as their input, or produce functions as their output, or both, are what we call "higher-order" functions. Here's another example, in which we create one function (``adder``) that produces new "addX" functions::

    var adder = function(first) {
      return function(second) {
        return first + second;
      }
    };
    
    var add5 = adder(5);
    add5(3); //returns 8
    
    var add2 = adder(2);
    add2(2); //returns 4
    
    adder(3)(3); //returns 6

Higher-order functions let us create new abstractions that separates *what* we do from *how* we do it. The classic example of this is the ``Array.forEach`` method. We can write our own ``each`` function pretty easily, which takes an array and a function, then calls that function on each item in the array via a loop::

    var each = function(items, fn) {
      //loop through the items
      for (var i = 0; i < items.length; i++) {
        //call fn with the item and the index
        fn(items[i], i);
      }
    };
    
    var names = ["Alice", "Bob", "Carla"];
    var greet = function(name) {
      console.log("Hello " + name);
    };
    
    each(names, greet); //logs "Hello Alice", "Hello Bob", "Hello Carla"

Of course, this function is extremely helpful for writing clear, readable array code, but it's useless for asynchronous situations as are common in Node. To get around that, we need to look at how the ``async.each`` function works.

Asynchronous code, callbacks, and iterators
-------------------------------------------

First, let's set up a simulated asynchronous function call. We'll use the ``setTimeout`` built-in function, which calls its first argument after a certain number of milliseconds. For example, this code waits one second, then logs "done"::

    setTimeout(function() { console.log("done") }, 1000);

Our ``doubleAsync`` function pauses for a random amount of time up to one second, then returns its initial input times two by calling the callback function, Node-style::

    var doubleAsync = function(input, callback) {
      //delay time from 1-1000 ms
      var wait = Math.round(Math.random() * 1000);
      setTimeout(function() {
        //null because no errors
        callback(null, input * 2);
      }, wait);
    };
    
    //this will log 4 after a random delay
    doubleAsync(2, function(err, result) {
      console.log(result);
    });

In order to get the result of an asynchronous operation, we must pass in a function to be called once the process is complete. We can't simply set an item equal to the return value, because (at the time that the function is called) there is no return value, because we're still waiting! A callback lets us be notified when the result is actually available, sometime after the original call has completed.

Now, what if we want to double each item in an array, but using our asynchronous function? This won't work::

    var numbers = [1, 2, 3];
    
    //won't work, because doubleAsync doesn't return anything immediately
    for (var i = 0; i < numbers.length; i++) {
      numbers[i] = doubleAsync(numbers[i]);
    }
    
    //this will technically work, but output will be shuffled...
    var output = [];
    for (var i = 0; i < numbers.length; i++) {
      doubleAsync(numbers[i], function(err, result) {
        output.push(result);
      });
    }
    //...and it'll be empty right now because of the delay
    console.log(output.length); // 0
    
We need to do two things in order to work with lists asynchronously. First, we need to keep track of how many items have been been processed, so that we can write code that only runs after the whole list operation is done. Let's start with that::

    var asyncEach = function(list, fn, completed) {
      //counter variable to track completed items
      var counter = 0;
      //loop through, incrementing counter each time
      list.forEach(function iter(item, i) {
        //call the async function on each item
        fn(item, function check(err, result) {
          //when that function completes, increment counter
          counter++;
          if (counter == list.length) {
            //call completed when all items are done
            completed();
          }
        });
      });
    };

This code is a lot to dig through, so let's look at what happens for a single item of a list we pass in. We call ``asyncEach`` and pass in an array, an "iterator" function that's called on each item, and a final function to be called when everything is done. Inside ``asyncEach``, the list is looped via ``forEach`` and each item and its index are passed to inner function ``iter``. Inside *that* function, we call the actual asynchronous code that the user passed in, and we provide ``check`` as its callback. When the user calls that callback, ``check`` adds one to the counter, and once it reaches the same as the list length all items are complete, so we finally call the ``completed`` function.

The second requirement for handling a list asynchronously is that we need to be able to process the list out of order, but still get the results in the same order that they were in the original array. To do that, we just need to add a few new lines, one to construct the result array, one to assign the results, and one to pass it to the final callback. This is no longer an "each" loop, it's become a "map"::

    var asyncMap = function(list, fn, completed) {
      var counter = 0;
      //NEW LINE: create empty array
      var output = [];
      list.forEach(function(item, i) {
        fn(item, function(err, result) {
          //NEW LINE: assign the result to the same slot
          output[i] = result;
          counter++
          if (counter == list.length) {
            //UPDATED: provide the output to the completed callback
            completed(null, output);
          }
        });
      });
    };
    
    //let's use it!
    var numbers = [1, 2, 3];
    asyncMap(numbers, doubleAsync, function(err, result) {
      //it'll take some time, but this should log out [2, 4, 6]
      console.log(result);
    });

Obviously, this code is complicated, and we wouldn't want to write it every time: that's why we have the ``async`` module. But it is useful to know how the module works, since it illustrates a great deal about how asynchronicity works, and how JavaScript's functions let us manage it through careful programming and conventions like the "callback last" argument order.
