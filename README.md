# Chimera: A new kind of phantom for NodeJS

I was inspired by [PhantomJS](http://phantomjs.org) and wanted something similar, but could be run inside of the nodejs
environment, without calling out to an external process.  PhantomJS is run as an external process that users can run
under any language, however one must create a fancy glue wrapper so that development isn't impaired.  I created
something that does exactly what phantomjs is capable of doing, except in a full js environment, called Chimera.

## Installation

Installing is simple via npm:

    npm install chimera
    
It will download the native chimera binary in the postinstall script.  Currently we have binaries for 64bit darwin (mac),
and 64bit linux.  If you use something different, you may have to compile your own or wait for me to build one for your
platform.

## Usage

The most basic skeleton should look something like this:

    var Chimera = require('chimera').Chimera;

    var c = new Chimera();
    c.perform({
      url: "http://www.google.com",
      locals: {

      },
      run: function(callback) {
        callback(null, "success");
      },
      callback: function(err, result) {
    
      }
    });

When you instantiate a new chimera with `new Chimera()`, you're actually creating a new browser instance which does
not share session data with other browser sessions.  It has it's own in memory cookie database and url history.  

The `locals` hash should contain variables you wish to pass to the web page.  These values should be types that can be
turned into json because the sandboxing environment of the browser's js engine prevents us from passing actual nodejs
variable references.

The `run` function is run immediately as the page is loaded.  You may wish to wait until the entire page is loaded 
before you perform your logic, so you'd have to do the same stuff that you'd do in normal javascript embedded in
webpages.  For example, if you were using jquery, you'd be doing the standard `$(document).ready(function(){stuff})`
type of code to wait for the page to fully load.  Keep in mind that the run function is run inside the webpage
so you won't have access to any scoped variables in nodejs.  The `callback` parameter should be called when you're
ready to pause the browser instance and pass control back to the nodejs world.

The `callback` function is run in the nodejs context so you'll have access to scoped variables as usual.  This 
function is called when you call the callback function from inside of `run()`.

## Chimera options

    var c = new Chimera({
      userAgent: 'Mozilla/5.0 (Windows NT 6.2) AppleWebKit/536.6 (KHTML, like Gecko) Chrome/20.0.1090.0 Safari/536.6',
      libraryCode: '(function() { window.my_special_variable = 1234; })()',
      cookies: '',
      disableImages: true
    });
    
Here are all the possible options available when creating a new browser instance:

- `userAgent`: Any string that represents a user agent.  By default it uses the one shown in the example, a windows chrome browser.
- `libraryCode`: If you want to inject jquery into all your webpages, you should do something like `fs.readFileSync("jquery.js")` here.
- `cookies`: as seen in later examples, you can save the cookies from a previous browser instance and use them here
- `disableImages`: If you don't need images in your scraper, this can drastically reduce memory and speed up webpages.  However, your screenshots may look like crap.

## A simple login example

In the example code below, we show how to login to a website using a native mouse button click on the submit button, then load a second
browser instance using the logged in cookies from the first browser instance.

    var Chimera = require('chimera').Chimera;

    var myUsername = "my_username";
    var myPassword = "my_password";

    var c = new Chimera();
    c.perform({
      url: "http://www.mywebsite.com",
      locals: {
        username: myUsername,
        password: myPassword
      },
      run: function(callback) {
        // find the form fields and press submit
        pos = jQuery('#login-button').offset()
        window.chimera.sendEvent("click", pos.left + 10, pos.top + 10)
      },
      callback: function(err, result) {
        // capture a screen shot
        c.capture("screenshot.png");

        // save the cookies and close out the browser session
        var cookies = c.cookies();
        c.close();
    
        // Create a new browser session with cookies from the previous session
        var c2 = new Chimera({
          cookies: cookies
        });
        c2.perform({
          url: "http://www.mywebsite.com",
          run: function(callback) {
            // You're logged in here!
          },
          callback: function(err, result) {
            // capture a screen shot that shows we're logged in
            c2.capture("screenshot_logged_in.png");
            c2.close();
          }
        });
      }
    });
    
### A few notes

In the example above, you may notice `window.chimera.sendEvent()`.  The `chimera` variable is a global inside webpages and
allow you to call functions that you otherwise wouldn't be able to.  You can take a screenshot with `chimera.capture()` for
example.

When we are in the callback() for the first browser instance, we nab the cookies via `c.cookies()`.  If you inspect the
cookies, you'll see that it's just a giant string containing the domain, keys, and values.  This may contain http & https
cookies as well, which are normally not accessible via javascript from inside the webpage.  You'll also probably notice
there are cookies from tracking companies like google analytics or mixpanel.  The cookies string will basically contain
everything that a browser may have.  If you want to remove the google analytics cookies, you'll have to parse the cookie
string and remove them manually yourself.  There are many cookie parsers out there -- check out the one that is included in
the expressjs middleware if you need something quick and dirty.

## A bad example

Here's a few things that you should not do.

    var c = new Chimera();
    var fs = require('fs');
    c.perform({
      url: "http://www.mywebsite.com",
      locals: {
        fs: fs
      },
      run: function(callback) {
        var os = require('os');
      },
      callback: function(err, result) {
        
      }
    });
    
In the above example, we try to pass the `fs` variable as a local variable.  We can't do this because `fs` cannot be 
turned into a json string.  Just because it looks like it might work, it won't.  The sandbox in the web browser
prevents scoped variables from being available.

A second thing wrong is that the `run()` function doesn't perform the callback function with `callback()`.  If you do
this, the context will never be passed back to the nodejs world so you'll be wondering why you can't scrape anything.

The third thing wrong here is that inside the `run()` function, we're trying to call `require('os')`.  The require
function pulls from the nodejs scoped context which isn't available inside the webpage.  You only have access to typical
variables in a webpage like `window.document` etc.

## Compiling your own version

Since this library does use native libraries, I may not have a native version for your platform (people have been asking
me about arm-linux and sunos).  Hopefully I can describe how one can compile this under your platform, and perhaps we can
move to something easier.  

### Compiling on the mac:

Getting a binary on the mac is fairly easy, but it does take a long time to compile Qt.  Unlike Linux, you don't need
the custom openssl included with chimera.  Here's the basic steps to take the mac:

    ./scripts/compile_qt.sh
    ./scripts/compile_binary.sh
    
The final binary should be inside of node-chimera/lib.


### Compiling on linux:

You'll need the ssl headers, freetype, and fontconfig libraries first, so you'll have to install with a command like:

    apt-get install libfreetype6-dev libfontconfig1-dev libssl-dev

Since nodejs comes with it's own version of ssl, we have to make Qt also use this version of ssl or else we'll have segfaults.
Compile the openssl included first (we have some additional flags like `-fPIC` which allow the libraries to be statically included
later on).  Here are all the steps required to build chimera:

    ./scripts/compile_openssl.sh
    ./scripts/compile_qt.sh
    ./scripts/compile_binary.sh
    
The final chimera.node binary should exist inside the node-chimera/lib directory.  If you don't see it in there, something bad
probably happened along the way.
