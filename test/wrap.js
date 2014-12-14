var test = require('tape');
var path = require('path');
var exec = require('child_process').exec;

var bin = path.resolve('bin', 'colortape');

test('wrap: exit code 0 when success', function(t) {
  t.plan(1);
  var fixturePath = path.resolve('test', 'fixtures', 'success.js');
  var child = exec(['node', bin, fixturePath].join(' '));
  child.on('exit', function(code) {
    t.equal(code, 0);
  });
});

test('wrap: exit code non-zero when failure', function(t) {
  t.plan(1);
  var fixturePath = path.resolve('test', 'fixtures', 'failure.js');
  var child = exec(['node', bin, fixturePath].join(' '));
  child.on('exit', function(code) {
    t.notEqual(code, 0);
  });
});

test('wrap: exit code non-zero when error', function(t) {
  t.plan(1);
  var fixturePath = path.resolve('test', 'fixtures', 'error.js');
  var child = exec(['node', bin, fixturePath].join(' '));
  child.on('exit', function(code) {
    t.notEqual(code, 0);
  });
});
