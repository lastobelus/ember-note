import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    this.logger.log("logged with the injected logger");
    return this.store.query('notebook', {
      user: params.user_id
    });
  },
  actions: {
    addNotebook() {
      var notebook = this.store.createRecord('notebook', {
        title: this.controller.get("title"),
        user: this.session.get('user')
      });
      notebook.save().then(() => {
        console.log('save successful');
        this.controller.set('title', null);
        this.refresh();
      }, function() {
        this.logger.log('save failed');
      });
    }
  }
});
