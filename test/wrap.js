var test = require('tape');
var path = require('path');
var spawnSync = require('child_process').spawnSync;

var bin = path.resolve('bin', 'colortape');

test('wrap: exit code 0 when success', function(t) {
  t.plan(1);
  var fixturePath = path.resolve('test', 'fixtures', 'success.js');

  var result = spawnSync('node', [bin, fixturePath]);

  if (result.status !== 0) {
    printOutput(result);
  }
  t.equals(result.status, 0);
});

test('wrap: exit code non-zero when failure', function(t) {
  t.plan(1);
  var fixturePath = path.resolve('test', 'fixtures', 'failure.js');

  var result = spawnSync('node', [bin, fixturePath]);

  if (result.status === 0) {
    printOutput(result);
  }
  t.notEqual(result.status, 0);
});

test('wrap: exit code non-zero when error', function(t) {
  t.plan(1);
  var fixturePath = path.resolve('test', 'fixtures', 'error.js');

  var result = spawnSync('node', [bin, fixturePath]);

  if (result.status === 0) {
    printOutput(result);
  }
  t.notEqual(result.status, 0);
});

function printOutput(result) {
  console.log('----stdout----');
  console.log(result.stdout.toString());
  console.log('----stderr----');
  console.log(result.stderr.toString());
  console.log('--------------');
}
