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
var originalAlert;

module('Acceptance | register', {
  beforeEach: function() {
    originalAlert = window.alert;
    this.application = startApp();
  },
  
  afterEach: function() {
    window.alert = originalAlert;
    Ember.run(this.application, 'destroy');
  }
});

test('registering with an invalid email', function(assert) {
  assert.expect(3);

  window.alert = function(text) {
    var errMsg = 'Invalid email address.';
    assert.equal(text, errMsg, 'expected ' + text + ' to be ' + errMsg);
  };
    
  visit('/register');
  
  fillIn( '#new-user-email', 'bob' );
  click( '#register-button' );
  
  andThen(function() {
    assert.equal( find( '#message' ).text().trim(), '' );
    assert.equal( currentURL(), '/register' );
  });
});


test('registering with a valid email', function(assert) {
  visit('/register');
  
  fillIn( '#new-user-email', 'bob@mailinator.com' );
  click( '#register-button' );
  
  andThen(function() {
    assert.equal( find( '#message' ).text().trim(), 'A new user with the email "bob@mailinator.com" was added!' );
    assert.equal( currentURL(), '/register' );
  });
});
