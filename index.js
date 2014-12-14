var Transform = require('stream').Transform;
var util = require('util');

var green = '\u001b[32m';
var red   = '\u001b[31m';
var cyan  = '\u001b[36m';
var reset = '\u001b[0m';

var okPattern = /^\s*ok \d+ .*$/gm;
var notOkPattern = /^\s*not ok \d+ .*$/gm;
var titlePattern = /^\s*# .*$/gm;

var makeGreen = green + '$&' + reset;
var makeRed = red + '$&' + reset;
var makeCyan = cyan + '$&' + reset;

function ColorTape() {
  Transform.call(this);
  this._failed = false;
  this._buffer = null;
}
util.inherits(ColorTape, Transform);

ColorTape.prototype._transform = function(chunk, enc, callback) {
  if (chunk === null) {
    return callback();
  }
  var lines = this._bufferLastLine(chunk.toString());
  if (lines.length === 0) {
    return callback();
  }
  this._checkFailure(lines);
  this.push(new Buffer(this._color(lines)));
  callback();
};

ColorTape.prototype._flush = function(callback) {
  this._checkFailure(this._buffer);
  this.push(new Buffer(this._color(this._buffer)));
  callback();
};

ColorTape.prototype._bufferLastLine = function(chunk) {
  if (this._buffer) {
    chunk = this._buffer + chunk;
    this._buffer = null;
  }
  var components = chunk.split(/\r\n/);
  this._buffer = components.pop();
  components.push('');
  return components.join('\n');
};

ColorTape.prototype._color = function(str) {
  str = str.replace(okPattern, makeGreen);
  str = str.replace(notOkPattern, makeRed);
  return str.replace(titlePattern, makeCyan);
};

ColorTape.prototype._checkFailure = function(str) {
  if (str && str.match(notOkPattern)) {
    this._failed = true;
  }
};

module.exports = ColorTape;
