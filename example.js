var Chimera = require('./lib/main').Chimera;

var c = new Chimera({
  cookies: ""
});
c.perform({
  url: "http://digg.com",
  locals: {
    username: "john01sample",
    password: "newsample"
  },
  run: function(callback) {
    setTimeout(function() {
      // Digg prompts new visitors with a modal greeting dialog
      if (jQuery('a.modal-close-inline').length > 0) {
        jQuery('a.modal-close-inline').click();
        // Click the login button via jquery
        jQuery('#modal-login').click();
        // We have to set a timeout because it takes some time for
        // the login dialog to animate in
        setTimeout(function() {
          jQuery('#ident').val(username);
          jQuery('#password').val(password);
          var pos = jQuery('#login-button').offset();
          // Click the submit button using a native mouse cursor
          chimera.sendEvent("click", pos.left + 10, pos.top + 10);
        }, 500);
      } else {
        // If we don't see the modal greeting dialog, that means
        // we are on the page after login.  We will now make the
        // call to put us back into nodejs
        setTimeout(function() {
          callback(null, "success");
        }, 1000);
      }
    }, 1000);
  },
  callback: function(err, result) {
    console.log('capture screen shot');
    c.capture("screenshot.png");
    var cookies = c.cookies();
    c.close();
    
    // Create a new browser session with cookies from the logged in
    // Digg account
    var c2 = new Chimera({
      cookies: cookies
    });
    c2.perform({
      url: "http://digg.com",
      run: function(callback) {
        setTimeout(function() {
          callback(null, "success");
        }, 1000);
      },
      callback: function(err, result) {
        console.log('capture screen shot that shows we are logged in');
        c2.capture("screenshot_logged_in.png");
        c2.close();
      }
    });
    
    // Create a new browser session without any cookies to show that
    // we can still be incognito if we want to be.
    var c3 = new Chimera({
      cookies: ""
    });
    c3.perform({
      url: "http://digg.com",
      run: function(callback) {
        setTimeout(function() {
          callback(null, "success");
        }, 1000);
      },
      callback: function(err, result) {
        console.log('capture screen shot that shows we are not logged in');
        c3.capture("screenshot_not_logged_in.png");
        c3.close();
      }
    });
  }
});