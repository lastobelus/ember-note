import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    addNew: function() {
      var user = this.store.createRecord('user', {
        name: this.controller.get('name')
      });
      user.save().then( () => {
        console.log('save successful');
        this.set.controller('name', null);
      }, function() {
        console.log('save failed');
      });
    },
  }
  
});
