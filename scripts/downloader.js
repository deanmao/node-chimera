var spawn = require('child_process').spawn;
var http = require('http');
var fs = require('fs');
var cwd = __dirname+'/../';

function untar(cb) {
  spawn('tar', ['xf', 'qt.tar.gz'], {cwd: cwd}).on('close', function() {
    cb();
  });
}

function download(cb) {
  var options = {
    host: 's3.chimerajs.com',
    port: 80,
    path: '/qt5_'+process.platform+'_'+process.arch+'.tar.gz'
  };
  http.get(options, function(res) {
    res.setEncoding('binary');
    var fileData = '';
    res.on("data", function(chunk) {
      fileData += chunk;
    });
    res.on("end", function() {
      fs.writeFile(cwd+'qt.tar.gz', fileData, 'binary', function(err){
          if (err) throw err
          console.log('finished downloading, now extracting tar.gz file');
          cb();
       });
    });
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });
}

fs.exists(cwd+'qt.tar.gz', function(exists) {
  if (exists) {
    fs.exists(cwd+'qt', function(exists) {
      if (!exists) {
        untar(function() {
          console.log('done!');
        });
      }
    });
  } else {
    download(function() {
      untar(function() {
        console.log('done!');
      });
    });
  }
});