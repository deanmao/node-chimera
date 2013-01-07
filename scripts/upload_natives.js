var AWS = require('aws-sdk');
var fs = require('fs');

AWS.config.update({
  region: 'us-east-1',
  accessKeyId: process.env.AMAZON_ACCESS_KEY_ID,
  secretAccessKey: process.env.AMAZON_SECRET_ACCESS_KEY
});


function upload(filename, key) {
  console.log('uploading: '+filename);
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
  upload(__dirname + '/../native/darwin_x64/chimera.node.gz', 'chimera_darwin_x64.gz');
  upload(__dirname + '/../native/linux_x64/chimera.node.gz', 'chimera_linux_x64.gz');
  upload(__dirname + '/../native/linux_ia32/chimera.node.gz', 'chimera_linux_ia32.gz');
} catch(e) {
  console.log(e);
}
