var oldDir = process.cwd();
try {
  process.chdir(__dirname + '/../deps/qt-4.8.0/' + process.platform + '/' + process.arch + '/lib');
} catch (e) {
  console.log(e);
}
var chimera = require(__dirname + '/../build/Release/chimera.node');
process.chdir(oldDir);

module.exports = chimera;
