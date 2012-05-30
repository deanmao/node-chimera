var Chimera = require('./lib/main').Chimera;

var myUsername = "john01sample";
var myPassword = "newsample";

var c = new Chimera();
c.perform({
  url: "http://digg.com",
  locals: {
    username: myUsername,
    password: myPassword
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
          chimera.sendEvent("click", pos.left + 5, pos.top + 5);
        }, 1000);
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
    c.setCookies("");
    c.perform({
      url: "http://digg.com",
      run: function(callback) {
        setTimeout(function() {
          callback(null, "success");
        }, 500);
      },
      callback: function(err, result) {
        console.log('capture screen shot 2');
        c.capture("screenshot2.png");
      }
    });
  }
});
