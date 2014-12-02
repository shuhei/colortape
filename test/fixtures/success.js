var test = require('tape');

test('success', function(t) {
  t.plan(2);
  t.equal(1 + 2, 3);
  t.equal(['Hello', 'World'].join(', '), 'Hello, World');
});
