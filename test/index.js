var test = require('tape');
var exec = require('child_process').exec;

test('exit code 0 when success', function(t) {
  t.plan(1);
  var child = exec('node ./test/fixtures/success.js | ./bin/colortape');
  child.on('exit', function(code) {
    t.equal(code, 0);
  });
});

test('exit code 1 when failure', function(t) {
  t.plan(1);
  var child = exec('node ./test/fixtures/failure.js | ./bin/colortape');
  child.on('exit', function(code) {
    t.equal(code, 1);
  });
});
