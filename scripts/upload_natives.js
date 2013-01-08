var AWS = require('aws-sdk');
var fs = require('fs');
var info = JSON.parse(fs.readFileSync(__dirname + '/../package.json'));
var version = info["version"];

AWS.config.update({
  region: 'us-east-1',
  accessKeyId: process.env.AMAZON_ACCESS_KEY_ID,
  secretAccessKey: process.env.AMAZON_SECRET_ACCESS_KEY
});

function upload(platform_arch) {
  var filename = __dirname + '/../native/'+platform_arch+'/chimera.node.gz';
  var key = 'chimera_'+platform_arch+'__'+version+'.gz';
  console.log('uploading: '+filename+' as '+key);
  var s3 = new AWS.S3()
  s3.client.putObject({
    ACL : 'public-read',
    Bucket: "s3.chimerajs.com",
    Key: key,
    Body: fs.readFileSync(filename)
  }, function(err, res) {
    console.log(err, res);
  });
}

try {
  upload('darwin_x64');
  upload('linux_x64');
  upload('linux_ia32');
} catch(e) {
  console.log(e);
}
