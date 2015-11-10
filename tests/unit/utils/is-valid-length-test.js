import isValidLength from '../../../utils/is-valid-length';
import { module, test } from 'qunit';

module('Unit | Utility | is valid length');

// Replace this with your real tests.
test('it returns true when value is between min and max', function(assert) {
  var result = isValidLength("12345678", 2, 10);
  assert.ok(result);
});

test('it returns false when value is above max', function(assert) {
  var result = isValidLength("12345678901", 2, 10);
  assert.ok(!result);
});

test('it returns false when value is below min', function(assert) {
  var result = isValidLength("1", 2, 10);
  assert.ok(!result);
});
