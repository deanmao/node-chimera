var webkit = require('./lib/main');
var Chimera = webkit.Chimera;
var fs = require('fs');

var jquerySrc = fs.readFileSync("jquery.js");

function sendEmail(address, subject, content, cookies) {
  console.log("Going to send some email...");
  var c2 = new Chimera({
    libraryCode: jquerySrc,
    cookies: cookies
  });
  c2.perform({
    url: "https://mail.google.com/mail/u/0/#compose",
    locals: {
      address: address,
      subject: subject,
      content: content
    },
    run: function(callback) {
      setTimeout(function() {
        jQuery(document.getElementById(':zz')).val(address);
        jQuery(document.getElementById(':yk')).val(subject);
        jQuery(document.getElementById(':10n')).text(content);
        window.chimera.render("output.png");
        callback(null, jQuery(document.getElementById(':10n')).text());
        jQuery(document.getElementById(':za')).click();
      }, 1000);
    },
    callback: function(err, result) {
      console.log('==================================');
      console.log('sending using body text: ' + result);
      console.log("c2 cookies are:");
      console.log(c2.cookies());
    }
  });
}

for(var i=0; i<20; i++) {
  (function() {
    var index = i;
    var c = new Chimera({
      libraryCode: jquerySrc
    });
    c.perform({
      url: "http://gmail.com",
      locals: {
        username: "asdf",
        password: "asdf"
      },
      run: function(callback) {
        jQuery.noConflict();
        jQuery('#Email').val(username);
        jQuery('#Passwd').val(password);
        document.getElementById('signIn').click();
        callback("", document.cookie);
      },
      callback: function(err, result) {
        // console.log('==================================');
        // console.log("document.cookie: " + result);
    
        c.perform({
          locals: {
            filename: "output"+index+".png"
          },
          run: function(callback) {
            setTimeout(function() {
              chimera.render(filename);
              callback(null, document.cookie);
            }, 2000);
          },
          callback: function(err, result) {
            // console.log('==================================');
            // console.log("final document.cookie: " + result);
            console.log('----------------------------------');
            console.log("final cookies: " + c.cookies())
            console.log('----------------------------------');
        
            setTimeout(function() {
              console.log('closing out...');
              c.close();
            }, 1000);
        
            // sendEmail("deanmao@gmail.com", "my subject", "hello, how are you today?", c.cookies());
          }
        });
      }
    });
  })();
}
