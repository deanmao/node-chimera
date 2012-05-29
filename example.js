var Chimera = require('./lib/main');
var fs = require('fs');

var jquerySrc = fs.readFileSync("jquery.js");

var c = new Chimera({
  libraryCode: jquerySrc
});
c.perform({
  url: "http://gmail.com",
  locals: {
    username: "blahblah",
    password: "mypassword"
  },
  run: function(callback) {
    jQuery.noConflict();
    jQuery('#Email').val(username);
    jQuery('#Passwd').val(password);
    callback("", document.cookie);
    jQuery('#signIn').click();
  },
  callback: function(err, result) {
    console.log('==================================');
    console.log("document.cookie: " + result);
    
    c.perform({
      run: function(callback) {
        setTimeout(function() {
          callback(null, document.cookie);
        }, 1000);
      },
      callback: function(err, result) {
        console.log('==================================');
        console.log("final document.cookie: " + result);
        console.log('----------------------------------');
        console.log("final cookies: " + c.cookies())
        console.log('----------------------------------');
      }
    });
  }
});
