Intro to Backbone
=================

Although it is not the most advanced framework available, and it's not my personal preference, it is hard to avoid the incredible influence that Backbone had on the client-side JavaScript community. At a time when most projects were either a puddle of jQuery soup or an intimidating Java-inspired architecture, Backbone gave many front-end developers their first taste of what MVC could do for them, without overwhelming them in details or software patterns. Even more than five years later, it's worth using Backbone as an introduction to this basic application structure.

Starting our tour
-----------------

In fact, for this guide, we'll be using Backbone to take a quick tour around modern client application development, including (but not limited to) MVC architecture. The best place to begin is with the M, our model. After all, our models are our data, and starting with data is always a wise decision as a programmer.

Backbone objects are created by customizing its built-in objects with the ``extend()`` method. We're going to make a calculator application, and so we need to create a model that encapsulates the calculator's state (what it's current value is, what the user has typed, what operation is in progress, that kind of thing). Here's a simple model being created and instantiated::

    var CalculatorModel = Backbone.Model.extend({
      defaults: {
        value: 0,
        input: 0
      },
      doMath: function(operation) {
        var value = this.get("value");
        var input = this.get("input");
        var result;
        if (operation == "add") {
          result = value + input;
        }
        if (operation == "subtract") {
          result = value - input;
        }
        this.set("value", result);
        this.set("input", 0);
      }
    });
    
    var calc = new CalculatorModel();

You'll notice the weird indirection there inside the ``doMath`` function, where we use ``get()`` and ``set()`` instead of simply accessing our model's properties. The reason for this is that Backbone models are "observable:" they fire events when their properties are changed. We can subscribe to these events pretty easily, and see when they're altered::

    calc.on("change:input", function(model, newValue) {
      console.log("The new value is:", newValue);
    });
    
    calc.set("input", 2); // logs: "The new value is: 2"

Observable objects are easy to connect together, and they let us automatically refresh the page when the data that backs it has changed. That responsibility lies with views, which is our next topic under consideration.

Using lodash templates
----------------------

Before we jump into views, let's open at a slightly more fundamental level, with client-side templating. Although it's possible (and, in fact, valuable) to use Handlebars for templates in the browser, we're going to use the `lodash <https://lodash.com/>`__ library, since Backbone requires it anyway.

Load lodash and jQuery from from `cdnjs <http://cdnjs.com>`__, and then add the following script tag to the page::

    <script type="text/html" id="hello-template">
      Hello, <%= name %>!
    </script>

Because this script is marked as a non-JavaScript type, the browser just ignores it. We can still get its contents, however. We'll use lodash's ``_.template()`` method to create a new template function from that string::

    //get the contents
    var html = $("#hello-template").html();
    //convert to a template function
    var template = _.template(html);
    //call template with our data
    template({name: "World"}); //"Hello, World!"

lodash uses ``<%= variable %>`` instead of ``{{variable}}``, and it allows us to embed real JavaScript in our templates, but otherwise this process is very similar to the way that Handlebars works.

Building a view
---------------

Once we have templates, we can construct a Backbone view, which combines a template::

    <script type="text/html" id="calc-template">
      <div class="value"><%= value %></div>
      <input class="input">
      <button class="operation" data-op="add">+</button>
      <button class="operation" data-op="subtract">-</button>
    </script>

With a view that uses it::

    var CalculatorView = Backbone.View.extend({
      el: "body", //use the whole page - not typical
      template: _.template($("#calc-template").html()),
      initialize: function() {
        this.listenTo(this.model, "change:value", this.render);
      },
      events: {
        "click .operation": "operateCalc",
        "keyup .input": "updateInput"
      },
      operateCalc: function(e) {
        //get the data-op attribute
        var operation = $(e.target).attr("data-op");
        this.model.operate(operation);
      },
      updateInput: function(e) {
        this.model.set("input", e.target.value * 1);
      },
      render: function() {
        var data = this.model.toJSON();
        this.$el.html(this.template(data));
      }
    });
    
    var view = new CalculatorView({
      model: calc
    });
    view.render();

The responsibility of a view is to connect a model to the screen for input and output. It does so by rendering the model into the template for output (after converting it to a regular, non-Backbone object with the ``toJSON()`` function), and by connecting event listeners from the ``events`` config object for input.

When we define this view, for simplicity's sake, we're going to tell it to use the body of the document for its element. Typically, we would set this when calling the ``new CalculatorView()`` constructor, but this makes for a simpler demonstration. We do pass in the model for this view, which is the ``calc`` object we created above. In the ``initialize`` method, which is called whenever the object is created, we tell our view to listen to its model, and to re-render itself whenever the model fires a "change" event for its ``value`` attribute.

Tying it together
-----------------

When you use this page now, you should see an input form with a value (starting at 0) above it. Let's say that you type into the input box with a number. The following steps will occur:

1. The ``keyup`` event will trigger in the browser.
2. Our view, which registered for "keyup .input", calls the ``updateInput`` function.
3. ``updateInput`` gets the value of the input field and sets the calculator's ``input`` attribute to that value.

Next, you might press the + button to add two numbers together. That triggers another sequence:

1. The ``click`` event triggers on a button with a class of "operation".
2. Our view triggers its ``operateCalc`` method, which was registered for "click .operation" in its ``events`` config.
3. ``operateCalc`` gets the operation from the button's data attribute, then calls the model's ``doMath()`` function with that operation.
4. Our calculator adds the numbers together, and sets its ``value`` attribute to the result.
5. Because our view listens to "change:value" events on our model, this causes the view to re-render itself with the new result, thus updating the page and letting us see the final calculation.

This behavior sequence is quite sophisticated, but it's relatively simple to configure. Backbone holds our hand through much of the process if we'll let it, connecting models to views and vice versa, so tht each is able to react to changes in the other appropriately.