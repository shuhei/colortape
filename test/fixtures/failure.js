var test = require('tape');

test('failure', function(t) {
  t.plan(2);
  t.equal(true && false, true);
  t.equal([], []);
});
