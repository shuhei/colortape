var test = require('tape');
var stream = require('stream');
var util = require('util');
var ColorTape = require('..');

function DummyTape(list) {
  stream.Readable.call(this, {objectMode: true});
  this._queue = list.slice();
}
util.inherits(DummyTape, stream.Readable);
DummyTape.prototype._read = function(size) {
  if (this._queue.length > 0) {
    this.push(this._queue.shift());
  } else {
    this.push(null);
  }
};

var expected = [
  'TAP version 13\n',
  '\x1b[36m# foo\x1b[0m\n',
  '\x1b[32mok 1 should be equal\x1b[0m\n',
  '\x1b[36m# bar\x1b[0m\n',
  '\x1b[31mnot ok 2 should be equal\x1b[0m\n',
  '\x1b[36m# baz\x1b[0m\n',
  '\x1b[31mnot ok 3 should not be equal\x1b[0m\n'
].join('');

function testTransform(name, chunks) {
  test(name, function(t) {
    t.plan(1);
    var s = new DummyTape(chunks);
    var result = '';
    s.pipe(new ColorTape())
      .on('data', function(chunk) {
        result += chunk.toString();
      })
      .on('end', function() {
        t.equal(result, expected);
      });
  });
}

testTransform('LF, line by line', [
  'TAP version 13\n',
  '# foo\n',
  'ok 1 should be equal\n',
  '# bar\n',
  'not ok 2 should be equal\n',
  '# baz\n',
  'not ok 3 should not be equal\n'
]);

testTransform('LF, not line by line', [
  'TAP version ',
  '13\n# foo\nok 1 should be equal\n',
  '# bar\nnot',
  ' ok 2 should be equal\n# baz\nnot ok ',
  '3 should not be equal\n'
]);

testTransform('CRLF, not line by line', [
  'TAP version ',
  '13\r\n# foo\r\nok 1 should be equal\r\n',
  '# bar\r\nnot',
  ' ok 2 should be equal\r\n# baz\r\nnot ok ',
  '3 should not be equal\r\n'
]);
