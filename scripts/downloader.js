var spawn = require('child_process').spawn;
var http = require('http');
var fs = require('fs');
var options = {
  host: 's3.chimerajs.com',
  port: 80,
  path: '/qt5_'+process.platform+'_'+process.arch+'.tar.gz'
};
var cwd = __dirname+'/../';

http.get(options, function(res) {
  res.setEncoding('binary');
  var fileData = '';
  res.on("data", function(chunk) {
    fileData += chunk;
  });
  res.on("end", function() {
    fs.writeFile(cwd+'qt.tar.gz', fileData, 'binary', function(err){
        if (err) throw err
        console.log('finished downloading');
        spawn('tar', ['zvxf', cwd+'qt.tar.gz'], {cwd: cwd}).on('close', function() {
          console.log('done with tar');
        });
     });
  });
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});
