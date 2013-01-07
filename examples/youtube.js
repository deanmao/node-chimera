var Chimera = require(__dirname + '/../lib/main').Chimera;
var fs = require('fs');
var jquery = fs.readFileSync(__dirname + '/jquery.js');

var c = new Chimera({libraryCode: '(function() {' + jquery+ '; window.myjquery = jQuery; jQuery.noConflict(true);})()'});
c.perform({
  url: "http://www.youtube.com/user/myjoyonlinetube/featured?v=VTq0q81nx0I",
  run: function(callback) {
    try {
      window.liveInterval = window.liveInterval || setInterval(function() {
        var liveCommentsLink = myjquery('span.live-comments-setting-option');
        if (liveCommentsLink[0]) {
          console.log('enabling live comments');
          liveCommentsLink.click();
          clearInterval(window.liveInterval);
        }
      }, 1000);
      var previousLength = 0;
      window.blah = window.blah || setInterval(function() {
        window.liveCommentsList = window.liveCommentsList || myjquery('#live_comments');
        var length = window.liveCommentsList[0].children.length;
        yt.www.watch.livecomments.setScroll(true);
        if (length != previousLength) {
          previousLength = length;
          var comment = myjquery(window.liveCommentsList[0].children[0]).find('div.comment-text').text();
          callback(null, comment);
        }
      }, 1000);
    } catch (e) {
      console.log('error in the chimera script');
      console.log(e);
    }
  },
  callback: function(err, result) {
    console.log('callback! : ' + result);
  }
});

