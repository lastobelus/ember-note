import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  normalize(typeClass, hash, prop) {
    hash.title = hash.Title
    delete hash.Title
    hash.user = hash.User
    delete hash.User
    return this._super(typeClass, hash, prop);
  },
  serialize(snapshot, options) {
    var json = {
      Title: snapshot.attr('title'),
      User: snapshot.belongsTo('user').id
    };
    return json;
  }
  
});
