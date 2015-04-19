Functional programming
======================

By far, the most important you must master in JavaScript is the function. Especially if you're coming from other programming languages, you probably think about functions in fairly simple terms: they're effectively user-defined commands. They save us from using copy and paste, by allowing us to package up multiple lines of code and execute them easily. And all those are true of JavaScript as well, but they go far beyond that.

Let's dig into functions a little bit, and see what makes them so special in this language. First, you should already be aware that functions are first-class values in JavaScript, just like strings, numbers, booleans, and objects. Although there are many ways to define a function, the easiest way is simply to assign them to a variable::

    var f = function() {
      console.log("Hi, I'm a function!");
    };
    
    var g = f;
    
    g(); //logs "Hi, I'm a function!"

In that code block, we can also create new variables that point to the same function, and when we execute them, the same code runs. It's the same as if we had a variable defined as ``12``, and then pointed another variable at the first, causing both of them to have the same value.

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

