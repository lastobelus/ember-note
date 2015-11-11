import DS from 'ember-data';
import Ember from 'ember';

var computed = Ember.computed;

export default DS.Model.extend({
  title: DS.attr('string'),
  user: DS.belongsTo('user'),
  notes: DS.hasMany('note'),
  noteCount: computed('notes.[]', function() {
    return this.get('notes.length');
  }).readOnly(),
  
});
