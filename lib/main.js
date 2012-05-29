// var oldDir = process.cwd();
// try {
//   process.chdir(__dirname + '/../deps/qt-4.8.0/' + process.platform + '/' + process.arch + '/lib');
// } catch (e) {
//   console.log(e);
// }
var webkit = require(__dirname + '/../build/Release/chimera.node');
// process.chdir(oldDir);

var exports = module.exports;
var timer;
var processingEvents = true;

function stop() {
  processingEvents = false;
  clearInterval(timer);
};

function start(intervalMs) {
  intervalMs = intervalMs || 1000;
  if (!processingEvents) {
    processingEvents = true;
    clearInterval(timer);
    var x = function() {
      if (processingEvents) {
        webkit.processEvents();
      }    
    };
    timer = setInterval(function() {
      process.nextTick(x)
    }, intervalMs);
  }
};

function Chimera(options) {
  options = options || {};
  var userAgent = options.userAgent || "Mozilla/5.0 (Windows NT 6.2) AppleWebKit/536.6 (KHTML, like Gecko) Chrome/20.0.1090.0 Safari/536.6";
  var libraryCode = '(function(){'+ (options.libraryCode || '') + '})()';
  var cookies = options.cookies || '';
  var browser = new webkit.Browser(userAgent, libraryCode, cookies);
  this.browser = browser;
  var self = this;
  stop();
  start(1000);
  setTimeout(function() {
    stop();
    start(200);
  }, 2000);
}

Chimera.prototype.capture = function(filename) {
  return this.browser.capture(filename);
};

Chimera.prototype.cookies = function() {
  var cookies = this.browser.cookies();
  return cookies.slice(0, -1);
};

Chimera.prototype.close = function() {
  this.browser.close();
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

exports.Chimera = Chimera;

start(500);
