import { moduleForModel, test } from 'ember-qunit';

moduleForModel('notebook', 'Unit | Model | notebook', {
  // Specify the other units that are required for this test.
  needs: [
    'model:user', 
    'model:note'
  ]
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
