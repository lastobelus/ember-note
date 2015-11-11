import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('edit-note', 'Integration | Component | edit note', {
  needs: ['component:markdown-to-html'],
  integration: true
});

test('it renders', function(assert) {
  assert.expect(3);
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  var component = this.subject();
  assert.equal(component._state, 'preRender');
  this.render(hbs`{{edit-note}}`);
  assert.equal(component._state, 'inDOM');
  assert.equal(/save\s*close/.test(this.$().text()), true);

});

test('it saves', function(assert) {
  var component = this.subject();
  this.render();
  var saveTarget = {
    save() {
      assert.ok(true, 'saved the note');
    }
  };
  
  Ember.run(() => {
    component.set('note', saveTarget);
  });
  this.$().find('#save-note-button').click();
  
});

test('it closes', function(assert) {
  var component = this.subject();
  this.render();
  var closeTarget = {
    closeAction() {
      assert.ok(true, 'closed the note');
    }
  };
  
  component.set('close', 'closeAction');
  component.set('targetObject', closeTarget);

  this.$().find('#close-note-button').click();
  
});
