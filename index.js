var Transform = require('stream').Transform;

var green = '\u001b[32m';
var red   = '\u001b[31m';
var cyan  = '\u001b[36m';
var reset = '\u001b[0m';

var okPattern = /^ok \d+ .*$/gm;
var notOkPattern = /^not ok \d .*$/gm;
var titlePattern = /^# .*$/gm;

var makeGreen = green + '$&' + reset;
var makeRed = red + '$&' + reset;
var makeCyan = cyan + '$&' + reset;

function colorTape() {
  var transform = new Transform();
  transform._transform = function (chunk, enc, callback) {
    if (chunk === null) {
      return callback();
    }
    chunk = chunk.toString();
    chunk = chunk.replace(okPattern, makeGreen);
    chunk = chunk.replace(notOkPattern, makeRed);
    chunk = chunk.replace(titlePattern, makeCyan);
    this.push(new Buffer(chunk));
    callback();
  };
  return transform;
}

module.exports = colorTape;
