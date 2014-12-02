var test = require('tape');
var exec = require('child_process').exec;

test('wrap: exit code 0 when success', function(t) {
  t.plan(1);
  var child = exec('./bin/colortape ./test/fixtures/success.js');
  child.on('exit', function(code) {
    t.equal(code, 0);
  });
});

test('wrap: exit code 1 when failure', function(t) {
  t.plan(1);
  var child = exec('./bin/colortape ./test/fixtures/failure.js');
  child.on('exit', function(code) {
    t.equal(code, 1);
  });
});

test('wrap: exit code 7 when error', function(t) {
  t.plan(1);
  var child = exec('./bin/colortape ./test/fixtures/error.js');
  child.on('exit', function(code) {
    t.equal(code, 7);
  });
});
