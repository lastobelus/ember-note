import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'ember-note/tests/helpers/start-app';

/*

Scenario: Invalid email
  When I go to 'register'
  And I fill out 'Register new user:' with 'bob'
  And I press 'Add'
  Then I should see an alert about 'Invalid email address'


Scenario: Valid email
  When I go to 'register'
  And I fill out 'Register new user:' with 'bob@mailinatior.com'
  And I press 'Add'
  Then I should see 'A new user with the name "bob@mailinator.com" was added!'
  And 'Register new user:' should be blank again

*/

module('Acceptance | register', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('visiting /register', function(assert) {
  visit('/register');

  andThen(function() {
    assert.equal(currentURL(), '/register');
  });
});
