# Chimera: A new kind of phantom for NodeJS

I was inspired by [PhantomJS](http://phantomjs.org) and wanted something similar, but could be run inside of the nodejs
environment, without calling out to an external process.  PhantomJS is run as an external process that users can run
under any language, however one must create a fancy glue wrapper so that development isn't impaired.  I created
something that does exactly what phantomjs is capable of doing, except in a full js environment, called Chimera.

## Installation

Installing is simple via npm:

    npm install chimera

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

The 'callback' function is run in the nodejs context so you'll have access to scoped variables as usual.  This 
function is called when you call the callback function from inside of `run()`.

## Chimera options

    var c = new Chimera({
      userAgent: 'Mozilla/5.0 (Windows NT 6.2) AppleWebKit/536.6 (KHTML, like Gecko) Chrome/20.0.1090.0 Safari/536.6',
      libraryCode: '(function() { window.my_special_variable = 1234; })()',
      cookies: '',
      disableImages: true
    });
    
Here are all the possible options available when creating a new browser instance:

- userAgent: Any string that represents a user agent.  By default it uses the one shown in the example, a windows chrome browser.
- libraryCode: If you want to inject jquery into all your webpages, you should do something like `fs.readFileSync("jquery.js")` here.
- cookies: as seen in later examples, you can save the cookies from a previous browser instance and use them here
- disableImages: If you don't need images in your scraper, this can drastically reduce memory and speed up webpages.  However, your screenshots may look like crap.

## Compiling your own version

Since this library does use native libraries, I may not have a native version for your platform (people have been asking
me about arm-linux and sunos).  Hopefully I can describe how one can compile this under your platform, and perhaps we can
move to something easier.  

I've included a full copy of the qt source, but I've yet do write the scripts necessary to compile everything.  Stay tuned,
I'll update all of this soon.
