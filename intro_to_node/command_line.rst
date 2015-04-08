Command line basics for Node
============================

Using the Bash command line is an important part of being able to use Node, or any other server-side programming language. This tutorial will walk you through the basics of using Bash to navigate and alter the filesystem, and to launch Node in both REPL and scripting modes.

Starting a shell
----------------

On both Mac and Windows, the easiest way to launch Bash is through GitHub's GUI interface (`Mac <http://mac.github.com>`__/`Windows <http://windows.github.com>`__). Create or clone a repo, then right-click on the repo name in the left-most panel and choose "Open in Terminal" or "Open in Git Shell" from the menu. On Windows, you may need to select "Git Bash" as your shell in the GitHub options if you see a Powershell window appear instead. However, most of these commands will actually work across both Bash and Powershell.

GitHub for Windows also comes with a start menu shortcut to open Git Shell directly to your home directory, if you do not have a repo yet. On a Mac, you can simply open the Terminal application to get access to the built-in Bash shell.

The normal Bash prompt is a ``$``, although there may be additional information depending on your computer's configuration. Whenever you see that in the following examples, it means to run the command from the Bash prompt. By contrast, if you see a ``>`` at the start of the example, it should be run from the Node REPL (i.e., after starting the ``node`` command).

Navigating
----------

Moving around the hard drive is not terribly difficult. The ``cd`` command, or "change directory," will let you navigate up or down into a folder. If you ever get lost, it's important to remember the special ``~`` directory, which is always available, and will take you to your home folder. For example, you can type the following at the prompt to get back home::

    $ cd ~

You can also ask the shell to print your current location with the ``pwd`` command, which can be useful if you get lost or your shell doesn't show this information by default (many shells are set up to only show the current directory).

Inside a directory, we can see the files that are available by typing ``ls`` for "list," and navigate into a directory by typing ``cd`` followed by its name. The tab key will autocomplete filenames for you. If you want to go up to the parent directory, use the special ``cd ..`` command: just like in URLs, ``.`` is the current directory, and ``..`` is the directory one level up. For example, we might navigate a set of folders like so::

    $ ls
    AppData
    Desktop
    Documents
    Music
    $ cd Documents
    $ cd GitHub
    $ cd itc298-materials
    $ pwd
    /c/users/twilburn/Documents/GitHub/itc298-materials
    $ cd ../Caret
    $ pwd
    /c/users/twilburn/Documents/GitHub/Caret

You can make a new folder in the current location with the ``mkdir`` command, and remove it with ``rmdir``. However, it may be easier for you to manage these kinds of tasks through the Finder or Explorer. On Windows, you can open the current directory in a graphical window by running the all-purpose ``start`` command, like so: ``start .`` On a Mac, the ``open`` command performs the same task, so ``open .`` will show a Finder window at the current location.

Starting Node and NPM
---------------------

To run Node in interactive mode, you can start it with the ``node`` command. This will switch you to the Node command line, where you can run JavaScript one line at a time. To leave Node (or to cancel any command-line process if you get stuck), press Ctrl-C. Running Node will change the prompt visibly::

    $ node
    > //look, we're at a new prompt!
    > console.log("Hello, world!");
    Hello, world!
    undefined
    > //Now I'll press Ctrl-C to quit
    (^C again to quit)
    > //One more time
    $

You can also run a Node script (a .js file) instead of typing it in one line at a time, just by specifying the starting file after the ``node`` command. So you might type ``node index.js`` to run the script contained in index.js.

More resources
--------------

The command line is a tremendously important skill if you want to be a modern web developer. I spend most of my day in a shell, or with a shell running, in order to gain access to tools and accomplish tasks quickly (which would otherwise take a long time using the mouse). Luckily, it's not something you have to become an expert in immediately. The above commands will get you through a lot of tools, and you can pick up the rest as you go along. However, if you're interested in exploring further, the following free e-books may be good resources:

* `Learn the Command Line the Hard Way <http://cli.learncodethehardway.org/book/>`__ by Zed Shaw
* `The Linux Command Line <http://linuxcommand.org/tlcl.php>`__ by William Shotts
