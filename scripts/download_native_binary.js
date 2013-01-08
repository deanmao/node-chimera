var fs = require('fs');
var request = require('request');
var zlib = require('zlib');
var platform_arch = process.platform + "_" + process.arch;
var info = JSON.parse(fs.readFileSync(__dirname + '/../package.json'));
var url = 'http://s3.chimerajs.com/chimera_'+platform_arch+'__'+info["version"]+'.gz';
console.log('downloading binary for '+platform_arch+' with version '+info["version"]);
console.log('full download url: ' + url);
request(url).pipe(zlib.createGunzip()).pipe(fs.createWriteStream('lib/chimera.node'));
