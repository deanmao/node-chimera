var nodeVersion = process.version.slice(0, 4);
if (process.platform === 'darwin') {
  // macs only have 1 binary
  nodeVersion = 'v0.8';
}
var webkit = require(__dirname + '/../native/'+process.platform+'/'+nodeVersion+'/chimera');
var fs = require('fs');

webkit.processEvents();

var exports = module.exports;
var timer;
var processingEvents = true;

function stop() {
  processingEvents = false;
  clearInterval(timer);
};

function start() {
  if (!processingEvents) {
    processingEvents = true;
    timer = setInterval(webkit.processEvents, 50);
  }
};

function Chimera(options) {
  options = options || {};
  var userAgent = options.userAgent || "Mozilla/5.0 (Windows NT 6.2) AppleWebKit/536.6 (KHTML, like Gecko) Chrome/20.0.1090.0 Safari/536.6";
  var libraryCode = '(function(){'+ (options.libraryCode || '') + '})()';
  var cookies = options.cookies || '';
  var disableImages = !!(options.disableImages);
  var shouldStart = false;
  if (processingEvents) {
    shouldStart = true;
    stop();
  }
  this.browser = new webkit.Browser(userAgent, libraryCode, cookies, disableImages);
  webkit.processEvents();
  if (shouldStart) {
    start();
  }
}

Chimera.prototype.capture = function(filename) {
  return this.browser.capture(filename);
};

Chimera.prototype.cookies = function() {
  var cookies = this.browser.cookies();
  return cookies.slice(0, -1);
};

Chimera.prototype.setCookies = function(cookies) {
  cookies = cookies || "";
  this.browser.setCookies(cookies);
};

Chimera.prototype.close = function() {
  this.browser.close();
};

Chimera.prototype.perform = function(options) {
  start();
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
