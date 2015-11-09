import Ember from 'ember';

export default Ember.Mixin.create({
  isValidLength(value, min, max) {
    return !(
        value === undefined
      || value.length <= min 
      || value.length > max
    );
  },
  isValidEmail(value) {
    var pattern = /^\w+([\.-]?\w+)*@\w+(\.-]?\w+)*(\.\w{2,3})+$/;
    return value.match(pattern);
  }
});
