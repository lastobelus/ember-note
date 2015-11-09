import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    saveNote() {
      console.log('saving note:');
      this.get('note').save();
    },
    closeNote() {
      this.sendAction('close');
    }
  }  
});
