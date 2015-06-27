import Ember from 'ember';

export default Ember.Controller.extend({
  isChecked: false,
  /*
  watchIsChecked: Ember.observer('isChecked', function() {
    console.log('isChecked is now '+this.get('isChecked'));
  })
  */
});
