var oldDir = process.cwd();
try {
  process.chdir(__dirname + '/../deps/qt-4.8.0/' + process.platform + '/' + process.arch + '/lib');
} catch (e) {
  console.log(e);
}
var webkit = require(__dirname + '/../build/Release/chimera.node');
process.chdir(oldDir);

setInterval(function() {
  webkit.processEvents();
}, 200);

function Chimera(options) {
  var browser = new webkit.Browser;
  this.browser = browser;
  var self = this;
}

Chimera.prototype.perform = function(options) {
  options = options || {};
  var url = options.url;
  var run = '(' + (options.run || function(callback) {callback(null, "");}) + ')(window.chimera.callback)';
  var callback = options.callback || function(err, result) {};
  this.browser.open(url, run, callback);
}

module.exports = Chimera;
