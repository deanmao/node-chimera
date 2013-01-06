var fs = require('fs');
var request = require('request');
var zlib = require('zlib');
var platform_arch = process.platform + "_" + process.arch;
console.log("downloading chimera native binary for: "+platform_arch);
request('http://s3.chimerajs.com/chimera_'+platform_arch+'.gz').pipe(zlib.createGunzip()).pipe(fs.createWriteStream('lib/chimera.node'));