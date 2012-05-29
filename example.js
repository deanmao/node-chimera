var Chimera = require('./lib/main');

var c = new Chimera({
  libraryCode: "window.whatever = \"zzzzzz\";",
  cookies: "k=69.181.249.220.1338265858459430; expires=Tue, 05-Jun-2012 04:30:58 GMT; domain=.twitter.com; path=/guest_id=v1%3A133826585846559688; expires=Thu, 29-May-2014 04:30:58 GMT; domain=.twitter.com; path=/_mobile_sess=BAh7BzoQX2NzcmZfdG9rZW4iGTQ0ODc3YjQxMzVlZDY3OTg5NjEyOg9zZXNzaW9uX2lkIiViNjk4NGIwOTAyZTgyOGI4MTk0MjM4ZDJlYzM5ODNhZQ%3D%3D--6d0d51ad047eca2e2199c9663c79421c5dd58279; expires=Wed, 25-Jul-2012 00:52:36 GMT; domain=mobile.twitter.com; path=/"
});
c.perform({
  url: "http://mobile.twitter.com/deanmao",
  locals: {
    yourName: "Johnson"
  },
  run: function(callback) {
    console.log('inside browser 1: '+window.location);
    console.log('your name: '+yourName);
    console.log('whatever: '+window.whatever);
    document.cookies = "asdf=1";
    callback("", document.cookies);
  },
  callback: function(err, result) {
    console.log("got the result: " + result);
    console.log("got the cookies: " + c.cookies())
    
    c.perform({
      run: function(callback) {
        console.log('running without a url: ' + window.location);
        console.log('cookies: ' + document.cookies);
        callback(null, "whatever");
      },
      callback: function(err, result) {
        console.log("result without url is: " + result);
        console.log("final cookies: " + c.cookies())
      }
    });
  }
});
