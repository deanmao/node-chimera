var webkit;
var fs = require('fs');
function loadDefaultChimera() {
  if (fs.existsSync(__dirname + '/chimera.node')) {
    console.log('Using the chimera in lib');
    try {
      webkit = require('./chimera');
    } catch(e) {
      console.log('Error loading chimera in lib');
      return;
    }
  } else {
    console.log('Chimera cannot find a suitable library for your platform & architecture');
    return;
  }
}
try {
  if (fs.existsSync(__dirname + '/../build')) {
    // use the build version if it exists
    console.log('Using the custom built chimera')
    webkit = require(__dirname + '/../build/Release/chimera');
  } else {
    loadDefaultChimera();
  }
} catch (e) {
  loadDefaultChimera();
}

setInterval(webkit.processEvents, 50);

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
    // stop();
  }
  this.browser = new webkit.Browser(userAgent, libraryCode, cookies, disableImages);
  if (shouldStart) {
    // start();
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

function parseOrReturn(input) {
  var val = null;
  if (input) {
    try {
      val = JSON.parse(input);
    } catch (e) {
      val = input;
    }
  } else {
    val = input;
  }
  return val;
}

Chimera.prototype.perform = function(options) {
  options = options || {};
  var url = options.url;
  var locals = options.locals || {};
  var run = 'with('+JSON.stringify(locals)+'){(' + (options.run || function(callback) {callback(null, "");}) + ')(function(err,res) {window.chimera.callback(JSON.stringify(err), JSON.stringify(res));})}';
  var callback = options.callback || function(err, result) {};
  this.browser.open(url, run, function(errStr, resStr) {
    callback(parseOrReturn(errStr), parseOrReturn(resStr));
  });
}

exports.Chimera = Chimera;
