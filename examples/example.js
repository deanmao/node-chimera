var Chimera = require(__dirname + '/../lib/main').Chimera;

var myUsername = "john02sample01";
var myPassword = "newsample";

var c = new Chimera();
c.perform({
  url: "http://www.reddit.com",
  locals: {
    username: myUsername,
    password: myPassword
  },
  run: function(callback) {
    try {
      var loginForm = jQuery('#login_login-main');
      if (loginForm[0]) {
        console.log('found login form');
        loginForm.find('input[name=user]').val(username);
        loginForm.find('input[name=passwd]').val(password);
        var pos = loginForm.find('button').offset();
        console.log('clicking submit');
        chimera.sendEvent("click", pos.left + 5, pos.top + 5);
        chimera.capture("logged_out.png");
      } else if (jQuery('span.userkarma')[0]) {
        console.log('we are logged in!');
        callback(null, "success!");
      }
    } catch (e) {
      console.log('error in the chimera script');
      console.log(e);
    }
  },
  callback: function(err, result) {
    console.log('capture screen shot');
    c.capture("logged_in.png");
    c.close();
  }
});
