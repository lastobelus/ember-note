import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.query('note', { notebook: params.notebook_id });
  },

  actions: {
    addNote: function() {
      this.store.findRecord('notebook',
        this.paramsFor('notebook.notes').notebook_id).then((notebook) => {
          console.log('notebook', notebook);
          var note = this.store.createRecord('note', {
            title: this.controller.get("title"),
            notebook: notebook
          });
          console.log('note', note);
          note.save().then(() => {
            console.log('note save successful');
            this.controller.set('title', null);
            this.refresh();
          }, function() {
            console.log('note save failed');
          });
      });
    },
    deleteNote(note) {
      console.log('deleting note with title '+note.get('title'));
      note.deleteRecord();
      note.save();      
    }
  }
});