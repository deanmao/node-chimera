var Chimera = require(__dirname + '/../lib/main').Chimera;
var fs = require('fs');
var jquery = fs.readFileSync(__dirname + '/jquery.js');

var myUsername = "gkkc1adk@receiveee.chickenkiller.com";
var myPassword = "newsample";

var c = new Chimera({libraryCode: '(function() {' + jquery+ '; window.myjquery = jQuery; jQuery.noConflict(true);})()'});
c.perform({
  url: "http://www.linkedin.com",
  locals: {
    username: myUsername,
    password: myPassword
  },
  run: function(callback) {
    try {
      console.log('our location: '+window.location.toString());
      var loginForm = myjquery('#login');
      if (loginForm[0]) {
        console.log('found login form');
        loginForm.find('input[name=session_key]').val(username);
        loginForm.find('input[name=session_password]').val(password);
        var pos = loginForm.find('#signin').offset();
        console.log(pos.left + '-' + pos.top);
        chimera.capture("logged_out.png");
        chimera.sendEvent("click", pos.left + 5, pos.top + 5);
      } else if (myjquery('a.username')[0]) {
        console.log('we are logged in!');
      }
    } catch (e) {
      console.log('error in the chimera script');
      console.log(e);
    }
  },
  callback: function(err, result) {
    console.log('All scripts are done');
    c.close();
  }
});

