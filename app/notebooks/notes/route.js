import Ember from 'ember';
import ValidationFunctions from 'ember-note/mixins/validation-functions';



export default Ember.Route.extend(ValidationFunctions, {
  model: function(params) {
    return this.store.query('note', { notebook: params.notebook_id });
  },

  actions: {
    addNote: function() {
      var title = this.controller.get("title");
      if ( !this.isValidLength(title, 0, 140)) {
        alert('Title must be longer than 0 ' + 
          'characters and not more than 140.'
        );
      } else {
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
      }
    },
    deleteNote(note) {
      console.log('deleting note with title '+note.get('title'));
      note.deleteRecord();
      note.save();      
    }
  }
});