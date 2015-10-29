import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    login: function() {
      console.log("name: ", this.controller.get('name'));
      this.store.query('user', {
        name: this.controller.get('name')
      }).then( (users) => {
        if (users.get('length') === 1) {
          var user = users.objectAt(0);
          this.controllerFor('application').set('user', user);
          this.transitionTo('notebooks');
        } else {
          console.log('unexpected query result');
        }
      });
    }
  }
  
});
