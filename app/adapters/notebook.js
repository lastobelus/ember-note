import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  query(store, type, query) {
    var keys = Object.keys(query);
    for (var i = keys.length - 1; i >= 0; i--) {
      var key = keys[i];
      var classifiedKey = Ember.String.classify(key);
      query[classifiedKey] = query[key];
      delete query[key];
      
    }
    return this._super(store, type, query);
  }
  
});
