var fs = require('fs');
var request = require('request');
var platform_arch = process.platform + "_" + process.arch;
request('https://github.com/deanmao/node-chimera/blob/master/native/'+platform_arch+'/chimera.node?raw=true').pipe(fs.createWriteStream('lib/chimera.node'))