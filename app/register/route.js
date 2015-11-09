import Ember from 'ember';
import ValidationFunctions from 'ember-note/mixins/validation-functions';

export default Ember.Route.extend(ValidationFunctions, {
  actions: {
    addNew: function() {
      var name = this.controller.get("name");
      if (this.isValidEmail(name)) {
        var user = this.store.createRecord('user', {
          name: this.controller.get('name')
        });
        user.save().then( () => {
          console.log('save successful');
          this.set.controller('name', null);
        }, function() {
          console.log('save failed');
        });
      } else {
        alert('Invalid email address.');
      }
    },
  }
  
});
