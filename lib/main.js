// var oldDir = process.cwd();
// try {
//   process.chdir(__dirname + '/../deps/qt-4.8.0/' + process.platform + '/' + process.arch + '/lib');
// } catch (e) {
//   console.log(e);
// }
var webkit = require(__dirname + '/../build/Release/chimera.node');
// process.chdir(oldDir);

setInterval(function() {
  webkit.processEvents();
}, 200);

function Chimera(options) {
  options = options || {};
  var userAgent = options.userAgent || "Mozilla/5.0 (Windows NT 6.2) AppleWebKit/536.6 (KHTML, like Gecko) Chrome/20.0.1090.0 Safari/536.6";
  var libraryCode = '(function(){'+ (options.libraryCode || '') + '})()';
  var cookies = options.cookies || '';
  var browser = new webkit.Browser(userAgent, libraryCode, cookies);
  this.browser = browser;
  var self = this;
}

Chimera.prototype.cookies = function() {
  return this.browser.cookies();
};

Chimera.prototype.perform = function(options) {
  options = options || {};
  var url = options.url;
  var locals = options.locals || {};
  var run = 'with('+JSON.stringify(locals)+'){(' + (options.run || function(callback) {callback(null, "");}) + ')(function(err,res) {window.chimera.callback(JSON.stringify(err), JSON.stringify(res));})}';
  var callback = options.callback || function(err, result) {};
  this.browser.open(url, run, function(errStr, resStr) {
    callback(errStr && JSON.parse(errStr), resStr && JSON.parse(resStr));
  });
}

module.exports = Chimera;
